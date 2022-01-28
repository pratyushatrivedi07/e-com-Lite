package com.example.ecombuyer.feign

import com.example.ecombuyer.model.Product
import org.springframework.cloud.openfeign.FeignClient
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable

//@FeignClient(value = "seller-service", url ="http://seller-env.eba-kpzv7ssm.us-east-2.elasticbeanstalk.com/api/seller")
@FeignClient(value = "seller-service", url ="http://localhost:8091/api/seller")
interface SellerProducts {

    @GetMapping
    fun allProducts(): ResponseEntity<Any?>

    @GetMapping("/byBrand/{brand}")
    fun byBrand(@PathVariable("brand") brand: String?): ResponseEntity<List<Product?>?>

    @GetMapping("/productByName/{name}/{sellerEmail}")
    fun getProduct(@PathVariable("name") name:String, @PathVariable("sellerEmail") sellerEmail:String): Product?
}
