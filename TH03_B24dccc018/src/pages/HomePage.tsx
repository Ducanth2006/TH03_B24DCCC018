// src/pages/HomePage.tsx
import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import Filter from '../components/Filter';
import Pagination from '../components/Pagination';
import type { ProductCategory } from '../types';

const ITEMS_PER_PAGE = 6;

const HomePage: React.FC = () => {
  const { state } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<ProductCategory | 'all'>('all');
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({ min: 0, max: Infinity });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = useMemo(() => {
    return state.products
      .filter((product) => // Lọc theo tên sản phẩm
        product.ten.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) => // Lọc theo danh mục
        filterCategory === 'all' || product.danhMuc === filterCategory
      )
      .filter((product) => // Lọc theo khoảng giá
        product.gia >= priceRange.min && (priceRange.max === Infinity || product.gia <= priceRange.max)
      );
  }, [state.products, searchTerm, filterCategory, priceRange]);

  // Logic phân trang
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div>
      <h1 className="page-title">Danh sách sản phẩm</h1>
      <div className="filters-container">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filter 
            setFilterCategory={setFilterCategory} 
            setPriceRange={setPriceRange}
        />
      </div>
      <ProductList products={currentProducts} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredProducts.length}
      />
    </div>
  );
};

export default HomePage;