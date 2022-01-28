import React, { Component } from 'react';
import logo from '../images/logo.png'
import {Container, Navbar, Nav,Card} from 'react-bootstrap'
import { NavLink, Link} from 'react-router-dom';
import './Sellerpage.css'
import sBg from '../images/seller.jpg'
import ProductService from '../services/ProductService';

class SellerPage extends Component {
    constructor(props){
        super(props)

        this.state= {
            sellerDetail: {},
            isLoggedIn: false,
            products: [],
        } 
    }
    
    componentDidMount(){  
        //Get Seller 
        const sellerDetail = JSON.parse(localStorage.getItem('sellerCredentials'));
        if(sellerDetail){
            console.log(sellerDetail);
                this.setState({
                "sellerDetail": sellerDetail,
                "isLoggedIn": true,
            });
        }

        //GET Seller's Products
        ProductService.getSellerProducts().then((res)=>{
            this.setState({products: res.data});
            console.log(res);
        })
    
    }

    //LOGOUT
    logOut(){
            localStorage.removeItem('sellerCredentials');
            this.setState({"isLoggedIn": false});
            window.location.assign("/")
    }

    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" bg='dark' variant="dark">
                <Container>
                    <Navbar.Brand href="/sellerPage"><img className='logo' src={logo} alt="logo"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            <p className="nav_hi"  style={{color: 'white', fontSize: '18px', textDecoration: 'none', marginTop: '7px'}}>Hi, {(this.state.sellerDetail && this.state.sellerDetail.email)}</p>
                            <NavLink style={{color: 'white', fontSize: '18px', textDecoration: 'none', marginTop: '7px', marginLeft: '50px'}} to="/" onClick={this.logOut}>Logout</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
                </Navbar>  
                <img src={sBg} alt="bg" className="back"></img>
                <div className="text-box">
                    <h1>Your Products</h1>
                    <br></br>
                    <br></br>
                    <div class="container-fluid">
                    <div class="row">
                    {
                        this.state.products.map(
                        product =>
                            <div class="col-4 mb-4">
                                <div class="card" key = {product.id}>
                                    <div class="card-horizontal">
                                        <div class="img-square-wrapper">
                                            <img class="prod-image" src={product.image} alt="Card image cap"/>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title1" style={{color: 'black'}}>{product.name}</h4>
                                            <h5 className='card-subtitle'>{product.brand}</h5>
                                            <br></br>
                                            <p class="card-text" style={{color: 'black'}}>{product.description}</p>
                                            <br></br>
                                            <p class="card-text price" style={{color: 'black'}}>₹ {product.price}/-</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <br></br>
                <Link to="/addProduct" class="bn5 addButton">Add Product</Link>
            </div>

                    </div>
                </div>       
        );
    }
}

export default SellerPage;