import { useState } from 'react';
import { Product, StockMovement, PageView } from './types';
import { initialProducts, initialMovements } from './data';
import Dashboard from './components/Dashboard';
import ProductsPage from './components/ProductsPage';
import MovementsPage from './components/MovementsPage';
import ReportsPage from './components/ReportsPage';
import SettingsPage from './components/SettingsPage';
import TicketsPage from './components/TicketsPage';
import {
  LayoutDashboard,
  Package,
  ArrowLeftRight,
  FileBarChart,
  Menu,
  X,
  Beer,
  Settings,
  Ticket,
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('dashboard');
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [movements, setMovements] = useState<StockMovement[]>(initialMovements);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard' as PageView, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'products' as PageView, label: 'Produits', icon: Package },
    { id: 'movements' as PageView, label: 'Mouvements', icon: ArrowLeftRight },
    { id: 'tickets' as PageView, label: 'Tickets', icon: Ticket },
    { id: 'reports' as PageView, label: 'Rapports & Email', icon: FileBarChart },
    { id: 'settings' as PageView, label: 'Paramètres', icon: Settings },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard products={products} movements={movements} />;
      case 'products':
        return <ProductsPage products={products} setProducts={setProducts} />;
      case 'movements':
        return (
          <MovementsPage
            products={products}
            setProducts={setProducts}
            movements={movements}
            setMovements={setMovements}
          />
        );
      case 'tickets':
        return <TicketsPage products={products} setProducts={setProducts} movements={movements} setMovements={setMovements} />;
      case 'reports':
        return <ReportsPage products={products} movements={movements} />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard products={products} movements={movements} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-slate-900 to-slate-800 transform transition-transform duration-300 lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center gap-3 p-5 border-b border-slate-700">
          <div className="bg-amber-500 p-2 rounded-lg">
            <Beer className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">GestStock</h1>
            <p className="text-slate-400 text-xs">Dépôt de Boissons</p>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                    : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">D</span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">Directeur</p>
              <p className="text-slate-400 text-xs">Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <h2 className="text-lg font-semibold text-gray-800 hidden sm:block">
              {navItems.find(i => i.id === currentPage)?.label}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-700">
                {products.filter(p => p.stockCurrent <= p.stockMin).length} alerte(s)
              </p>
              <p className="text-xs text-gray-500">
                {new Date().toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
              <Settings className="w-4 h-4 text-white" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-6">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}
