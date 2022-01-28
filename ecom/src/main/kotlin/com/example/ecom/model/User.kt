package com.example.ecom.model

import com.fasterxml.jackson.annotation.JsonIgnore
import lombok.Data
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.io.Serializable


@Document(collection = "users")
@Data
class User : Serializable {

    @Id
    var id: Int = 0
        get() = field
        set(value) { field = value }

    var name = ""

    @Indexed(unique = true)
    var email = ""

    var password = " "

        @JsonIgnore
        get() = field
        set(value) {
            val passwordEncoder = BCryptPasswordEncoder()
            field = passwordEncoder.encode(value)
        }


    constructor(id: Int,name: String, email: String, password: String) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
    }

    constructor()

    fun comparePassword(password: String): Boolean{
        return BCryptPasswordEncoder().matches(password, this.password)
    }

    companion object {
        @Transient
        val SEQUENCE_NAME = "user_sequence"
    }
}