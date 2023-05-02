# E-Commerce React app

## Features:-

1. Retrieving data in JSON format from the API using React.js by using axios.
2. Displaying the list of categories retrieved from the API.
3. Using redux for state management such as loading states, error states, and
success states.
4. When a user clicks on a category, the products related to that category will be fetched from product API and will shown in the Products Page. Here, used the category ID obtained from the clicked category to construct the API endpoint URL.
5. Implemented pagination in product page using 'react-paginate' library.
6. Added sorting functionality to enable users to sort the products by various criteria, such as date,price and alphabetical order. 
7. Added filtering functionality to enable users to filter the products by various criteria. Used redux store to implement both sorting and filtering.
8. Added one eye icon in products page, so when a user clicks on it a modal with some addition details will be shown for that product.
9. When someone clicks on a product,the product detail page will open which will call the product detail API with the product ID.

## Technology :-

- React.JS
- Redux 
- Axios
- Tailwind CSS


## Deployed URL :-

https://sahilmund.github.io/React_Ecommerce


## Steps to run the project :-

#### Step 1 :- Clone the repo

```
https://github.com/SahilMund/React_Ecommerce.git
```

#### Step 2 :- To install the dependencies

```
npm install
```

#### Step 3 :- To run the application

```
npm start
```

<hr/>

## Folder Structure :-

```
.gitignore
package-lock.json
package.json
public
   |-- favicon.ico
   |-- index.html
   |-- logo192.png
   |-- logo512.png
   |-- manifest.json
   |-- robots.txt
src
   |-- App.css
   |-- App.js
   |-- api
   |   |-- constants.js
   |-- components
   |   |-- home
   |   |   |-- Category.jsx
   |   |   |-- CategoryCard.jsx
   |   |   |-- Product.jsx
   |   |   |-- ProductCard.jsx
   |   |   |-- ProductCardModal.jsx
   |   |-- index.js
   |   |-- layout
   |   |   |-- Dropdown.jsx
   |   |   |-- Footer.jsx
   |   |   |-- Header.jsx
   |   |   |-- Navbar.jsx
   |   |-- product
   |   |   |-- DropdownFilter.jsx
   |   |   |-- ProductDetails.jsx
   |   |   |-- ProductDetailsInfo.jsx
   |   |-- utils
   |   |   |-- Loader.jsx
   |-- index.js
   |-- pages
   |   |-- HomePage.jsx
   |   |-- ProductDetailsPage.jsx
   |   |-- ProductPage.jsx
   |   |-- index.js
   |-- redux
   |   |-- action-types.js
   |   |-- actions
   |   |   |-- index.js
   |   |   |-- product.js
   |   |-- reducers
   |   |   |-- index.js
   |   |   |-- productReducer.js
   |   |-- store.js
   |-- static
   |   |-- data.js
   |-- styles
   |   |-- style.js
tailwind.config.js
```
