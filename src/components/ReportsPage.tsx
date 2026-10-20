import { useState } from 'react';
import { Product, StockMovement } from '../types';
import * as XLSX from 'xlsx';
import { FileSpreadsheet, Mail, Download, Send, Calendar, CheckCircle, Clock } from 'lucide-react';

interface ReportsPageProps {
  products: Product[];
  movements: StockMovement[];
}

export default function ReportsPage({ products, movements }: ReportsPageProps) {
  const [emailSent, setEmailSent] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [lastSentDate, setLastSentDate] = useState<string | null>(null);
  const [directorEmail, setDirectorEmail] = useState('directeur@entreprise.fr');
  const [showEmailConfig, setShowEmailConfig] = useState(false);

  const generateExcelData = () => {
    // Sheet 1: État du stock
    const stockData = products.map(p => ({
      'Produit': p.name,
      'Catégorie': p.category,
      'Unité': p.unit,
      'Stock Actuel': p.stockCurrent,
      'Stock Minimum': p.stockMin,
      'Statut': p.stockCurrent <= p.stockMin ? 'ALERTE' : 'OK',
      'Prix Unitaire (FCFA)': p.price,
      'Valeur Stock (FCFA)': p.stockCurrent * p.price,
      'Fournisseur': p.supplier,
    }));

    // Sheet 2: Mouvements du jour
    const today = new Date().toISOString().split('T')[0];
    const todayMovements = movements.filter(m => m.date === today);
    const movementsData = todayMovements.map(m => ({
      'Date': new Date(m.date).toLocaleDateString('fr-FR'),
      'Produit': m.productName,
      'Type': m.type === 'entree' ? 'Entrée' : 'Sortie',
      'Quantité': m.quantity,
      'Raison': m.reason,
      'Note': m.note,
    }));

    // Sheet 3: Résumé
    const totalValue = products.reduce((sum, p) => sum + (p.stockCurrent * p.price), 0);
    const lowStockProducts = products.filter(p => p.stockCurrent <= p.stockMin);
    const summaryData = [
      { 'Indicateur': 'Date du rapport', 'Valeur': new Date().toLocaleDateString('fr-FR') },
      { 'Indicateur': 'Nombre total de produits', 'Valeur': products.length.toString() },
      { 'Indicateur': 'Stock total (unités)', 'Valeur': products.reduce((s, p) => s + p.stockCurrent, 0).toString() },
      { 'Indicateur': 'Valeur totale du stock', 'Valeur': `${totalValue.toLocaleString('fr-FR')} FCFA` },
      { 'Indicateur': 'Produits en alerte', 'Valeur': lowStockProducts.length.toString() },
      { 'Indicateur': 'Mouvements aujourd\'hui', 'Valeur': todayMovements.length.toString() },
      { 'Indicateur': 'Entrées aujourd\'hui', 'Valeur': todayMovements.filter(m => m.type === 'entree').reduce((s, m) => s + m.quantity, 0).toString() },
      { 'Indicateur': 'Sorties aujourd\'hui', 'Valeur': todayMovements.filter(m => m.type === 'sortie').reduce((s, m) => s + m.quantity, 0).toString() },
    ];

    return { stockData, movementsData, summaryData };
  };

  const exportToExcel = () => {
    const { stockData, movementsData, summaryData } = generateExcelData();
    const today = new Date().toISOString().split('T')[0];

    const wb = XLSX.utils.book_new();

    const ws1 = XLSX.utils.json_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, ws1, 'Résumé');

    const ws2 = XLSX.utils.json_to_sheet(stockData);
    XLSX.utils.book_append_sheet(wb, ws2, 'État du Stock');

    const ws3 = XLSX.utils.json_to_sheet(movementsData);
    XLSX.utils.book_append_sheet(wb, ws3, 'Mouvements du Jour');

    XLSX.writeFile(wb, `Rapport_Stock_${today}.xlsx`);
  };

  const sendEmailReport = () => {
    setSendingEmail(true);
    // Simulate sending email
    setTimeout(() => {
      setSendingEmail(false);
      setEmailSent(true);
      setLastSentDate(new Date().toLocaleString('fr-FR'));
      // Also download the file
      exportToExcel();
      setTimeout(() => setEmailSent(false), 5000);
    }, 2000);
  };

  const totalValue = products.reduce((sum, p) => sum + (p.stockCurrent * p.price), 0);
  const lowStockProducts = products.filter(p => p.stockCurrent <= p.stockMin);
  const today = new Date().toISOString().split('T')[0];
  const todayMovements = movements.filter(m => m.date === today);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Rapports & Envoi par Email</h1>
        <button
          onClick={() => setShowEmailConfig(!showEmailConfig)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <Mail className="w-4 h-4" />
          Configurer l'email
        </button>
      </div>

      {/* Email Config */}
      {showEmailConfig && (
        <div className="bg-blue-50 rounded-xl border border-blue-200 p-5">
          <h3 className="font-semibold text-blue-800 mb-3">Configuration de l'envoi par email</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-blue-700 mb-1">Email du directeur</label>
              <input
                type="email"
                value={directorEmail}
                onChange={(e) => setDirectorEmail(e.target.value)}
                className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                placeholder="directeur@entreprise.fr"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-blue-700 mb-1">Fréquence d'envoi</label>
              <select className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                <option value="daily">Quotidien (chaque jour à 18h)</option>
                <option value="weekly">Hebdomadaire (chaque lundi)</option>
                <option value="manual">Manuel uniquement</option>
              </select>
            </div>
          </div>
          <p className="text-sm text-blue-600 mt-2">
            <Clock className="w-3 h-3 inline" /> Le rapport quotidien sera envoyé automatiquement chaque jour à 18h00
          </p>
        </div>
      )}

      {/* Report Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-gray-800">Résumé du rapport du jour</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Date</p>
            <p className="font-semibold text-gray-800">{new Date().toLocaleDateString('fr-FR')}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Total Produits</p>
            <p className="font-semibold text-gray-800">{products.length}</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Valeur du Stock</p>
            <p className="font-semibold text-gray-800">{totalValue.toLocaleString('fr-FR')} FCFA</p>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500">Alertes</p>
            <p className="font-semibold text-red-600">{lowStockProducts.length} produit(s)</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={exportToExcel}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Download className="w-5 h-5" />
            Télécharger Excel
          </button>
          <button
            onClick={sendEmailReport}
            disabled={sendingEmail}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
          >
            {sendingEmail ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Envoi en cours...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Envoyer par Email
              </>
            )}
          </button>
        </div>

        {/* Success message */}
        {emailSent && (
          <div className="mt-4 flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-green-800 font-medium">Email envoyé avec succès !</p>
              <p className="text-sm text-green-600">
                Rapport envoyé à {directorEmail} le {lastSentDate}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Email Preview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Aperçu de l'email</h3>
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
          <div className="space-y-2 text-sm">
            <p><span className="font-medium text-gray-700">À:</span> {directorEmail}</p>
            <p><span className="font-medium text-gray-700">Objet:</span> Rapport Stock Quotidien - Dépôt de Boissons - {new Date().toLocaleDateString('fr-FR')}</p>
            <hr className="my-3" />
            <div className="text-gray-700">
              <p>Bonjour,</p>
              <p className="mt-2">Veuillez trouver ci-joint le rapport quotidien du stock de notre dépôt de boissons.</p>
              <div className="mt-4 bg-white rounded-lg p-4 border">
                <h4 className="font-semibold mb-2">📊 Résumé du jour :</h4>
                <ul className="space-y-1">
                  <li>• {products.length} produits en catalogue</li>
                  <li>• {products.reduce((s, p) => s + p.stockCurrent, 0)} unités en stock</li>
                  <li>• Valeur totale : {totalValue.toLocaleString('fr-FR')} FCFA</li>
                  <li>• {todayMovements.length} mouvement(s) aujourd'hui</li>
                  {lowStockProducts.length > 0 && (
                    <li className="text-red-600 font-medium">• ⚠️ {lowStockProducts.length} produit(s) en stock bas</li>
                  )}
                </ul>
              </div>
              <p className="mt-4">Le fichier Excel détaillé est en pièce jointe.</p>
              <p className="mt-2">Cordialement,<br />Système de Gestion de Stock</p>
            </div>
          </div>
        </div>
      </div>

      {/* Report History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Historique des envois</h3>
        {lastSentDate ? (
          <div className="flex items-center gap-3 bg-green-50 rounded-lg p-4 border border-green-200">
            <FileSpreadsheet className="w-8 h-8 text-green-600" />
            <div>
              <p className="font-medium text-green-800">Dernier envoi</p>
              <p className="text-sm text-green-600">Envoyé le {lastSentDate} à {directorEmail}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <FileSpreadsheet className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>Aucun envoi enregistré</p>
            <p className="text-sm">Utilisez le bouton "Envoyer par Email" pour envoyer le premier rapport</p>
          </div>
        )}
      </div>

      {/* Contenu du fichier Excel */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-800 mb-4">Contenu du fichier Excel</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-medium text-blue-800 mb-2">📋 Onglet "Résumé"</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Date du rapport</li>
              <li>• Nombre de produits</li>
              <li>• Stock total</li>
              <li>• Valeur du stock</li>
              <li>• Nombre d'alertes</li>
              <li>• Mouvements du jour</li>
            </ul>
          </div>
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <h4 className="font-medium text-green-800 mb-2">📦 Onglet "État du Stock"</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Nom du produit</li>
              <li>• Catégorie</li>
              <li>• Stock actuel / minimum</li>
              <li>• Statut (OK / Alerte)</li>
              <li>• Prix et valeur</li>
              <li>• Fournisseur</li>
            </ul>
          </div>
          <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
            <h4 className="font-medium text-orange-800 mb-2">🔄 Onglet "Mouvements"</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>• Date du mouvement</li>
              <li>• Produit concerné</li>
              <li>• Type (Entrée/Sortie)</li>
              <li>• Quantité</li>
              <li>• Raison</li>
              <li>• Notes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
