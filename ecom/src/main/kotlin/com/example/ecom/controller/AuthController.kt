package com.example.ecom.controller

import com.example.ecom.dto.LoginDto
import com.example.ecom.dto.Message
import com.example.ecom.dto.RegisterDto
import com.example.ecom.model.User
import com.example.ecom.service.UserService
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*
import javax.servlet.http.Cookie
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse
import io.jsonwebtoken.Jwts
import io.jsonwebtoken.SignatureAlgorithm

@CrossOrigin(origins = ["*"])
@RestController
@RequestMapping("api/seller")
class AuthController(private val userService: UserService) {

    @PostMapping("/register")
    fun register(@RequestBody body: RegisterDto): ResponseEntity<User> {
        val user = User()
        user.name = body.name
        user.email = body.email
        user.password = body.password
        return ResponseEntity.ok(userService.save(user))
    }

    @PostMapping("/login")
    fun login(@RequestBody body: LoginDto, response: HttpServletResponse): ResponseEntity<Any> {
        val user = this.userService.findByEmail(body.email)
            ?: return ResponseEntity.badRequest().body(Message("User Not Found!!"))
        if(!user.comparePassword(body.password)){
            return ResponseEntity.badRequest().body(Message("Invalid Password!!"))
        }
        val issuer = user.id.toString()
        val jwt = Jwts.builder().setIssuer(issuer)
            .setExpiration(Date(System.currentTimeMillis() + 60*60*10000)) //10hr
            .signWith(SignatureAlgorithm.HS512, "secret").compact()

        val cookie = Cookie("jwt", jwt)
        cookie.isHttpOnly = true
        response.addCookie(cookie)
        response.addHeader("jwt", jwt)
        return ResponseEntity.ok(Message(jwt))
    }

    @GetMapping("/user")
    fun user(request: HttpServletRequest): ResponseEntity<Any> {
        val jwt = request.getHeader("jwt")
        try {
            if (jwt == null) {
                return ResponseEntity.status(401).body(Message("Unauthenticated"))
            }
            val body = Jwts.parser().setSigningKey("secret").parseClaimsJws(jwt).body
            return ResponseEntity.ok(this.userService.getById(body.issuer.toInt()))
        } catch (e: Exception) {
            return ResponseEntity.status(401).body(Message("Unauthenticated"))
        }
    }

    @PostMapping("/logout")
    fun logout(response: HttpServletResponse): ResponseEntity<Any> {
        val cookie = Cookie("jwt", "")
        cookie.maxAge = 0
        response.addCookie(cookie)
        return ResponseEntity.ok(Message("Logged Out"))
    }
}