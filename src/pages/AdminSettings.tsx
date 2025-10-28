import React, { useState } from 'react';
import { SaveIcon, MoonIcon, SunIcon, BellIcon, GlobeIcon } from 'lucide-react';
const AdminSettings: React.FC = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: {
      lowStock: true,
      expiringSoon: true,
      newOrders: true,
      systemUpdates: false
    },
    language: 'en',
    backupFrequency: 'daily',
    currency: 'INR'
  });
  const handleThemeChange = (theme: string) => {
    setSettings({
      ...settings,
      theme
    });
  };
  const handleNotificationChange = (key: string) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key as keyof typeof settings.notifications]
      }
    });
  };
  const handleSettingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save the settings to the backend
    alert('Settings saved successfully!');
  };
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">System Settings</h1>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSaveSettings}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Appearance Settings */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Appearance</h2>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Theme
                </label>
                <div className="flex space-x-4">
                  <button type="button" onClick={() => handleThemeChange('light')} className={`flex items-center px-4 py-2 rounded-lg border ${settings.theme === 'light' ? 'bg-yellow-500 text-black border-yellow-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                    <SunIcon className="h-5 w-5 mr-2" />
                    Light
                  </button>
                  <button type="button" onClick={() => handleThemeChange('dark')} className={`flex items-center px-4 py-2 rounded-lg border ${settings.theme === 'dark' ? 'bg-yellow-500 text-black border-yellow-600' : 'bg-white text-gray-700 border-gray-300'}`}>
                    <MoonIcon className="h-5 w-5 mr-2" />
                    Dark
                  </button>
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Language
                </label>
                <select name="language" value={settings.language} onChange={handleSettingChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option value="en">English</option>
                  <option value="si">Sinhala</option>
                  <option value="ta">Tamil</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Currency
                </label>
                <select name="currency" value={settings.currency} onChange={handleSettingChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option value="LKR">Sri Lankan Rupee (Rs)</option>
                  <option value="INR">Indian Rupee (₹)</option>
                  <option value="USD">US Dollar ($)</option>
                </select>
              </div>
            </div>
            {/* Notifications Settings */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Notifications</h2>
              <div className="space-y-3 mb-6">
                <label className="flex items-center">
                  <input type="checkbox" checked={settings.notifications.lowStock} onChange={() => handleNotificationChange('lowStock')} className="form-checkbox h-5 w-5 text-yellow-500" />
                  <span className="ml-2 text-gray-700">Low stock alerts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={settings.notifications.expiringSoon} onChange={() => handleNotificationChange('expiringSoon')} className="form-checkbox h-5 w-5 text-yellow-500" />
                  <span className="ml-2 text-gray-700">
                    Expiring medicine alerts
                  </span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={settings.notifications.newOrders} onChange={() => handleNotificationChange('newOrders')} className="form-checkbox h-5 w-5 text-yellow-500" />
                  <span className="ml-2 text-gray-700">
                    New order notifications
                  </span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" checked={settings.notifications.systemUpdates} onChange={() => handleNotificationChange('systemUpdates')} className="form-checkbox h-5 w-5 text-yellow-500" />
                  <span className="ml-2 text-gray-700">
                    System update notifications
                  </span>
                </label>
              </div>
              <h2 className="text-lg font-semibold mb-4">Backup & Security</h2>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Automatic Backup Frequency
                </label>
                <select name="backupFrequency" value={settings.backupFrequency} onChange={handleSettingChange} className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500">
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="never">Never</option>
                </select>
              </div>
              <div>
                <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                  Backup Now
                </button>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-6 flex justify-end">
            <button type="submit" className="bg-yellow-500 text-black px-6 py-2 rounded-lg flex items-center">
              <SaveIcon className="h-5 w-5 mr-2" /> Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default AdminSettings;