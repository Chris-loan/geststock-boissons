export interface Product {
  id: string;
  name: string;
  category: string;
  unit: string;
  price: number;
  stockMin: number;
  stockCurrent: number;
  supplier: string;
  createdAt: string;
}

export interface StockMovement {
  id: string;
  productId: string;
  productName: string;
  type: 'entree' | 'sortie';
  quantity: number;
  date: string;
  reason: string;
  note: string;
}

export interface DailyReport {
  date: string;
  totalProducts: number;
  totalStock: number;
  movements: StockMovement[];
  lowStockProducts: Product[];
}

export type PageView = 'dashboard' | 'products' | 'movements' | 'tickets' | 'reports' | 'settings';
