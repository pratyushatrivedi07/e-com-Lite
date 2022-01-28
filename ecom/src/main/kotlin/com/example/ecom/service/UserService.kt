package com.example.ecom.service

import com.example.ecom.model.User
import com.example.ecom.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service


@Service
class UserService(
    private val userRepository: UserRepository,
){

    @Autowired
    private val sequenceGeneratorService: SequenceGeneratorService? = null


    fun save(user : User): User {
        user.id = sequenceGeneratorService!!.generateSequence(User.SEQUENCE_NAME)
        return userRepository.save(user)

    }

    fun findByEmail(email:String): User? {
        return this.userRepository.findByEmail(email)
    }

    fun getById(id: Int): User? {
        return this.userRepository.getById(id)
    }
}