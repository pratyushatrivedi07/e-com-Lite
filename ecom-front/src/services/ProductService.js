import axios from 'axios';

//AWS EBS Product SERVICE LINK
//const Product_API_BASE_URL = "http://seller-env.eba-kpzv7ssm.us-east-2.elasticbeanstalk.com/api/seller";

 const Product_API_BASE_URL = "http://localhost:8091/api/seller";

//const Buyer_Product_API_Base_URL ="http://buyer-env.eba-d9tmypkq.us-east-2.elasticbeanstalk.com/api/buyer/products"
const Buyer_Product_API_Base_URL = "http://localhost:8092/api/buyer/products";

class ProductService{

    getProducts(){
      return axios.get(Product_API_BASE_URL);
    }

    postProduct(formdata){
      const sellerDetail = JSON.parse(localStorage.getItem('sellerCredentials'))
      const authAxios = axios.create({baseURL: Product_API_BASE_URL , headers:{jwt: `${sellerDetail.token}`}})
        return authAxios.post('/newProduct', formdata)
    }

    getSellerProducts(){
      const sellerDetail = JSON.parse(localStorage.getItem('sellerCredentials'))
      const authAxios = axios.create({baseURL: Product_API_BASE_URL , headers:{jwt: `${sellerDetail.token}`}})
      return authAxios.get('/byId');
    }

    getCart(){
      const buyerDetail = JSON.parse(localStorage.getItem('buyerCredentials'))
      const authAxios = axios.create({baseURL: Buyer_Product_API_Base_URL , headers:{jwt: `${buyerDetail.token}`}})
      return authAxios.get('/cart');
    }

    addToCart(pname, sellerEmail){
      const buyerDetail = JSON.parse(localStorage.getItem('buyerCredentials'))
      const authAxios = axios.create({baseURL: Buyer_Product_API_Base_URL , headers:{jwt: `${buyerDetail.token}`}})
      return authAxios.put('/addToCart/' + pname +'/' + sellerEmail);
    }

    deleteFromCart(pname, sellerEmail){
      const buyerDetail = JSON.parse(localStorage.getItem('buyerCredentials'))
      const authAxios = axios.create({baseURL: Buyer_Product_API_Base_URL , headers:{jwt: `${buyerDetail.token}`}})
      return authAxios.put('/delFromCart/' + pname +'/' + sellerEmail);
    }

    checkOut(email){
      const buyerDetail = JSON.parse(localStorage.getItem('buyerCredentials'))
      const authAxios = axios.create({baseURL: Buyer_Product_API_Base_URL , headers:{jwt: `${buyerDetail.token}`}})
      return authAxios.get('/checkout/'+ `${buyerDetail.email}`);
    }
}

export default new ProductService()