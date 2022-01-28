package com.example.ecom.dto

class LoginDto {
    var id = ""
    var email = ""
    var password = ""

    constructor()

    constructor(id: String, email: String, password: String) {
        this.id = id
        this.email = email
        this.password = password
    }
}