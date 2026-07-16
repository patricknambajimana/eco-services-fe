// pages/superadmin/SettingsPage.tsx
import { useState } from 'react';
import { Bell, Lock, Palette, Server, Save } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type Tab = 'profile' | 'notifications' | 'security' | 'system';

export const SettingsPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  const [notifPrefs, setNotifPrefs] = useState({
    newUsers: true,
    newBusinesses: true,
    systemAlerts: true,
    weeklyDigest: false,
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30',
  });

  const [system, setSystem] = useState({
    maintenanceMode: false,
    allowSignups: true,
  });

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: 'profile', label: 'Profile', icon: Palette },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'system', label: 'System', icon: Server },
  ];

  const handleSave = () => {
    // TODO: wire to your API layer
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Settings</h2>
        <p className="text-sm text-gray-600 mt-1">
          Manage your account, notifications, and system preferences
        </p>
      </div>

      <div className="flex gap-6">
        {/* Tab rail */}
        <div className="w-48 flex-shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? 'bg-restaurant-50 text-restaurant-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? 'text-restaurant-600' : 'text-gray-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Panel */}
        <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          {activeTab === 'profile' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-gray-900">Profile information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-restaurant-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-restaurant-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Role
                </label>
                <input
                  type="text"
                  disabled
                  value={user?.role?.replace(/_/g, ' ') || 'Super Admin'}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-500 capitalize"
                />
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-gray-900">Notification preferences</h3>
              <p className="text-sm text-gray-500 -mt-3">
                Choose what shows up in your notification bell and email
              </p>

              {[
                { key: 'newUsers', label: 'New user sign-ups', desc: 'Get notified when someone joins the platform' },
                { key: 'newBusinesses', label: 'New business registrations', desc: 'Get notified when a business is added' },
                { key: 'systemAlerts', label: 'System alerts', desc: 'Errors, downtime, and security warnings' },
                { key: 'weeklyDigest', label: 'Weekly digest', desc: 'A summary email every Monday' },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <button
                    onClick={() =>
                      setNotifPrefs({
                        ...notifPrefs,
                        [item.key]: !notifPrefs[item.key as keyof typeof notifPrefs],
                      })
                    }
                    className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                      notifPrefs[item.key as keyof typeof notifPrefs] ? 'bg-restaurant-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                        notifPrefs[item.key as keyof typeof notifPrefs] ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-gray-900">Security</h3>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Two-factor authentication</p>
                  <p className="text-xs text-gray-500">Require a code at login in addition to your password</p>
                </div>
                <button
                  onClick={() => setSecurity({ ...security, twoFactor: !security.twoFactor })}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                    security.twoFactor ? 'bg-restaurant-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      security.twoFactor ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Session timeout
                </label>
                <select
                  value={security.sessionTimeout}
                  onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-restaurant-500"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="240">4 hours</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Automatically log out after this period of inactivity
                </p>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-5">
              <h3 className="text-base font-semibold text-gray-900">System</h3>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Maintenance mode</p>
                  <p className="text-xs text-gray-500">Take the platform offline for all non-admin users</p>
                </div>
                <button
                  onClick={() => setSystem({ ...system, maintenanceMode: !system.maintenanceMode })}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                    system.maintenanceMode ? 'bg-red-500' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      system.maintenanceMode ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-gray-900">Allow new sign-ups</p>
                  <p className="text-xs text-gray-500">Let new users register on the platform</p>
                </div>
                <button
                  onClick={() => setSystem({ ...system, allowSignups: !system.allowSignups })}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                    system.allowSignups ? 'bg-restaurant-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      system.allowSignups ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* Save bar */}
          <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-end gap-3">
            {saved && <span className="text-sm text-green-600">Saved</span>}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-restaurant-600 hover:bg-restaurant-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Save className="h-4 w-4" />
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};