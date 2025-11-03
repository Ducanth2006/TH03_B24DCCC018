// src/pages/AddProductPage.tsx
import React from 'react';
import ProductForm from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';
import { useNavigate } from 'react-router-dom';
import type { Product } from '../types';

const AddProductPage: React.FC = () => {
  const { dispatch } = useProducts();
  const navigate = useNavigate();

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    const newProduct = {
      ...productData,
      id: Date.now(), // Tạo ID duy nhất dựa trên timestamp
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    navigate('/');
  };

  return (
    <div>
      <h1 className="page-title">Thêm sản phẩm mới</h1>
      <ProductForm onSubmit={handleAddProduct} />
    </div>
  );
};

export default AddProductPage;