import axios from 'axios';

//const BuyerAuthService_API_BASE_URL = "http://buyer-env.eba-d9tmypkq.us-east-2.elasticbeanstalk.com/api/buyer"
const BuyerAuthService_API_BASE_URL = "http://localhost:8092/api/buyer";

class BuyerAuthService{

    registerBuyer(user){
      return axios.post(BuyerAuthService_API_BASE_URL +'/register', user);
    }

    loginBuyer(user){
      return axios.post(BuyerAuthService_API_BASE_URL + '/login', user);
    }

    getBuyer(){
      const token = JSON.parse(localStorage.getItem('buyerCredentials'))
      const authAxios = axios.create({baseURL: BuyerAuthService_API_BASE_URL , headers:{jwt: `${token.token}`}})
      return authAxios.get('/user')
    }
}

export default new BuyerAuthService()