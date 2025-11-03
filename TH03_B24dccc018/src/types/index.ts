// src/types/index.ts
export type ProductCategory = 'Điện tử' | 'Quần áo' | 'Đồ ăn' | 'Sách' | 'Khác';

export interface Product {
  id: number;
  ten: string;
  danhMuc: ProductCategory;
  gia: number;
  soLuong: number;
  moTa: string;
}