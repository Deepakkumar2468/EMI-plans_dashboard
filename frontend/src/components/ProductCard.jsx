import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
         onClick={() => navigate(`/products/${product._id}`)}>
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <span className="text-gray-500 line-through text-sm">₹{product.mrp.toLocaleString()}</span>
            <span className="text-2xl font-bold text-green-600 ml-2">₹{product.price.toLocaleString()}</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">{product.variants.length} variants available</p>
      </div>
    </div>
  );
};

export default ProductCard;