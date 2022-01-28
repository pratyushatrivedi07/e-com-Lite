package com.example.ecom.model

import com.fasterxml.jackson.annotation.JsonFormat
import com.fasterxml.jackson.annotation.JsonPropertyOrder
import lombok.Data
import org.springframework.data.annotation.Id
import org.springframework.data.mongodb.core.mapping.Document
import javax.validation.constraints.Email
import javax.validation.constraints.NotBlank

@Data
@Document(collection = "products")
class Product {

    @Id
    var id: Int = 0
    var prodId: Int = 0
    @NotBlank
    var name:  String = ""
    @Email
    var sellerEmail: String = ""
    @NotBlank
    var image: String= ""
    @NotBlank
    var brand: String = ""
    @NotBlank
    var description: String = ""
    @NotBlank
    var price: Double = 0.0

    constructor()

    constructor(
        id: Int,
        prodId : Int,
        name: String,
        sellerEmail: String,
        image: String,
        brand: String,
        description: String,
        price: Double,
    ) {
        this.id = id
        this.prodId = prodId
        this.name = name
        this.sellerEmail = sellerEmail
        this.image = image
        this.brand = brand
        this.description = description
        this.price = price
    }

    companion object {
        @Transient
        val SEQUENCE_NAME = "product_sequence"
    }

}