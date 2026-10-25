import { useState } from 'react';
import { Product, StockMovement } from '../types';
import { Printer, Ticket, ArrowUpCircle, ArrowDownCircle, Calendar, Filter } from 'lucide-react';

interface TicketsPageProps {
  products: Product[];
  movements: StockMovement[];
}

export default function TicketsPage({ products, movements }: TicketsPageProps) {
  const [selectedMovement, setSelectedMovement] = useState<StockMovement | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'entree' | 'sortie'>('all');
  const [dateFilter, setDateFilter] = useState('');

  const filteredMovements = movements.filter(m => {
    const matchType = filterType === 'all' || m.type === filterType;
    const matchDate = !dateFilter || m.date === dateFilter;
    return matchType && matchDate;
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handlePrint = (movement: StockMovement) => {
    setSelectedMovement(movement);
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handlePrintAll = () => {
    // Créer une vue imprimable avec tous les tickets filtrés
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const savedSettings = localStorage.getItem('geststock_settings');
    const companyName = savedSettings ? JSON.parse(savedSettings).companyName : 'Dépôt de Boissons';

    const ticketsHTML = filteredMovements.map(movement => {
      const product = products.find(p => p.id === movement.productId);
      return `
        <div class="ticket">
          <div class="ticket-header">
            <h2>${companyName}</h2>
            <p>BON DE ${movement.type === 'entree' ? 'ENTRÉE' : 'SORTIE'}</p>
          </div>
          <div class="ticket-info">
            <p><strong>N° Ticket:</strong> ${movement.id}</p>
            <p><strong>Date:</strong> ${new Date(movement.date).toLocaleDateString('fr-FR')}</p>
            <p><strong>Type:</strong> ${movement.type === 'entree' ? '↑ Entrée de stock' : '↓ Sortie de stock'}</p>
          </div>
          <div class="ticket-product">
            <h3>Produit</h3>
            <p><strong>${movement.productName}</strong></p>
            ${product ? `<p>Unité: ${product.unit}</p>` : ''}
            <p class="quantity">Quantité: <strong>${movement.quantity}</strong></p>
          </div>
          <div class="ticket-reason">
            <p><strong>Raison:</strong> ${movement.reason}</p>
            ${movement.note ? `<p><strong>Note:</strong> ${movement.note}</p>` : ''}
          </div>
          <div class="ticket-footer">
            <div class="signature">
              <p>Signature:</p>
              <div class="signature-line"></div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Tickets de Stock - ${companyName}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
          }
          .ticket {
            border: 2px dashed #333;
            padding: 20px;
            margin-bottom: 20px;
            page-break-after: always;
            max-width: 400px;
          }
          .ticket-header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
            margin-bottom: 15px;
          }
          .ticket-header h2 {
            margin: 0;
            font-size: 18px;
          }
          .ticket-header p {
            margin: 5px 0 0 0;
            font-size: 14px;
            font-weight: bold;
          }
          .ticket-info {
            margin-bottom: 15px;
          }
          .ticket-info p {
            margin: 5px 0;
            font-size: 12px;
          }
          .ticket-product {
            background: #f5f5f5;
            padding: 10px;
            margin-bottom: 15px;
            border-radius: 4px;
          }
          .ticket-product h3 {
            margin: 0 0 10px 0;
            font-size: 14px;
          }
          .ticket-product p {
            margin: 5px 0;
            font-size: 12px;
          }
          .ticket-product .quantity {
            font-size: 16px;
            margin-top: 10px;
          }
          .ticket-reason {
            margin-bottom: 15px;
          }
          .ticket-reason p {
            margin: 5px 0;
            font-size: 12px;
          }
          .ticket-footer {
            margin-top: 30px;
          }
          .signature {
            margin-top: 20px;
          }
          .signature p {
            margin: 0 0 5px 0;
            font-size: 12px;
          }
          .signature-line {
            border-top: 1px solid #333;
            width: 200px;
            margin-top: 30px;
          }
          @media print {
            body {
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        ${ticketsHTML}
      </body>
      </html>
    `);

    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 250);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Tickets de Mouvement</h1>
        <button
          onClick={handlePrintAll}
          disabled={filteredMovements.length === 0}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Printer className="w-4 h-4" />
          Imprimer tout ({filteredMovements.length})
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
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
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {dateFilter && (
            <button
              onClick={() => setDateFilter('')}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Effacer
            </button>
          )}
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMovements.map(movement => {
          const product = products.find(p => p.id === movement.productId);
          return (
            <div
              key={movement.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Ticket Header */}
              <div className={`p-4 ${
                movement.type === 'entree' ? 'bg-green-50 border-b-2 border-green-500' : 'bg-orange-50 border-b-2 border-orange-500'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {movement.type === 'entree' ? (
                      <ArrowUpCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <ArrowDownCircle className="w-5 h-5 text-orange-600" />
                    )}
                    <span className={`font-bold text-sm ${
                      movement.type === 'entree' ? 'text-green-700' : 'text-orange-700'
                    }`}>
                      {movement.type === 'entree' ? 'BON D\'ENTRÉE' : 'BON DE SORTIE'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    N° {movement.id.slice(-6)}
                  </span>
                </div>
              </div>

              {/* Ticket Content */}
              <div className="p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Date:</span>
                  <span className="font-medium text-gray-800">
                    {new Date(movement.date).toLocaleDateString('fr-FR')}
                  </span>
                </div>

                <div className="border-t pt-3">
                  <p className="text-xs text-gray-500 mb-1">Produit</p>
                  <p className="font-semibold text-gray-800">{movement.productName}</p>
                  {product && (
                    <p className="text-xs text-gray-500 mt-1">{product.unit}</p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Quantité</p>
                  <p className="text-2xl font-bold text-gray-800">{movement.quantity}</p>
                </div>

                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Raison:</span>
                    <span className="font-medium text-gray-800">{movement.reason}</span>
                  </div>
                  {movement.note && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Note:</p>
                      <p className="text-sm text-gray-700">{movement.note}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Ticket Actions */}
              <div className="p-4 bg-gray-50 border-t flex gap-2">
                <button
                  onClick={() => handlePrint(movement)}
                  className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <Printer className="w-4 h-4" />
                  Imprimer
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMovements.length === 0 && (
        <div className="text-center py-12">
          <Ticket className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Aucun ticket trouvé</p>
          <p className="text-gray-400 text-sm mt-2">
            Modifiez les filtres ou créez un nouveau mouvement
          </p>
        </div>
      )}

      {/* Hidden Print View */}
      {selectedMovement && (
        <div className="hidden print:block">
          <PrintTicket movement={selectedMovement} product={products.find(p => p.id === selectedMovement.productId)} />
        </div>
      )}
    </div>
  );
}

// Composant pour l'impression individuelle
function PrintTicket({ movement, product }: { movement: StockMovement; product?: Product }) {
  const savedSettings = localStorage.getItem('geststock_settings');
  const companyName = savedSettings ? JSON.parse(savedSettings).companyName : 'Dépôt de Boissons';

  return (
    <div className="border-2 border-dashed border-gray-800 p-6 max-w-md mx-auto my-4 print:my-0">
      <div className="text-center border-b-2 border-gray-800 pb-3 mb-4">
        <h2 className="text-xl font-bold">{companyName}</h2>
        <p className="text-sm font-semibold mt-1">
          BON DE {movement.type === 'entree' ? 'ENTRÉE' : 'SORTIE'}
        </p>
      </div>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">N° Ticket:</span>
          <span className="font-medium">{movement.id}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Date:</span>
          <span className="font-medium">{new Date(movement.date).toLocaleDateString('fr-FR')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Type:</span>
          <span className="font-medium">
            {movement.type === 'entree' ? '↑ Entrée de stock' : '↓ Sortie de stock'}
          </span>
        </div>
      </div>

      <div className="bg-gray-100 p-3 rounded mb-4">
        <h3 className="font-semibold text-sm mb-2">Produit</h3>
        <p className="font-bold">{movement.productName}</p>
        {product && <p className="text-xs text-gray-600 mt-1">Unité: {product.unit}</p>}
        <p className="text-lg font-bold mt-2">
          Quantité: {movement.quantity}
        </p>
      </div>

      <div className="space-y-2 text-sm mb-6">
        <div>
          <span className="text-gray-600">Raison:</span>
          <p className="font-medium">{movement.reason}</p>
        </div>
        {movement.note && (
          <div>
            <span className="text-gray-600">Note:</span>
            <p className="text-sm">{movement.note}</p>
          </div>
        )}
      </div>

      <div className="border-t pt-4 mt-8">
        <p className="text-xs text-gray-600 mb-1">Signature:</p>
        <div className="border-t border-gray-800 w-48 mt-8"></div>
      </div>
    </div>
  );
}
