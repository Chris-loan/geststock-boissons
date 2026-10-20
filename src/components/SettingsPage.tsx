import { useState, useEffect } from 'react';
import { Mail, Save, CheckCircle, Bell, Clock, User, Building, Globe } from 'lucide-react';

interface Settings {
  directorEmail: string;
  directorName: string;
  companyName: string;
  sendFrequency: string;
  sendTime: string;
  autoSend: boolean;
  lowStockAlert: boolean;
  alertThreshold: number;
}

const defaultSettings: Settings = {
  directorEmail: 'directeur@entreprise.com',
  directorName: 'Directeur Général',
  companyName: 'Dépôt de Boissons',
  sendFrequency: 'daily',
  sendTime: '18:00',
  autoSend: true,
  lowStockAlert: true,
  alertThreshold: 10,
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('geststock_settings');
    return saved ? JSON.parse(saved) : defaultSettings;
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    localStorage.setItem('geststock_settings', JSON.stringify(settings));
  }, [settings]);

  const handleSave = () => {
    localStorage.setItem('geststock_settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Paramètres</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <Save className="w-4 h-4" />
          Enregistrer
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg p-4">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-800 font-medium">Paramètres enregistrés avec succès !</p>
        </div>
      )}

      {/* Email du directeur */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-blue-100 p-2.5 rounded-lg">
            <Mail className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Email du Directeur</h2>
            <p className="text-sm text-gray-500">Adresse de réception des rapports quotidiens</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du directeur
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={settings.directorName}
                onChange={(e) => setSettings({ ...settings, directorName: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: M. Jean Dupont"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Adresse email du directeur
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={settings.directorEmail}
                onChange={(e) => setSettings({ ...settings, directorEmail: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="directeur@entreprise.com"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Le rapport Excel quotidien sera envoyé à cette adresse
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de l'entreprise
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Dépôt de Boissons"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fréquence d'envoi */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-purple-100 p-2.5 rounded-lg">
            <Clock className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Planification des envois</h2>
            <p className="text-sm text-gray-500">Configurez la fréquence et l'heure d'envoi</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">Envoi automatique</p>
                <p className="text-sm text-gray-500">Envoyer le rapport automatiquement</p>
              </div>
            </div>
            <button
              onClick={() => setSettings({ ...settings, autoSend: !settings.autoSend })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.autoSend ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  settings.autoSend ? 'translate-x-6.5 left-0.5' : 'left-0.5'
                }`}
                style={{ transform: settings.autoSend ? 'translateX(24px)' : 'translateX(0)' }}
              />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fréquence d'envoi
              </label>
              <select
                value={settings.sendFrequency}
                onChange={(e) => setSettings({ ...settings, sendFrequency: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">📅 Quotidien (tous les jours)</option>
                <option value="weekly">📆 Hebdomadaire (chaque lundi)</option>
                <option value="monthly">🗓️ Mensuel (1er du mois)</option>
                <option value="manual">✋ Manuel uniquement</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Heure d'envoi
              </label>
              <input
                type="time"
                value={settings.sendTime}
                onChange={(e) => setSettings({ ...settings, sendTime: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {settings.autoSend && (
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-sm text-blue-800">
                <Clock className="w-4 h-4 inline mr-1" />
                Le rapport sera envoyé <strong>
                  {settings.sendFrequency === 'daily' && 'chaque jour'}
                  {settings.sendFrequency === 'weekly' && 'chaque lundi'}
                  {settings.sendFrequency === 'monthly' && 'le 1er de chaque mois'}
                </strong> à <strong>{settings.sendTime}</strong> à l'adresse <strong>{settings.directorEmail}</strong>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Alertes de stock */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-red-100 p-2.5 rounded-lg">
            <Globe className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Alertes de stock</h2>
            <p className="text-sm text-gray-500">Notifications quand le stock est bas</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-800">Activer les alertes</p>
              <p className="text-sm text-gray-500">Recevoir une alerte quand un produit atteint le seuil minimum</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, lowStockAlert: !settings.lowStockAlert })}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                settings.lowStockAlert ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform"
                style={{ transform: settings.lowStockAlert ? 'translateX(24px)' : 'translateX(0)', left: '2px' }}
              />
            </button>
          </div>

          {settings.lowStockAlert && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seuil d'alerte global (%)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={settings.alertThreshold}
                onChange={(e) => setSettings({ ...settings, alertThreshold: parseInt(e.target.value) })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Alerte quand le stock descend en dessous de {settings.alertThreshold}% du stock minimum défini pour chaque produit
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Aperçu de l'email */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">📧 Aperçu de l'email envoyé</h2>
        <div className="bg-gray-50 rounded-lg p-5 border border-gray-200 text-sm space-y-2">
          <p><span className="font-medium text-gray-700">À :</span> {settings.directorEmail}</p>
          <p><span className="font-medium text-gray-700">Objet :</span> Rapport Stock Quotidien - {settings.companyName} - {new Date().toLocaleDateString('fr-FR')}</p>
          <hr className="my-3" />
          <div className="text-gray-700">
            <p>Bonjour {settings.directorName},</p>
            <p className="mt-2">Veuillez trouver ci-joint le rapport quotidien du stock de <strong>{settings.companyName}</strong>.</p>
            <p className="mt-2">Le fichier Excel détaillé est en pièce jointe.</p>
            <p className="mt-4">Cordialement,<br />Système GestStock</p>
          </div>
        </div>
      </div>
    </div>
  );
}
