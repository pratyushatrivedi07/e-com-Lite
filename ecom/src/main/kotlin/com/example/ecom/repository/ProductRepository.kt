package com.example.ecom.repository

import com.example.ecom.model.Product
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface ProductRepository: MongoRepository<Product, Int> {

    fun findByBrand(brand: String?): List<Product?>?

    @Query(value = "{'prodId' : ?0}")
    fun findByProdId(prodId: Int): List<Product?>?

    fun findByName(name: String, sellerEmail: String?) : Product
}