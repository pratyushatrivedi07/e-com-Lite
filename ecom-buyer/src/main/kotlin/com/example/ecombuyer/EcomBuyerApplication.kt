package com.example.ecombuyer

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.cloud.netflix.eureka.EnableEurekaClient
import org.springframework.cloud.openfeign.EnableFeignClients

@SpringBootApplication
@EnableEurekaClient
@EnableFeignClients
class EcomBuyerApplication

fun main(args: Array<String>) {
	runApplication<EcomBuyerApplication>(*args)
}
