// src/components/Filter.tsx
import React, { useState } from 'react';
import type { ProductCategory } from '../types';

interface FilterProps {
  setFilterCategory: (category: ProductCategory | 'all') => void;
  setPriceRange: (range: { min: number; max: number }) => void;
}

const categories: ProductCategory[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

const Filter: React.FC<FilterProps> = ({ setFilterCategory, setPriceRange }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handlePriceFilter = () => {
        const min = minPrice ? Number(minPrice) : 0;
        const max = maxPrice ? Number(maxPrice) : Infinity;
        setPriceRange({ min, max });
    };

    return (
        <div className="filter-controls">
            <select onChange={(e) => setFilterCategory(e.target.value as ProductCategory | 'all')}>
                <option value="all">Tất cả danh mục</option>
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <input 
                type="number" 
                placeholder="Giá từ" 
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
            />
            <input 
                type="number" 
                placeholder="Giá đến"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
            />
            <button onClick={handlePriceFilter}>Lọc giá</button>
        </div>
    );
};

export default Filter;