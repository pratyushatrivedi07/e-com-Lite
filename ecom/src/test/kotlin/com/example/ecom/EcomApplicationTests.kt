package com.example.ecom

import com.example.ecom.model.Product
import com.example.ecom.model.User
import com.example.ecom.repository.ProductRepository
import com.example.ecom.repository.UserRepository
import com.example.ecom.service.ProductService
import com.example.ecom.service.UserService
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.mockito.BDDMockito.given
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.mock.mockito.MockBean


@SpringBootTest
class EcomApplicationTests {

	@Autowired
	private lateinit var userService: UserService

	@Autowired
	private lateinit var productService: ProductService

	@MockBean
	private lateinit var userRepository: UserRepository

	@MockBean
	private lateinit var productRepository: ProductRepository

	@Test
	fun sellerRegister(){
		var Suser = User()
		Suser.id = 1
		Suser.name = "Kiran"
		Suser.email = "k@gmail.com"
		Suser.password = "kiran123"

		given(userRepository.save(Suser)).willReturn(Suser)
		assertEquals(Suser, userService.save(Suser))
	}

	@Test
	fun findSellerByEmail(){
		var Suser = User()
		Suser.id = 1
		Suser.name = "Kiran"
		Suser.email = "k@gmail.com"
		Suser.password = "kiran123"

		given(userRepository.findByEmail("k@gmail.com")).willReturn(Suser)
		assertEquals(Suser, userService.findByEmail("k@gmail.com"))
	}

	@Test
	fun findSellerById(){
		var Suser = User()
		Suser.id = 1
		Suser.name = "Kiran"
		Suser.email = "k@gmail.com"
		Suser.password = "kiran123"

		given(userRepository.getById(1)).willReturn(Suser)
		assertEquals(Suser, userService.getById(1))
	}

	@Test
	fun getProducts(){
		var proList = mutableListOf<Product>()

		var p1 = Product()
		p1.id = 1
		p1.prodId = 2
		p1.name = "Keyboard"
		p1.brand = "Casio"
		p1.description = "Instrument"
		p1.price = 20000.0
		p1.image = "image_of_keyboard"
		p1.sellerEmail = "s1@gmail.com"

		var p2 = Product()
		p2.id = 2
		p2.prodId = 3
		p2.name = "Thinkpad"
		p2.brand = "Lenovo"
		p2.description = "Laptop"
		p2.price = 30000.0
		p2.image = "image_of_Laptop"
		p2.sellerEmail = "user@gmail.com"

		proList.add(p1)
		proList.add(p2)

		given(productRepository.findAll()).willReturn(proList)
		assertEquals(proList, productRepository.findAll())
	}

	@Test
	fun getByProductId(){
		var proList = mutableListOf<Product>()

		var p1 = Product()
		p1.id = 1
		p1.prodId = 2
		p1.name = "Keyboard"
		p1.brand = "Casio"
		p1.description = "Instrument"
		p1.price = 20000.0
		p1.image = "image_of_keyboard"
		p1.sellerEmail = "s1@gmail.com"

		var p2 = Product()
		p2.id = 2
		p2.prodId = 3
		p2.name = "Thinkpad"
		p2.brand = "Lenovo"
		p2.description = "Laptop"
		p2.price = 30000.0
		p2.image = "image_of_Laptop"
		p2.sellerEmail = "user@gmail.com"

		proList.add(p1)
		proList.add(p2)

		given(productRepository.findByProdId(2)).willReturn(listOf(proList.get(1)))
		assertEquals(listOf(proList.get(1)), productRepository.findByProdId(2))
	}

	@Test
	fun getByBrand(){
		var proList = mutableListOf<Product>()

		var p1 = Product()
		p1.id = 1
		p1.prodId = 2
		p1.name = "Keyboard"
		p1.brand = "Casio"
		p1.description = "Instrument"
		p1.price = 20000.0
		p1.image = "image_of_keyboard"
		p1.sellerEmail = "s1@gmail.com"

		var p2 = Product()
		p2.id = 2
		p2.prodId = 3
		p2.name = "Thinkpad"
		p2.brand = "Lenovo"
		p2.description = "Laptop"
		p2.price = 30000.0
		p2.image = "image_of_Laptop"
		p2.sellerEmail = "user@gmail.com"

		proList.add(p1)
		proList.add(p2)

		given(productRepository.findByBrand("Lenovo")).willReturn(listOf(proList.get(1)))
		assertEquals(listOf(proList.get(1)), productService.searchByBrand("Lenovo"))

	}

	@Test
	fun getProductByName(){
		var p1 = Product()
		p1.id = 1
		p1.prodId = 2
		p1.name = "Keyboard"
		p1.brand = "Casio"
		p1.description = "Instrument"
		p1.price = 20000.0
		p1.image = "image_of_keyboard"
		p1.sellerEmail = "s1@gmail.com"

		given(productRepository.findByName(name = "Keyboard", sellerEmail = "s1@gmail.com")).willReturn(p1)
		assertEquals(p1, productService.searchByName("Keyboard", "s1@gmail.com"))
	}

	@Test
	fun contextLoads() {
	}
}
