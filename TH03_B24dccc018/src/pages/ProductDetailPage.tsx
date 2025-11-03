// src/pages/ProductDetailPage.tsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { state } = useProducts();
  const product = state.products.find(p => p.id === Number(id));

  if (!product) {
    return <div>Sản phẩm không được tìm thấy.</div>;
  }

  return (
    <div className="product-detail">
      <h1 className="product-detail-name">{product.ten}</h1>
      <p><strong>Danh mục:</strong> {product.danhMuc}</p>
      <p><strong>Giá:</strong> {product.gia.toLocaleString('vi-VN')} VNĐ</p>
      <p><strong>Số lượng trong kho:</strong> {product.soLuong}</p>
      <p><strong>Mô tả:</strong> {product.moTa}</p>
      <Link to="/" className="btn-secondary">Quay lại danh sách</Link>
    </div>
  );
};

export default ProductDetailPage;