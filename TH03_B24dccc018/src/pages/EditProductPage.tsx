// src/pages/EditProductPage.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import { useProducts } from '../context/ProductContext';
import type { Product } from '../types';

const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useProducts();
  const navigate = useNavigate();

  const productToEdit = state.products.find(p => p.id === Number(id));

  const handleUpdateProduct = (productData: Product) => {
   dispatch({ type: 'UPDATE_PRODUCT', payload: productData });
    navigate('/');
  };

  if (!productToEdit) {
    return <div>Sản phẩm không tồn tại.</div>;
  }

  return (
    <div>
      <h1 className="page-title">Chỉnh sửa sản phẩm</h1>
      <ProductForm onSubmit={handleUpdateProduct} initialData={productToEdit} />
    </div>
  );
};

export default EditProductPage;