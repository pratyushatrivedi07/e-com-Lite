import React, { Component } from 'react'
import logo from '../images/logo.png'
import './Register.css'
import bg from '../images/bg1.jpeg'
import SellerAuthService from '../services/SellerAuthService';

export default class Login extends Component {
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
            SellerAuthService.loginSeller(user).then(res =>{
            let sellerCre = { email: this.state.email, password: this.state.password, token: res.data.message}
            localStorage.setItem('sellerCredentials', JSON.stringify(sellerCre));
            window.location.assign('/sellerPage')
            
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
                <div>
                <img src={bg} alt="bg" className="back"></img>
                <div className="text-box">
                <div class="container-fluid">
		            <div class="row main-content bg-success text-center">
			            <div class="col-md-4 text-center company__info">
				            <span class="company__logo"><h2><img className='logoR' src={logo} alt="Company Logo"></img></h2></span>
				            <h4 className="company_title">Treat Yourself</h4>
			            </div>
                        <div class="col-md-8 col-xs-12 col-sm-12 login_form ">
                            <div class="container-fluid">
                                <div class="row">
                                    <h2 style={{marginTop:'20px'}}>Log In</h2>
                                </div>
                                <div class="row">
                                    <form control="" class="form-group">
                                        <div class="row">
                                            <input type="email" name="email" id="email" class="form__input" value={this.state.email} onChange={this.changeEmailHandler} placeholder="Email"/>
                                            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
                                        </div>
                                        <div class="row">
                                            <input type="password" name="password" id="password" class="form__input" value={this.state.password} onChange={this.changePasswordHandler} placeholder="Password"/>
                                            <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
                                        </div>
                                        <div class="row">
                                            <input type="submit" value="Log In" onClick={this.signin} class="btnSubmit"/>
                                        </div>
                                        <div className='row'>
                                            <p style={{color: 'slategrey'}}>Don't have an Account? <a href='/register'>Register Here</a></p>
                                        </div>
                                    </form>
                                </div>
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
