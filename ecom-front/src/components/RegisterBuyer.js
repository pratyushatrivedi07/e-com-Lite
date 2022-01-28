import React, { Component } from 'react'
import './RegisterBuyer.css'
import bg from '../images/bbg.jpg'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import BuyerAuthService from '../services/BuyerAuthService'

export default class RegisterBuyer extends Component {
    constructor(props){
        super(props)

        this.state = {
            errors: {},
            name: '',
            email: '',
            password: '',
        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.register = this.register.bind(this);   
    }
    // VALIDATIONS
    handleValidation() {
        let nm = this.state.name;
        let em = this.state.email;
        let pwd = this.state.password;
        let errors = {};
        let formIsValid = true;

        //Name
        if(!nm){
            formIsValid = false;
            errors["name"] = "Name is required";
          }

        //Email
        if (!em) {
          formIsValid = false;
          errors["email"] = "Email is required";
        }
    
        //Password
        if (!pwd) {
            formIsValid = false;
            errors["password"] = "Password is required";
          }
        this.setState({ errors: errors });
        return formIsValid;
    }

    //REGISTER
    register = (e) =>{
        e.preventDefault();
        if (this.handleValidation()) {
        let user = {name: this.state.name, email: this.state.email, password: this.state.password};
        console.log('user =>' + JSON.stringify(user));
        window.location.assign('/login');

        BuyerAuthService.registerBuyer(user).then(res =>{
            this.setState({
                errors: {},
                name: '',
                email: '',
                password: '',
            });
        });
    }   
    }

    changeNameHandler = (event) =>{
        this.setState({name: event.target.value});
    }

    changeEmailHandler = (event) =>{
        this.setState({email: event.target.value});
    }

    changePasswordHandler = (event) =>{
        this.setState({password: event.target.value});
    }
    render() {
        return (
            <div>
                <img className='bg1' src={bg} alt="background"></img>
                <div className="text-box">
                <div class="container-fluid">
		            <div class="row main-contentb bg-success text-center">
			            <div class="col-md-4 text-center company__infob">
				            <span class="company__logo"><h2><img className='logoR' src={logo} alt="Company Logo"></img></h2></span>
				            <h4 className="company_titleb">Treat Yo'self</h4>
			            </div>
                        <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
                            <div class="container-fluid">
                                <div class="row">
                                    <h2 style={{marginTop:'20px'}} className="r">Register</h2>
                                </div>
                                <div class="row">
                                    <form control="" class="form-group">
                                        <div class="row">
                                            <input type="text" name="username" id="username" class="form__input" value={this.state.name} onChange={this.changeNameHandler} placeholder="Name"/>
                                            <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
                                        </div>
                                        <div class="row">
                                            <input type="email" name="email" id="email" class="form__input" value={this.state.email} onChange={this.changeEmailHandler} placeholder="Email"/>
                                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                        </div>
                                        <div class="row">
                                            <input type="password" name="password" id="password" class="form__input" value={this.state.password} onChange={this.changePasswordHandler} placeholder="Password"/>
                                            <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                        </div>
                                        <div class="row">
                                            <input type="submit" value="Sign Up" onClick={this.register} class="btnSubmitb"/>
                                        </div>
                                    </form>
                                </div>
                                <div class="row">
                                    <p style={{color:'grey'}}>Already have an account? <Link to="/login">Login Here</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>                        
            </div>
        )
    }
}
