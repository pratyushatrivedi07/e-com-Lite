import React, { Component } from 'react'
import { Carousel, FormControl, Form, Button } from 'react-bootstrap'
import ProductService from '../services/ProductService';
import { FaSearch } from 'react-icons/fa';
import bg from '../images/bg.jpg'
import Header from './Header';
import './MainPage.css'
import axios from 'axios';
import "react-alice-carousel/lib/alice-carousel.css";

export default class MainPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            products: [],
            brand: '',
            productsByBrand: [],
            isSearch: false,
        }
    }

    //Add To Cart
    addToCart = (product) =>{
        console.log(product);
        let pname = product.name;
        let sellerEmail = product.sellerEmail;
        ProductService.addToCart(pname, sellerEmail).then((res)=>{
            console.log(res.data)
            if(res.data === "Product Added"){
                alert('Product Added To Cart')
            }
            else if(res.data === "Product already in Cart"){
                alert('Product already in Cart')
            }
            
        });
    }

    Search =() =>{
        if(this.state.brand == ''){
            this.setState({"isSearch": false});
        }
        else{
        let newData = this.state.brand;
        axios.get("http://localhost:8092/api/buyer/products/byBrand/" + newData)
        //axios.get("http://buyer-env.eba-d9tmypkq.us-east-2.elasticbeanstalk.com/api/buyer/products/byBrand/" + newData) //--- AWS EBS LINK
        .then((res) =>{
          this.setState({
            productsByBrand: res.data, 
            "isSearch": true, 
            });
        });}
      }

    componentDidMount(){
        ProductService.getProducts().then((res) => {
            this.setState({products: res.data});
        });
    }

    changeSearchHandler =(e) =>{
        this.setState({brand: e.target.value});
    }

    render() {
        if(!this.state.isSearch){
            return (
                <div>
                    <Header/>
                    <div className='row'>
                    <Carousel>
                        <Carousel.Item interval={3000}>
                            <img className="d-block w-100 c1" src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Wireless/MobileAccessories/OnePlus_accessories/PC_accesories_banner._CB443675846_.jpg" alt="First slide"/>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img className="d-block w-100 c1" src="https://cdna.artstation.com/p/assets/images/images/011/619/382/large/kevin-probst-apple-watch-series-three-tablet-retina.jpg?1530530177" alt="Second slide"/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100 c1" src="https://s3.amazonaws.com/nikeinc/assets/63597/HO16_BB_KobeA.D._Desktop_1600x700_V2_native_1600.jpg?1478018345" alt="Third slide"/>
                            {/* <img className="d-block w-100 c1" src="https://cdna.artstation.com/p/assets/images/images/002/819/068/large/yoan-radev-kobe.jpg?1466075967" alt="Third slide"/> */}
                        </Carousel.Item>
                    </Carousel>
                    </div>
                    <img src={bg} className='back1' alt="back"></img>
                    <div className="text-box2">
                        <div class="wrap">
                    <div class="search">
                        <input type="search" class="searchTerm" onChange={this.changeSearchHandler} placeholder="Search By Brand..."/>
                        <button type="submit" onClick={this.Search} class="searchButton">
                            <FaSearch></FaSearch>
                        </button>
                    </div>
                        </div>
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
                                            <img class="prod-image2" src={product.image} alt="Card image cap"/>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">{product.name}</h4>
                                            <h5 className='card-subtitle'>{product.brand}</h5>
                                            <br></br>
                                            <p class="card-text">{product.description}</p>
                                            <br></br>
                                            <p class="card-text price">₹ {product.price}/-</p>
                                            <br></br>
                                            <a className='btn btn-warning mx-auto' onClick={()=> this.addToCart(product)}>Add to Bag</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                            </div>
                        </div>
                    </div>
                </div>
            
            )
        }

        else{
            return(<div>
                <Header/>
                <Carousel>
                        <Carousel.Item interval={3000}>
                            <img className="d-block w-100 c1" src="https://images-eu.ssl-images-amazon.com/images/G/31/img19/Wireless/MobileAccessories/OnePlus_accessories/PC_accesories_banner._CB443675846_.jpg" alt="First slide"/>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img className="d-block w-100 c1" src="https://cdna.artstation.com/p/assets/images/images/011/619/382/large/kevin-probst-apple-watch-series-three-tablet-retina.jpg?1530530177" alt="Second slide"/>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100 c1" src="https://s3.amazonaws.com/nikeinc/assets/63597/HO16_BB_KobeA.D._Desktop_1600x700_V2_native_1600.jpg?1478018345" alt="Third slide"/>
                            {/* <img className="d-block w-100 c1" src="https://cdna.artstation.com/p/assets/images/images/002/819/068/large/yoan-radev-kobe.jpg?1466075967" alt="Third slide"/> */}
                        </Carousel.Item>
                    </Carousel>
                <img src={bg} className='back1' alt="back"></img>
                <div className="text-box3">
                    <div class="wrap">
                    <div class="search">
                        <input type="search" class="searchTerm" onChange={this.changeSearchHandler} placeholder="Search By Brand..."/>
                        <button type="submit" onClick={this.Search} class="searchButton">
                            <FaSearch></FaSearch>
                        </button>
                    </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div class="container-fluid">
                    <div class="row">
                    {
                        this.state.productsByBrand.map(
                        productB =>
                            <div class="col-4 mb-4">
                                <div class="card" key = {productB.id}>
                                    <div class="card-horizontal">
                                        <div class="img-square-wrapper">
                                            <img class="prod-image" src={productB.image} alt="Card image cap"/>
                                        </div>
                                        <div class="card-body">
                                            <h4 class="card-title">{productB.name}</h4>
                                            <h5 className='card-subtitle'>{productB.brand}</h5>
                                            <br></br>
                                            <p class="card-text">{productB.description}</p>
                                            <br></br>
                                            <p class="card-text price">₹ {productB.price}/-</p>
                                            <br></br>
                                            <a className='btn btn-warning mx-auto' onClick={()=> this.addToCart(productB)}>Add to Bag</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    </div>
                    </div>
                </div>
            </div>
            )
            
        }
    }
}
