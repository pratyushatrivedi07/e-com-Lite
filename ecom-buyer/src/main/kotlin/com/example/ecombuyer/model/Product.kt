package com.example.ecombuyer.model

import lombok.Data
import org.springframework.data.annotation.Id
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank

data class Product (

    @Id
    var id: String = "",
    @NotBlank
    var name:  String = "",
    @Email
    var sellerEmail: String = "",
    @NotBlank
    var image: String= "",
    @NotBlank
    var brand: String = "",
    @NotBlank
    var description: String = "",
    @NotBlank
    var price: Double = 0.0
)