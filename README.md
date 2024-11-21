# (React + TypeScript) Product List

### Infinite Scrolling and Searchable Product List
This project implements an infinite scrolling product list using React with `TypeScript`. It allows users to browse products fetched from the [DummyJSON Products API](https://dummyjson.com/docs/products), with a search functionality to find products by name.


## Features
- Infinite Scrolling: Automatically loads more products as the user scrolls to the bottom of the page.
- Search: Search for products by product name.

### How to Run
Make sure you have the following installed on your system:
- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. Clone this repository:
   ```bash
    git clone $REPOSITORY_URL
    ```

2. Install Dependencies:
   Run the following command to install the necessary packages:
   ```bash
   npm install
   ```
   Or, if you're using Yarn:
   ```bash
   yarn install
   ```

3. Start the Development Server:
   Start the local development server with:
   ```bash
   npm start
   ```
   Or, if using Yarn:
   ```bash
   yarn start
   ```

   The application will be available at `http://localhost:3000`.

## API Information

This project uses the [DummyJSON Products API](https://dummyjson.com/docs/products):
- Base URL: `https://dummyjson.com/products`
- Endpoints:
  - `/products?limit=20&skip=<offset>`: Fetch paginated products.
  - `/products/search?q=<query>`: Search for products by name.

## Usage

### Infinite Scrolling
1. Scroll down the page to load more products.
2. The list will fetch the next 20 products as you scroll to the bottom.

### Search Functionality
1. Enter the product name in the search bar.
2. The list will update to show products that match the keyword.
3. If no products match the search query, a message `No products found` will be displayed.
4. If there are no more products to load, a message `No more products to show` will be displayed.
5. Click `X` icon to clear the search query and show all products.

