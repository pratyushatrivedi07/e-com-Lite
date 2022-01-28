package com.example.ecombuyer.service

import com.example.ecombuyer.dto.CartItemDto
import com.example.ecombuyer.dto.MailDto
import com.example.ecombuyer.model.Product
import com.example.ecombuyer.feign.SellerProducts
import com.example.ecombuyer.model.User
import com.example.ecombuyer.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.ResponseEntity
import org.springframework.mail.SimpleMailMessage
import org.springframework.mail.javamail.JavaMailSender
import org.springframework.stereotype.Service


@Service
class BuyerService(
    private val userRepository: UserRepository,
){
    @Autowired
    private val sequenceGeneratorService: SequenceGeneratorService? = null

    @Autowired
    private lateinit var sellerProducts: SellerProducts

    @Autowired
    private lateinit var mailSender: JavaMailSender

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

    fun getCart(email:String): ResponseEntity<CartItemDto> {
        val cart = userRepository.findByEmail(email)!!.cart
        var sum = 0
        for(i in cart){
            sum = (sum + i.price).toInt()
        }
        var item = CartItemDto()
        item.sum = sum
        item.cartItem = cart
        return ResponseEntity.ok(item)
    }

    fun addToCart(email: String, pName: String, pSellerEmail:String):Any{
        val productList = mutableListOf<Product>()
        val requiredProduct = sellerProducts.getProduct(pName,pSellerEmail)
        if(userRepository.existsByEmail(email)){
            if(requiredProduct != null){
                val buyerAccount = userRepository.findByEmail(email)
                if(buyerAccount?.cart!!.isNotEmpty()) {
                    for (i in buyerAccount.cart) {
                        if(i.name != requiredProduct.name) {
                            productList.add(i)
                        }
                        else{
                            return "Product already in Cart"
                        }
                    }
                }
                productList.add(requiredProduct)
                buyerAccount.cart = productList
                userRepository.save(buyerAccount)
                return "Product Added"
            }
            return "Product not exist"
        }
        return "Email does not exist"
    }

    fun deleteFromCart(email: String, pName: String, pSellerEmail:String):Any{
        val productList = mutableListOf<Product>()
        var flag = 0
        if(userRepository.existsByEmail(email)){
            val buyerAccount = userRepository.findByEmail(email)
                if(buyerAccount?.cart!!.isNotEmpty())
                {
                    for (i in buyerAccount.cart) {
                        if(i.name != pName){
                            productList.add(i)
                        }else{
                            flag+=1
                        }
                    }
                }
            buyerAccount.cart = productList
            userRepository.save(buyerAccount)
            if(flag != 0){
                return "Product Deleted"
            }
            return "No Product with this name"
        }
        return "Email does not exist"
    }

    fun checkout(buyerEmail:String):Any{
        val sellerEmails = mutableListOf<String>()
        val emptyCart = mutableListOf<Product>()
        val orderList = mutableMapOf<String,MailDto>()
        if(userRepository.existsByEmail(buyerEmail))
        {
            val buyerAccount = userRepository.findByEmail(buyerEmail)
            for (i in buyerAccount!!.cart)
            {
                if(!sellerEmails.contains(i.sellerEmail)){sellerEmails.add(i.sellerEmail)}
            }
            for (j in sellerEmails)
            {
                val pros = mutableListOf<Product>()
                for(k in buyerAccount.cart){
                    if(k.sellerEmail == j)
                    {
                        pros.add(k)
                    }
                }


                val finalList = pros.distinctBy { pro -> pro.name } as MutableList<Product>
                val orderPlaced = MailDto(buyerEmail,buyerAccount.name,finalList)
                orderList[j] = orderPlaced

                val orderInfo =  "-------------------Buyer Info------------------\n" +
                    "BuyerName : ${orderPlaced.name}\n" +
                    "Buyer Email  : ${orderPlaced.buyerEmail}\n\n" +
                    "-------------Product Details---------------\n\n" +
                        "${orderPlaced.cart}\n"+
                        "\n.................Thank You..........................."

                sendEmail("pratyu07jan@gmail.com","Products Ordered", orderInfo)
                //sendEmail("pratyu07jan@gmail.com","Products Ordered", orderPlaced.toString())
            }
            val buyerAcc = userRepository.findByEmail(buyerEmail)
            val buyerDetail = User()
            buyerDetail.id = buyerAcc!!.id
            buyerDetail.name = buyerAcc.name
            buyerDetail.email = buyerAcc.email
            buyerDetail.password = buyerAcc.password
            buyerDetail.cart = emptyCart
            userRepository.save(buyerDetail)
            return "Your Order Placed"
        }
        return "Buyer does not exist"
    }

    //================================Email_Service============================

    fun sendEmail(toEmail: String, subject: String,body: String) {
        val mess = SimpleMailMessage()
        mess.setFrom("homaster4595@gmail.com")
        mess.setTo(toEmail)
        mess.setSubject(subject)
        mess.setText(body)
        mailSender.send(mess)
        println(mess.toString())
    }

}