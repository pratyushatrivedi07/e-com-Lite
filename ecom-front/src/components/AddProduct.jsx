import React, { Component } from 'react'
import logo from '../images/logo.png'
import {Container, Navbar, Nav,Card} from 'react-bootstrap'
import { NavLink, Link} from 'react-router-dom';
import './AddProduct.css'
import sBg from '../images/seller.jpg'
import ProductService from '../services/ProductService';


export default class AddProduct extends Component {
    constructor(props){
        super(props)

        this.state= {
            sellerDetail: {},
            isLoggedIn: false,
            errors: {},
            name: '',
            description: '',
            brand: '',
            price: '',
            filen: []
        } 
        this.changeProductNameHandler = this.changeProductNameHandler.bind(this);
        this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
        this.changeBrandHandler = this.changeBrandHandler.bind(this);
        this.changePriceHandler = this.changePriceHandler.bind(this);
        this.saveProduct = this.saveProduct.bind(this);
    }

    imageHandler = (e) =>{
        this.setState({filen: e.target.files[0]});
    }

    //ADD Product
    saveProduct = (e) =>{
        e.preventDefault();
        if (this.handleValidation()) {

        let product = {
            name: this.state.name,
            brand:  this.state.brand,
            description: this.state.description,
            price: this.state.price,
            };

            let formdata = new FormData();
            formdata.append("name", this.state.name )
            formdata.append("brand", this.state.brand )
            formdata.append("description", this.state.description)
            formdata.append("price", this.state.price )
            formdata.append("file", this.state.filen)
        
        console.log('product =>' + JSON.stringify(product));
        ProductService.postProduct(formdata).then(res =>{
            console.log(res.data)
            window.location.assign("/sellerPage")
        });
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
    }


    //LOGOUT
    logOut(){
            localStorage.removeItem('sellerCredentials');
            this.setState({"isLoggedIn": false});
            window.location.assign("/")
    }

    //VALIDATIONS
    handleValidation() {
        let pnm = this.state.name;
        let brn = this.state.brand;
        let desc = this.state.description;
        let prc = this.state.price;
        let errors = {};
        let formIsValid = true;

        //Product Name
        if(!pnm){
            formIsValid = false;
            errors["name"] = "Product Name is required";
          }
          

        //Description
        if (!desc) {
        formIsValid = false;
        errors["description"] = "Description is required";
        }
        
        //Brand
        if (!brn) {
          formIsValid = false;
          errors["brand"] = "Brand Name is required";
        }

        //Price
        if(!prc){
            formIsValid = false;
            errors["price"] = "Price is required";
        }

        this.setState({ errors: errors });
        return formIsValid;
       
    }

    changeProductNameHandler =(event) =>{
        this.setState({name: event.target.value});
    }

    changeDescriptionHandler = (e) =>{
        this.setState({description: e.target.value});
    }

    changeBrandHandler = (e) =>{
        this.setState({brand: e.target.value});
    }

    changePriceHandler = (e) =>{
        this.setState({price: e.target.value});
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
                <div className="text-box1">
                <div className="container">
                    <div className='row'>
                        <div className='card1 col-md-8 offset-md-2 offset-md-2'>
                            <h3 className='text-center'>Add Product</h3>
                            <div className='card-body'>
                                <form encType="multipart/form-data">
                                <div className='row'>
                                <div class="column">
                                    <div className='form-group'>
                                        <label >Product Name: </label>
                                        <input placeholder='Product Name' type="text" name="name" className='form-control'
                                        value={this.state.name} onChange={this.changeProductNameHandler}></input>
                                        <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                    </div>

                                    <div className='form-group'>
                                        <label>Brand Name: </label>
                                        <input placeholder='Brand Name' type="text" name='brand' className='form-control'
                                        value={this.state.brand} onChange={this.changeBrandHandler}></input>
                                        <span style={{ color: "red" }}>{this.state.errors["brand"]}</span>
                                    </div>

                                    <div className='form-group'>
                                        <label>Product Description: </label>
                                        <textarea placeholder='Description' name='description' className='form-control' cols='5' rows="7"
                                        value={this.state.description} onChange={this.changeDescriptionHandler}></textarea>
                                        <span style={{ color: "red" }}>{this.state.errors["description"]}</span>
                                    </div>

                                    <div className='form-group'>
                                        <label>Price: </label>
                                        <input placeholder='Price' type="number" min={10} name='price' className='form-control'
                                        value={this.state.price} onChange={this.changePriceHandler}></input>
                                        <span style={{ color: "red" }}>{this.state.errors["price"]}</span>
                                    </div>
                                    </div>

                                    <div className='column'>
                                            <div className='form-group'>
                                                <label>Image:  </label>
                                                <input type="file" name='image' className='form-control' onChange={this.imageHandler}></input>
                                                <div className='img-holder'>
                                                {/* <img src={filen} className='img'></img> */}
                                            </div> 
                                        </div>
                                    </div>
                                </div> 
                                <div>
                                    <button className='btn btn-success' onClick={this.saveProduct} >Save</button>
                                    <Link className='btn btn-danger' to="/sellerPage" style={{marginLeft: '20px'}}>Cancel</Link>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
