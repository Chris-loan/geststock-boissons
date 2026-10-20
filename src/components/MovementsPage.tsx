import { useState } from 'react';
import { Product, StockMovement } from '../types';
import { Plus, Search, ArrowUpCircle, ArrowDownCircle, X } from 'lucide-react';

interface MovementsPageProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  movements: StockMovement[];
  setMovements: (movements: StockMovement[]) => void;
}

export default function MovementsPage({ products, setProducts, movements, setMovements }: MovementsPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'entree' | 'sortie'>('all');
  const [formData, setFormData] = useState({
    productId: '',
    type: 'entree' as 'entree' | 'sortie',
    quantity: 0,
    reason: '',
    note: '',
  });

  const filteredMovements = movements.filter(m => {
    const matchSearch = m.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = filterType === 'all' || m.type === filterType;
    return matchSearch && matchType;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const product = products.find(p => p.id === formData.productId);
    if (!product) return;

    if (formData.type === 'sortie' && formData.quantity > product.stockCurrent) {
      alert('Stock insuffisant ! Stock disponible: ' + product.stockCurrent);
      return;
    }

    const newMovement: StockMovement = {
      id: Date.now().toString(),
      productId: formData.productId,
      productName: product.name,
      type: formData.type,
      quantity: formData.quantity,
      date: new Date().toISOString().split('T')[0],
      reason: formData.reason,
      note: formData.note,
    };

    // Update product stock
    const updatedProducts = products.map(p => {
      if (p.id === formData.productId) {
        return {
          ...p,
          stockCurrent: formData.type === 'entree'
            ? p.stockCurrent + formData.quantity
            : p.stockCurrent - formData.quantity,
        };
      }
      return p;
    });

    setProducts(updatedProducts);
    setMovements([newMovement, ...movements]);
    resetForm();
  };

  const resetForm = () => {
    setShowForm(false);
    setFormData({
      productId: '',
      type: 'entree',
      quantity: 0,
      reason: '',
      note: '',
    });
  };

  const selectedProduct = products.find(p => p.id === formData.productId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Mouvements de Stock</h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nouveau Mouvement
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un mouvement..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterType === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tous
          </button>
          <button
            onClick={() => setFilterType('entree')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
              filterType === 'entree' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ArrowUpCircle className="w-4 h-4" /> Entrées
          </button>
          <button
            onClick={() => setFilterType('sortie')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
              filterType === 'sortie' ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <ArrowDownCircle className="w-4 h-4" /> Sorties
          </button>
        </div>
      </div>

      {/* Movements Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Produit</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Quantité</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Raison</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Note</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovements.map(movement => (
                <tr key={movement.id} className="border-t border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-600">
                    {new Date(movement.date).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-800">{movement.productName}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      movement.type === 'entree'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {movement.type === 'entree' ? (
                        <><ArrowUpCircle className="w-3 h-3" /> Entrée</>
                      ) : (
                        <><ArrowDownCircle className="w-3 h-3" /> Sortie</>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-800">{movement.quantity}</td>
                  <td className="py-3 px-4 text-gray-600">{movement.reason}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs max-w-[200px] truncate">{movement.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredMovements.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            Aucun mouvement trouvé
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-bold text-gray-800">Nouveau Mouvement</h2>
              <button onClick={resetForm} className="p-1 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Produit</label>
                <select
                  required
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner un produit</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Stock: {p.stockCurrent})
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-600">
                    Stock actuel: <span className="font-bold text-gray-800">{selectedProduct.stockCurrent}</span> {selectedProduct.unit}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'entree' })}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                        formData.type === 'entree'
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ArrowUpCircle className="w-4 h-4" /> Entrée
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'sortie' })}
                      className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                        formData.type === 'sortie'
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <ArrowDownCircle className="w-4 h-4" /> Sortie
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantité</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={formData.quantity || ''}
                    onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Raison</label>
                <select
                  required
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Sélectionner une raison</option>
                  {formData.type === 'entree' ? (
                    <>
                      <option value="Réapprovisionnement">Réapprovisionnement</option>
                      <option value="Retour client">Retour client</option>
                      <option value="Correction inventaire">Correction inventaire</option>
                      <option value="Autre">Autre</option>
                    </>
                  ) : (
                    <>
                      <option value="Vente">Vente</option>
                      <option value="Perte/Casse">Perte/Casse</option>
                      <option value="Transfert">Transfert</option>
                      <option value="Correction inventaire">Correction inventaire</option>
                      <option value="Autre">Autre</option>
                    </>
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Note (optionnel)</label>
                <textarea
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={2}
                  placeholder="Détails supplémentaires..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
                    formData.type === 'entree'
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-orange-600 hover:bg-orange-700'
                  }`}
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
