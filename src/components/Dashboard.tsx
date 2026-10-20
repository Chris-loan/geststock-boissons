import { Product, StockMovement } from '../types';
import { Package, TrendingUp, TrendingDown, AlertTriangle, DollarSign, BarChart3 } from 'lucide-react';

interface DashboardProps {
  products: Product[];
  movements: StockMovement[];
}

export default function Dashboard({ products, movements }: DashboardProps) {
  const totalProducts = products.length;
  const totalStock = products.reduce((sum, p) => sum + p.stockCurrent, 0);
  const totalValue = products.reduce((sum, p) => sum + (p.stockCurrent * p.price), 0);
  const lowStockProducts = products.filter(p => p.stockCurrent <= p.stockMin);
  const todayMovements = movements.filter(m => m.date === new Date().toISOString().split('T')[0]);
  const todayEntries = todayMovements.filter(m => m.type === 'entree').reduce((sum, m) => sum + m.quantity, 0);
  const todayExits = todayMovements.filter(m => m.type === 'sortie').reduce((sum, m) => sum + m.quantity, 0);

  const categoryStats = products.reduce((acc, p) => {
    if (!acc[p.category]) {
      acc[p.category] = { count: 0, stock: 0, value: 0 };
    }
    acc[p.category].count++;
    acc[p.category].stock += p.stockCurrent;
    acc[p.category].value += p.stockCurrent * p.price;
    return acc;
  }, {} as Record<string, { count: number; stock: number; value: number }>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord</h1>
        <p className="text-sm text-gray-500">
          {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Produits</p>
              <p className="text-2xl font-bold text-gray-800">{totalProducts}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Stock Total</p>
              <p className="text-2xl font-bold text-gray-800">{totalStock}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <BarChart3 className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Valeur du Stock</p>
              <p className="text-2xl font-bold text-gray-800">{totalValue.toLocaleString('fr-FR')} FCFA</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Alertes Stock Bas</p>
              <p className="text-2xl font-bold text-red-600">{lowStockProducts.length}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Today's movements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-gray-700">Entrées du jour</h3>
          </div>
          <p className="text-3xl font-bold text-green-600">{todayEntries}</p>
          <p className="text-sm text-gray-500 mt-1">unités reçues aujourd'hui</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-3">
            <TrendingDown className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-700">Sorties du jour</h3>
          </div>
          <p className="text-3xl font-bold text-orange-600">{todayExits}</p>
          <p className="text-sm text-gray-500 mt-1">unités expédiées aujourd'hui</p>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Stock par catégorie</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(categoryStats).map(([category, stats]) => (
            <div key={category} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700">{category}</h4>
              <div className="mt-2 space-y-1">
                <p className="text-sm text-gray-600">Produits: <span className="font-semibold">{stats.count}</span></p>
                <p className="text-sm text-gray-600">Stock: <span className="font-semibold">{stats.stock}</span></p>
                <p className="text-sm text-gray-600">Valeur: <span className="font-semibold">{stats.value.toLocaleString('fr-FR')} FCFA</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Low stock alerts */}
      {lowStockProducts.length > 0 && (
        <div className="bg-red-50 rounded-xl border border-red-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-800">Alertes de stock bas</h3>
          </div>
          <div className="space-y-2">
            {lowStockProducts.map(product => (
              <div key={product.id} className="flex items-center justify-between bg-white rounded-lg p-3 border border-red-100">
                <div>
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-red-600 font-bold">{product.stockCurrent} / {product.stockMin} min</p>
                  <p className="text-xs text-gray-500">{product.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent movements */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-700 mb-4">Derniers mouvements</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Date</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Produit</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Type</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Quantité</th>
                <th className="text-left py-2 px-3 text-gray-500 font-medium">Raison</th>
              </tr>
            </thead>
            <tbody>
              {movements.slice(0, 5).map(movement => (
                <tr key={movement.id} className="border-b border-gray-50">
                  <td className="py-2 px-3 text-gray-600">{new Date(movement.date).toLocaleDateString('fr-FR')}</td>
                  <td className="py-2 px-3 font-medium text-gray-800">{movement.productName}</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      movement.type === 'entree' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {movement.type === 'entree' ? '↑ Entrée' : '↓ Sortie'}
                    </span>
                  </td>
                  <td className="py-2 px-3 font-semibold text-gray-800">{movement.quantity}</td>
                  <td className="py-2 px-3 text-gray-600">{movement.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
