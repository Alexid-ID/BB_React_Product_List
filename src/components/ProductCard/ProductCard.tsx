import React from 'react';
import './styles.css';

interface Props {
	title: string;
	price: number;
	thumbnail: string;
}

const ProductCard = ({ title, price, thumbnail }: Props) => {
	return (
		<div className="product-card">
			<img src={thumbnail} alt={title} className="product-image" />
			<div className="product-info">
				<h2>{title}</h2>
				<p>${price}</p>
			</div>
		</div>
	);
};

export default ProductCard
