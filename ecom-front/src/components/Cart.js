import React, { Component } from 'react'
import Header from './Header'
import './Cart.css'
import bg from '../images/bg.jpg'
import ProductService from '../services/ProductService';
import { BsArrowLeft} from 'react-icons/bs';
import { ImArrowLeft2 } from 'react-icons/im';

export default class Cart extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            cartProducts: [],
            isPresent: false,
            buyerEmail: '',
            buyerDetail: {},
            price: ''
        }
    }

    //Get Cart 
    componentDidMount(){
        ProductService.getCart().then((res) => {
            this.setState({cartProducts: res.data.cartItem});
            if(this.state.cartProducts.length > 0){
                this.setState({"isPresent": true}); 
                let TotalPrice = res.data.sum
                this.setState({price: TotalPrice})
            }
            else{
                this.setState({"isPresent": false});
            } 
        });
    }

    //Delete a Product from Cart
    deletefromCart = (cProduct) =>{
        console.log(cProduct);
        let pname = cProduct.name;
        let sellerEmail = cProduct.sellerEmail;
        console.log(pname, sellerEmail)
        ProductService.deleteFromCart(pname, sellerEmail).then((res)=>{
            window.location.assign('/cart')
        });
    }

    checkout(){ 
        ProductService.checkOut().then((res) =>{
            window.location.assign('/products')
            alert('Order Placed')
        })
    }

    render() {
        if(this.state.isPresent){
        return (
            <div>
                <Header/>
                <img src={bg} className='back1' alt="back"></img>
                <div className="text-box4">
                    <a href='/products' className='btn btn-warning product'><ImArrowLeft2 className='icon'/> Go to Product List</a>
                    <h3>Your Cart Items</h3>
                    <div class="container-fluid">
                        <div class="row align-items-start">
                            {
                                this.state.cartProducts.map(
                                    cProduct =>
                                    <div class="col-12 col-sm-8 items">
                                        <div class="cartItem row align-items-start" key={cProduct.id}>
                                            <div class="col-3 mb-2">
                                                <img class="w-100" className='prod-image1' src={cProduct.image} alt="product image"/>
                                            </div>
                                            <div class="col-5 mb-2">
                                                <h6 class="card-title1">{cProduct.name}</h6>
                                                <p class="pl-1 mb-0 card-subtitle1">{cProduct.brand}</p>
                                                <p class="pl-1 mb-0">{cProduct.description}</p>
                                            </div>
                                            <div class="col-2">
                                                <p id="cartItem1Price">₹ {cProduct.price} /-</p>
                                                <a className='btn btn-danger' onClick={()=> this.deletefromCart(cProduct)}>Remove</a>
                                            </div>
                                        </div>
                                        <hr/>
                                    </div>    
                                )
                            }
                            <div class="col-12 col-sm-4 p-3 proceed form">
                                <div class="row m-0">
                                <div class="col-sm-8 p-0">
                                    <h6>Subtotal</h6>
                                </div>
                                <div class="col-sm-4 p-0">
                                    <p id="subtotal">₹ {this.state.price}/-</p>
                                </div>
                                </div>
                                <hr/>
                                <button id="btn-checkout" class="shopnow" onClick={this.checkout}><span>Checkout</span></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>   
        )
    }
    else{
            return(
            <div>
                <Header/>
                <img src={bg} className='back1' alt="back"></img>
                <div className="text-box4">
                    <a href='/products' className='btn btn-warning product'><BsArrowLeft className='icon'/> Go to Product List</a>
                    <h3>Your Cart is Empty</h3>
                </div>
            </div>   
        )
    }
    }
}
