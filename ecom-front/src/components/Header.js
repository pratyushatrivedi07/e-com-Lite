import React, {Component} from 'react'
import logo from '../images/logo.png'
import {Container, Navbar, Nav, NavDropdown, Form, Button, FormControl} from 'react-bootstrap'
import { NavLink} from 'react-router-dom';
import './Header.css'
import {BsCart4} from 'react-icons/bs'

export default class Header extends Component {
    constructor(props){
        super(props)

        this.state= {
            buyerDetail: {},
            isLoggedIn: false,
        } 
    }

    //GET LOGGED IN USER
    componentDidMount(){  
            const buyerDetail = JSON.parse(localStorage.getItem('buyerCredentials'));
            if(buyerDetail){
                console.log(buyerDetail);
                this.setState({
                    "buyerDetail": buyerDetail,
                    "isLoggedIn": true,
                });
            }
        }

    //LOGOUT
    logOut(){
            localStorage.removeItem('buyerCredentials');
            this.setState({"isLoggedIn": false});
        }

    render() {
        if(this.state.isLoggedIn){
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><img className='logo' src={logo} alt="logo"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                        <p className="nav_hi"  style={{color: 'white', fontSize: '18px', textDecoration: 'none', marginTop: '7px'}}>Hi, {(this.state.buyerDetail && this.state.buyerDetail.email)}</p>
                        <a style={{textDecoration: 'none'}} href='/cart'><BsCart4 style={{color: 'orange', marginTop: '5px', marginLeft: '40px', fontSize: '30px'}}/></a>
                        <NavLink style={{color: 'white', fontSize: '18px', textDecoration: 'none', marginTop: '7px', marginLeft: '50px'}} to="/" onClick={this.logOut}>Logout</NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>  
        </div>
        )
    }
    else{
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" variant="dark">
                    <Navbar.Brand href="/"><img className='logo' src={logo} alt="logo"></img></Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            <NavDropdown style={{color: 'white', fontSize: '18px'}} className='register' title="Register" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/register">Register as Seller</NavDropdown.Item>
                                <NavDropdown.Item href="/registerBuyer">Register as Buyer</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown style={{color: 'white', fontSize: '18px', marginRight: '90px'}} className='register' title="Login" id="collasible-nav-dropdown">
                                <NavDropdown.Item href="/loginS">Login as Seller</NavDropdown.Item>
                                <NavDropdown.Item href="/login">Login as Buyer</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>  
            </div>
            )
        }
    }
}

