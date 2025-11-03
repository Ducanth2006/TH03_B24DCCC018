import React, { useState, useEffect } from 'react';
import type { Product, ProductCategory } from '../types';
import { useNavigate } from 'react-router-dom';

const categories: ProductCategory[] = ['Điện tử', 'Quần áo', 'Đồ ăn', 'Sách', 'Khác'];

// --- PHẦN SỬA LỖI NẰM Ở ĐÂY ---

// Định nghĩa props cơ bản cho form (Thêm mới)
interface ProductFormAddProps {
  onSubmit: (product: Omit<Product, 'id'>) => void;
  initialData?: undefined;
}

// Định nghĩa props cho form (Chỉnh sửa)
interface ProductFormEditProps {
  onSubmit: (product: Product) => void;
  initialData: Product; // Bắt buộc phải có
}

// Kiểu cuối cùng là 1 trong 2
type ProductFormProps = ProductFormAddProps | ProductFormEditProps;

// --- KẾT THÚC PHẦN SỬA LỖI ---


const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialData }) => {
  const [product, setProduct] = useState({
    ten: '',
    danhMuc: '' as ProductCategory,
    gia: '',
    soLuong: '',
    moTa: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  useEffect(() => {
    if (initialData) {
      setProduct({
        ten: initialData.ten,
        danhMuc: initialData.danhMuc,
        gia: String(initialData.gia),
        soLuong: String(initialData.soLuong),
        moTa: initialData.moTa,
      });
    }
  }, [initialData]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (product.ten.trim().length < 3) {
      newErrors.ten = 'Tên sản phẩm phải có ít nhất 3 ký tự.';
    }
    if (!product.danhMuc) {
      newErrors.danhMuc = 'Vui lòng chọn danh mục.';
    }
    const price = Number(product.gia);
    if (isNaN(price) || price <= 0) {
      newErrors.gia = 'Giá phải là một số dương.';
    }
    const quantity = Number(product.soLuong);
    if (!Number.isInteger(quantity) || quantity <= 0) {
      newErrors.soLuong = 'Số lượng phải là một số nguyên dương.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      const productData = {
        ...product,
        gia: Number(product.gia),
        soLuong: Number(product.soLuong),
      };

      // Logic này vẫn giữ nguyên, nhưng giờ TypeScript
      // đã hiểu rõ ngữ cảnh
      if (initialData) {
        // TypeScript hiểu đây là form Edit,
        // và onSubmit đang là: (product: Product) => void
        onSubmit({ ...initialData, ...productData });
      } else {
        // TypeScript hiểu đây là form Add,
        // và onSubmit đang là: (product: Omit<Product, 'id'>) => void
        // (Lưu ý: ta ép kiểu `onSubmit` để gọi nó)
        (onSubmit as (product: Omit<Product, 'id'>) => void)(productData);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div>
        <label>Tên sản phẩm:</label>
        <input type="text" value={product.ten} onChange={(e) => setProduct({ ...product, ten: e.target.value })} />
        {errors.ten && <p className="error">{errors.ten}</p>}
      </div>
      <div>
        <label>Danh mục:</label>
        <select value={product.danhMuc} onChange={(e) => setProduct({ ...product, danhMuc: e.target.value as ProductCategory })}>
          <option value="">-- Chọn danh mục --</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        {errors.danhMuc && <p className="error">{errors.danhMuc}</p>}
      </div>
      <div>
        <label>Giá:</label>
        <input type="number" value={product.gia} onChange={(e) => setProduct({ ...product, gia: e.target.value })} />
        {errors.gia && <p className="error">{errors.gia}</p>}
      </div>
      <div>
        <label>Số lượng:</label>
        <input type="number" value={product.soLuong} onChange={(e) => setProduct({ ...product, soLuong: e.target.value })} />
        {errors.soLuong && <p className="error">{errors.soLuong}</p>}
      </div>
      <div>
        <label>Mô tả:</label>
        <textarea value={product.moTa} onChange={(e) => setProduct({ ...product, moTa: e.target.value })} />
      </div>
      <div className="form-actions">
          <button type="submit" className="btn-primary">Lưu sản phẩm</button>
          <button type="button" className="btn-secondary" onClick={() => navigate('/')}>Hủy</button>
      </div>
    </form>
  );
};

export default ProductForm;