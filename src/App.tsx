import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./App.css";
import SearchInput from "./components/SearchInput/SearchInput";
import ProductCard from "./components/ProductCard/ProductCard";
import { IoMdArrowRoundUp } from "react-icons/io";

interface Product {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
}

// .env
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
// console.log(API_BASE_URL);

const App: React.FC = () => {
	const [keyword, setKeyword] = useState<string>("");
	const [products, setProducts] = useState<Product[]>([]);
	const [isFetching, setIsFetching] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [loadMore, setLoadMore] = useState(true);

	// Fetch products
	const fetchProducts = async (page: number) => {
		try {
			setIsFetching(true);
			const response = await axios.get(`${API_BASE_URL}?limit=20&skip=${(page - 1) * 20}`);
			const fetchedProducts = response.data.products.map((product: any) => {
				return {
					id: product.id,
					title: product.title,
					price: product.price,
					thumbnail: product.thumbnail,
				};
			});
			setProducts([...products, ...fetchedProducts]);

			fetchedProducts.length > 0 ? setLoadMore(true) : setLoadMore(false);
			console.log(fetchedProducts.length);
		} catch (error) {
			console.error("Error fetching products: ", error);
		} finally {
			setIsFetching(false);
		}
	};

	// Search products
	const searchProducts = async (keyword: string) => {
		try {
			setIsFetching(true);
			const response = await axios.get(`${API_BASE_URL}/search?q=${keyword}`);
			const fetchedProducts = response.data.products.map((product: any) => {
				return {
					id: product.id,
					title: product.title,
					price: product.price,
					thumbnail: product.thumbnail,
				};
			});
			setProducts(fetchedProducts);
			setLoadMore(false);
		} catch (error) {
			console.error("Error fetching products: ", error);
		} finally {
			setIsFetching(false);
		}
	};

	useEffect(() => {
		fetchProducts(currentPage);
	}, [currentPage]);

	useEffect(() => {
		console.log("keyword", keyword, "currentPage", currentPage);
		if (keyword) {
			searchProducts(keyword.trim());
		} else {
			setProducts([]);
			setCurrentPage(1);
			setLoadMore(true);
            fetchProducts(currentPage);
		}
	}, [keyword]);

	// Handle infinite scroll
	const handleScroll = useCallback(() => {
		if (
			window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 100 &&
			!isFetching
		) {
			setCurrentPage((prev) => prev + 1);
		}
	}, [loadMore, isFetching]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [handleScroll]);

	return (
		<div className="App">
			<h1>Products List</h1>
			<SearchInput
				keyword={keyword}
				onChange={(e) => {
					setKeyword(e.target.value);
				}}
			/>
			<div className="product-list">
				{products.length == 0 && !isFetching ? (
					<p>No products found.</p>
				) : (
					products.map((product) => (
						<ProductCard
							key={product.id}
							title={product.title}
							price={product.price}
							thumbnail={product.thumbnail}
						/>
					))
				)}
			</div>
			{isFetching && <p>Loading...</p>}

			{!loadMore && !isFetching && products.length > 0 && <p>No more products to show.</p>}

			{/* move to top */}
			<button className="totop-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
				<IoMdArrowRoundUp />
			</button>
		</div>
	);
};

export default App;
