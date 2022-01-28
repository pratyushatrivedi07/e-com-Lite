package com.example.ecombuyer.repository

import com.example.ecombuyer.model.User
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository : MongoRepository<User, Int> {
    fun existsByEmail(email: String): Boolean
    fun findByEmail(email: String):User?
    fun getById(id: Int): User?
}