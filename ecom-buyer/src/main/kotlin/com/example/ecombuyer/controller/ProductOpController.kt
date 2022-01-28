package com.example.ecombuyer.controller

import com.example.ecombuyer.dto.MessageDto
import com.example.ecombuyer.model.Product
import com.example.ecombuyer.feign.SellerProducts
import com.example.ecombuyer.repository.UserRepository
import com.example.ecombuyer.service.BuyerService
import io.jsonwebtoken.Jwts
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.servlet.http.HttpServletRequest

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("api/buyer/products")
class ProductOpController {

    @Autowired
    private lateinit var sellerProducts: SellerProducts

    @Autowired
    private var userRepository: UserRepository?= null

    @Autowired
    private var buyerService: BuyerService?= null

    @GetMapping
    fun allProducts() : ResponseEntity<Any?>{
        return ResponseEntity<Any?>(sellerProducts.allProducts().body, HttpStatus.OK)
    }

    @GetMapping("/byBrand/{brand}")
    fun getByBrand(@PathVariable("brand") brand: String?): ResponseEntity<List<Product?>?> {
        val productByBrand = sellerProducts.byBrand(brand).body
        if (productByBrand != null) {
            return ResponseEntity.ok(productByBrand)
        } else
            return ResponseEntity.notFound().build()
    }

    @GetMapping("/productByName/{name}/{sellerEmail}")
    fun getByName(@PathVariable("name") name:String, @PathVariable("sellerEmail") sellerEmail:String): Product? {
        val productByName = sellerProducts.getProduct(name, sellerEmail)
        if (productByName != null) {
            return productByName
        } else
            return null
    }

    @GetMapping("/cart")
    fun getCart(request: HttpServletRequest):ResponseEntity<Any> {
        val jwt = request.getHeader("jwt")
        val body = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).body
        val user = userRepository?.getById(body.issuer.toInt())
        val email = user!!.email
        if(userRepository!!.existsByEmail(email)){
            return ResponseEntity(buyerService?.getCart(email)?.body,HttpStatus.OK)
        }
        return ResponseEntity("Need To Login!!",HttpStatus.OK)
    }

    @PutMapping("/addToCart/{name}/{sellerEmail}")
    fun addProductCart(request: HttpServletRequest, @PathVariable name:String, @PathVariable sellerEmail: String):ResponseEntity<Any>{
        val jwt = request.getHeader("jwt")
        val body = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).body
        val user = userRepository?.getById(body.issuer.toInt())
        val email = user!!.email
        return ResponseEntity(buyerService?.addToCart(email,name,sellerEmail),HttpStatus.OK)
    }

    @PutMapping("/delFromCart/{name}/{sellerEmail}")
    fun deleteProductFromCart(request: HttpServletRequest, @PathVariable name:String, @PathVariable sellerEmail: String):ResponseEntity<Any>{
        val jwt = request.getHeader("jwt")
        val body = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).body
        val user = userRepository?.getById(body.issuer.toInt())
        val email = user!!.email
        return ResponseEntity(buyerService?.deleteFromCart(email,name,sellerEmail),HttpStatus.OK)
    }

    @GetMapping("/checkout/{email}")
    fun checkout(request: HttpServletRequest, @PathVariable email:String):ResponseEntity<Any>{
        val jwt = request.getHeader("jwt")
        val body = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).body
        val user = userRepository?.getById(body.issuer.toInt())
        @Suppress("NAME_SHADOWING") val email = user!!.email
        return ResponseEntity(buyerService?.checkout(email),HttpStatus.OK)
    }
}