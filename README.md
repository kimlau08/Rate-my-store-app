# Rate-my-store-app
# 
# Problem Statement
### Provide a full stack application implementation for customer loyalty programs for stores, e.g. restuarants, shops, etc. Allow customers to rate product, serivce, cleanliness and overall scores of individual stores, to support building of customer experience and brands. 
# 
# Target users
### Retail customers who can rate the stores they have visited and provides feedback. Stackholders who have vested interests in managing and improving their stores's brand and business.
# 
# Front-end Layout
### Home
![wireframe](./screens/Home.png)
### Login - authentication using Postgres backend
![wireframe](./screens/Login.png)
### Reviews - select a store to review 
![wireframe](./screens/Reviews.png)
### Review list - allowing update and delete on specific review 
![wireframe](./screens/Review_list.png)
### Barcode - for vouchers generated after creating a review
![wireframe](./screens/Barcode.png)
# 
# Components
### Stateful components
#### App.js - Nav bar. Carousel.
#### Login.js - Login and autheticate
#### Reviews.js - Review list and API calls for CRUD operations
#### SelectList.js - Generator of select list dynamically
# 
### Functional components
#### Home.js - landing page with rendering shown App.js
#### Rewards.js - API calls for voucher barcode generation
# 
# API used: 
### 1) Barcode generation: https://quickchart.io/qr
### 2) Backend database CRUD operations
#
# Technologies used additionally
### Express.js server backend as image file server 
### React-slideshow to graphically illustrate the business concept in home page
### Axios for API calls
