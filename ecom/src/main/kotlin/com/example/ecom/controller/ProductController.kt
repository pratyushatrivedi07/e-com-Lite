package com.example.ecom.controller

import com.example.ecom.model.Product
import com.example.ecom.repository.ProductRepository
import com.example.ecom.repository.UserRepository
import com.example.ecom.service.AmazonClient
import com.example.ecom.service.ProductService
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import io.jsonwebtoken.Jwts
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import java.io.IOException
import java.util.*
import javax.servlet.http.HttpServletRequest


@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("/api/seller")
class ProductController(
    @Autowired
    private val productRepository: ProductRepository,

    @Autowired
    private val userRepository: UserRepository,

    @Autowired
    private val productService: ProductService,

    @Autowired
    private var amazonClient: AmazonClient

){
    @GetMapping
    fun allProducts(): ResponseEntity<Any?>{
        return ResponseEntity<Any?>(productRepository.findAll(), HttpStatus.OK)
    }

    @GetMapping("/byId")
    @Throws(Exception::class)
    fun getProductByProductId(request: HttpServletRequest):List<Product?>? {
        val jwt = request.getHeader("jwt")
        val result:List<Product?>?
        if (jwt != null) {
            val body = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).body
            val user = userRepository.getById(body.issuer.toInt())
            val prodId = user!!.id
            result = productRepository.findByProdId(prodId)
            return result
        }
        return null
    }

    @PostMapping("/newProduct", consumes = ["multipart/form-data"])
    @Throws(IOException::class)
    fun addProduct(@RequestParam(value = "name",required = false) name: String?,
                   @RequestParam(value = "brand",required = false) brand: String?,
                   @RequestParam(value = "description",required = false) description: String?,
                   @RequestParam(value = "price",required = false) price: Double?,
                   @RequestParam(value = "file",required = false) file: MultipartFile,
                   request: HttpServletRequest): ResponseEntity<*> {
        val jwt = request.getHeader("jwt")
        return if (jwt != null) {
            val finalProduct = Product()
            finalProduct.name = name!!
            finalProduct.description = description!!
            finalProduct.brand = brand!!
            finalProduct.price = price!!
            finalProduct.image = amazonClient.uploadFile(file)
            val savedProduct = productService.saveProduct(finalProduct, jwt)
            ResponseEntity(savedProduct, HttpStatus.CREATED)
        } else {
            ResponseEntity.badRequest().body("Some Problem Occurred")
        }
    }

    @GetMapping("/byBrand/{brand}")
    fun byBrand(@PathVariable("brand") brand: String?): ResponseEntity<List<Product?>?> {
        val productByBrand = productService.searchByBrand(brand)
        return if (productByBrand!!.isNotEmpty()) {
            ResponseEntity.ok(productByBrand)
        } else ResponseEntity.notFound().build()
    }

    @GetMapping("/productByName/{name}/{sellerEmail}")
    fun getProduct(@PathVariable("name") name: String, @PathVariable("sellerEmail") sellerEmail: String): Product? {
        return productService.searchByName(name, sellerEmail)
    }
}