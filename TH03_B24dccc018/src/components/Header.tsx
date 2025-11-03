// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <Link to="/" className="logo">Quản Lý Sản Phẩm</Link>
      <nav>
        <Link to="/" className="nav-link">Trang chủ</Link>
        <Link to="/add" className="nav-link btn-primary">Thêm Sản Phẩm</Link>
      </nav>
    </header>
  );
};

export default Header;