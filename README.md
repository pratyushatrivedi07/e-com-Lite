# e-com-Lite
It is an e-commerce site with basic functionality using microservices and MongoDB.

* There are 2 users
    * Seller
    * Buyer

* Features of Seller :
    * Seller can register and login themselves.
    * Seller can Add Products for the buyers to view.
    * For Seller to buy products they must register or login as buyer.

* Features of Buyer:
    * Buyer can register and login themselves.
    * Buyer can view All Products.
    * Buyer can Add Products to the Cart.
    * Buyer can Remove Products from the Cart.
    * To place the order, the buyer must click on Checkout.

* When buyer clicks on ```Checkout``` , a mail is sent to the seller with their respective Products ordered by the Buyer.

### Technologies Used
1. Spring boot Framework
2. Kotlin
3. Jwt Authentication
4. Amazon S3 Bucket
5. ReactJs
6. Amazon Web Services

### Architecture Diagram
![Arch](https://user-images.githubusercontent.com/42665547/151505916-f70cdd1e-8523-48df-9a34-7c3a4f9119c6.png)

### **This Application uses _Amazon s3 Bucket_ to store ``image urls`` in MongoDB**

### Changes to be made before running the Project
1. In `application.properties` file of seller-service **(ecom)** add your MongoDB Url and provide Amazon S3 Bucket's Name and Security Credentials

![image](https://user-images.githubusercontent.com/42665547/151506680-7610d5cb-0569-4be8-adc7-3ffbbd90b604.png)

2. Similarly, in `application.properties` file of buyer-service **(ecom-buyer)** add your MongoDB Url and provide your email Id and password.

![image](https://user-images.githubusercontent.com/42665547/151506997-93cdf747-241d-44aa-afff-824646474235.png)

### Command to Run Frontend

``npm start``  ---> ecom-front






