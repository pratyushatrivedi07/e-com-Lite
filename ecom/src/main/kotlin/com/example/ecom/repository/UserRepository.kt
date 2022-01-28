package com.example.ecom.repository

import com.example.ecom.model.User
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface UserRepository : MongoRepository<User, Int> {

    fun findByEmail(email: String):User?
    fun getById(id: Int): User?
}