package com.example.ecom.service

import com.amazonaws.auth.AWSCredentials
import com.amazonaws.auth.AWSStaticCredentialsProvider
import com.amazonaws.auth.BasicAWSCredentials
import com.amazonaws.regions.Regions
import com.amazonaws.services.s3.AmazonS3
import com.amazonaws.services.s3.AmazonS3ClientBuilder
import com.amazonaws.services.s3.model.CannedAccessControlList
import com.amazonaws.services.s3.model.PutObjectRequest
import com.example.ecom.model.Product
import com.example.ecom.repository.ProductRepository
import com.example.ecom.repository.UserRepository
import io.jsonwebtoken.Jwts
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import org.springframework.web.multipart.MultipartFile
import java.io.File
import java.util.*


@Service
class ProductService {
    @Autowired
    private val productRepository: ProductRepository? = null

    @Autowired
    private val sequenceGeneratorService: SequenceGeneratorService? = null

    @Autowired
    private val userRepository: UserRepository? = null


    fun saveProduct(product: Product , jwt: String): Product? {
        val body = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).body
        val user = userRepository?.getById(body.issuer.toInt())
        product.id = sequenceGeneratorService!!.generateSequence(Product.SEQUENCE_NAME)
        product.prodId = user!!.id
        product.sellerEmail = user.email
        return productRepository?.save(product)
    }

    fun searchByBrand(brand: String?): List<Product?>? {
        return productRepository?.findByBrand(brand)
    }

    fun searchByName(name:String, sellerEmail: String?): Product? {
        return productRepository?.findByName(name, sellerEmail)
    }
}