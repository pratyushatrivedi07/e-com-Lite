import React, { Component } from 'react'
import './LoginBuyer.css'
import bg from '../images/login.jpeg'
import logo from '../images/logo.png'
import { Link } from 'react-router-dom'
import BuyerAuthService from '../services/BuyerAuthService'

export default class LoginBuyer extends Component {
    constructor(props){
        super(props);

        this.state={
            errors: {},
            email: '',
            password: '',
        }
        this.changeEmailHandler = this.changeEmailHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.signin = this.signin.bind(this);
    }
    //VALIDATIONS
    handleValidation() {
        let em = this.state.email;
        let pwd = this.state.password;
        let errors = {};
        let formIsValid = true;

        //Email
        if (!em) {
          formIsValid = false;
          errors["email"] = "Email is required";
        }
        else if(!em.length == 0){
            const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if(!this.state.email || regex.test(this.state.email) === false){
                  errors["email"] = "Invalid Email";

        }
    }
        //Password
        if (!pwd) {
            formIsValid = false;
            errors["password"] = "Password is required";
          }
    
        this.setState({ errors: errors });
        return formIsValid;
    }
    
    //LOGIN
    signin = (e) =>{
        e.preventDefault();
        if (this.handleValidation()) {
            let user = { email: this.state.email, password: this.state.password};
            BuyerAuthService.loginBuyer(user).then(res =>{
                console.log(res.data);
            let buyerCre = { email: this.state.email, password: this.state.password, token: res.data.message}
            localStorage.setItem('buyerCredentials', JSON.stringify(buyerCre));
            window.location.assign('/products')
            
            this.setState({
                email: '',
                password: '',
            });
        });
          }
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
		            <div class="row main-contentl bg-success text-center">
			            <div class="col-md-4 text-center company__infol">
				            <span class="company__logo"><h2><img className='logoR' src={logo} alt="Company Logo"></img></h2></span>
				            <h4 className="company_titlel">Treat Yo'self</h4>
			            </div>
                        <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
                            <div class="container-fluid">
                                <div class="row">
                                    <h2 style={{marginTop:'20px'}} className="l">Login</h2>
                                </div>
                                <div class="row">
                                    <form control="" class="form-group">
                                        <div class="row">
                                            <input type="email" name="email" id="email" value={this.state.email} onChange={this.changeEmailHandler} class="form__input" placeholder="Email"/>
                                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                        </div>
                                        <div class="row">
                                            <input type="password" name="password" value={this.state.password} onChange={this.changePasswordHandler} id="password" class="form__input" placeholder="Password"/>
                                            <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                        </div>
                                        <div class="row">
                                            <input type="submit" onClick={this.signin} value="Log In" class="btnSubmitl"/>
                                        </div>
                                        <div className='row'>
                                            <p style={{color: 'slategrey'}}>Don't have an Account? <a href='/registerBuyer'>Register Here</a></p>
                                        </div>
                                    </form>
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
