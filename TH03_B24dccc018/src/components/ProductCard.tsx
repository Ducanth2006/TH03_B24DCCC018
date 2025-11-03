// src/components/ProductCard.tsx
import React from 'react';
import type { Product } from '../types';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useProducts();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${product.ten}" không?`)) { 
      dispatch({ type: 'DELETE_PRODUCT', payload: product.id });
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="card-link">
        <h3 className="product-name">{product.ten}</h3>
        <p className="product-category">{product.danhMuc}</p>
        <p className="product-price">{product.gia.toLocaleString('vi-VN')} VNĐ</p>
        <p className="product-quantity">Số lượng: {product.soLuong}</p>
      </Link>
      <div className="card-actions">
        <button className="btn-secondary" onClick={() => navigate(`/edit/${product.id}`)}>Sửa</button>
        <button className="btn-danger" onClick={handleDelete}>Xóa</button>
      </div>
    </div>
  );
};

export default ProductCard;