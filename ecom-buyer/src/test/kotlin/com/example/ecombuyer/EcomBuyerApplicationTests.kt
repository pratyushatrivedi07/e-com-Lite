package com.example.ecombuyer

import com.example.ecombuyer.dto.CartItemDto
import com.example.ecombuyer.model.Product
import com.example.ecombuyer.model.User
import com.example.ecombuyer.repository.UserRepository
import com.example.ecombuyer.service.BuyerService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean

@SpringBootTest
class EcomBuyerApplicationTests {

	@Autowired
	private lateinit var buyerService: BuyerService

	@MockBean
	private lateinit var userRepository: UserRepository

	@Test
	fun buyerRegister(){
		var Buser = User()
		Buser.id = 1
		Buser.name = "Jay"
		Buser.email = "jay@gmail.com"
		Buser.password = "jay@1234"

		given(userRepository.save(Buser)).willReturn(Buser)
		assertEquals(Buser, buyerService.save(Buser))
	}

	@Test
	fun findBuyerByEmail(){
		var Buser = User()
		Buser.id = 1
		Buser.name = "Jay"
		Buser.email = "jay@gmail.com"
		Buser.password = "jay@1234"

		given(userRepository.findByEmail("jay@gmail.com")).willReturn(Buser)
		assertEquals(Buser, buyerService.findByEmail("jay@gmail.com"))
	}

	@Test
	fun findBuyerById(){
		val Buser = User()
		Buser.id = 1
		Buser.name = "Jay"
		Buser.email = "jay@gmail.com"
		Buser.password = "jay@1234"

		given(userRepository.getById(1)).willReturn(Buser)
		assertEquals(Buser, buyerService.getById(1))
	}

	@Test
	fun getCart(){
		val proList = mutableListOf<Product>()

		val p1 = Product()
		p1.id = "1"
		p1.name = "Keyboard"
		p1.brand = "Casio"
		p1.description = "Instrument"
		p1.price = 20000.0
		p1.image = "image_of_keyboard"
		p1.sellerEmail = "s1@gmail.com"

		val p2 = Product()
		p2.id = "2"
		p2.name = "Thinkpad"
		p2.brand = "Lenovo"
		p2.description = "Laptop"
		p2.price = 30000.0
		p2.image = "image_of_Laptop"
		p2.sellerEmail = "user@gmail.com"

		proList.add(p1)
		proList.add(p2)

		val Buser = User()
		Buser.id = 1
		Buser.name = "Jay"
		Buser.email = "jay@gmail.com"
		Buser.password = "jay@1234"
		Buser.cart = proList

		val cartItem = CartItemDto()
		cartItem.sum = 100
		cartItem.cartItem = proList

		given(userRepository.existsByEmail("jay@gmail.com")).willReturn(true)
		given(userRepository.findByEmail("jay@gmail.com")).willReturn(Buser)
		assertEquals(cartItem.cartItem, buyerService.getCart("jay@gmail.com").body!!.cartItem)
	}

	@Test
	fun deleteFromCart(){
		val p1 = Product()
		p1.name = "Air Max"
		p1.sellerEmail =  "seller@gmail.com"
		p1.image= "https://imagestorage-aws.s3.ap-south-1.amazonaws.com/3b417e15-e032-44e..."
		p1.brand ="Nike"
		p1.description= "Sport Shoes"
		p1.price=10000.0

		val Buser = User()
		Buser.id = 1
		Buser.name = "Jay"
		Buser.email = "jay@gmail.com"
		Buser.password = "jay@1234"
		Buser.cart = mutableListOf(p1)

		given(userRepository.getById(1)).willReturn(Buser)
		given(userRepository.existsByEmail("jay@gmail.com")).willReturn(true)
		given(userRepository.findByEmail("jay@gmail.com")).willReturn(Buser)
		assertEquals("Product Deleted", buyerService.deleteFromCart("jay@gmail.com","Air Max","seller@gmail.com"))
	}

	@Test
	fun checkOut(){

		val proList = mutableListOf<Product>()

		val p1 = Product()
		p1.name = "Air Max"
		p1.sellerEmail =  "seller@gmail.com"
		p1.image= "https://imagestorage-aws.s3.ap-south-1.amazonaws.com/3b417e15-e032-44e..."
		p1.brand ="Nike"
		p1.description= "Sport Shoes"
		p1.price=10000.0

		val p2 = Product()
		p2.name = "iPhone 11"
		p2.sellerEmail = "user@gmail.com"
		p2.image= "https://imagestorage-aws.s3.ap-south-1.amazonaws.com/d034a2e5-c934-419..."
		p2.brand = "Apple"
		p2.description= "Mobile"
		p2.price= 89000.0

		proList.add(p1)
		proList.add(p2)

		val Buser = User()
		Buser.id = 1
		Buser.name = "Jay"
		Buser.email = "jay@gmail.com"
		Buser.password = "jay@1234"
		Buser.cart = proList

		given(userRepository.getById(1)).willReturn(Buser)
		given(userRepository.existsByEmail("jay@gmail.com")).willReturn(true)
		given(userRepository.findByEmail("jay@gmail.com")).willReturn(Buser)
		assertEquals("Your Order Placed", buyerService.checkout("jay@gmail.com"))
	}

	@Test
	fun contextLoads() {
	}

}
