import axios from 'axios';

//const SellerAuthService_API_BASE_URL = "http://seller-env.eba-kpzv7ssm.us-east-2.elasticbeanstalk.com/api/seller";

const SellerAuthService_API_BASE_URL = "http://localhost:8091/api/seller";

class SellerAuthService{

    registerSeller(user){
      return axios.post(SellerAuthService_API_BASE_URL +'/register', user);
    }

    loginSeller(user){
      return axios.post(SellerAuthService_API_BASE_URL + '/login', user);
    }

    getSeller(){
      const token = JSON.parse(localStorage.getItem('sellerCredentials'))
      const authAxios = axios.create({baseURL: SellerAuthService_API_BASE_URL , headers:{jwt: `${token.token}`}})
      return authAxios.get('/user')
    }
}

export default new SellerAuthService()