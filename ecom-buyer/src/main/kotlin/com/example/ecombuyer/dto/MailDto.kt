package com.example.ecombuyer.dto

import com.example.ecombuyer.model.Product

data class MailDto(
    var buyerEmail: String = "",
    var name: String = "",
    var cart: MutableList<Product> = mutableListOf()
)
