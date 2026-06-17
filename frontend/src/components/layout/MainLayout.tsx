import React, { useState } from 'react';
import { Outlet, NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import FloatingAIAssistant from './FloatingAIAssistant';

const navItems = [
  { name: 'Dashboard', to: '/dashboard/admin', icon: 'dashboard' },
  { name: 'Patients', to: '/patients', icon: 'person' },
  { name: 'Appointments', to: '/appointments', icon: 'calendar_today' },
  { name: 'Doctors', to: '/doctors', icon: 'medical_services' },
  { name: 'Prescriptions', to: '/prescriptions/create', icon: 'prescriptions' },
  { name: 'Billing', to: '/billing', icon: 'payments' },
  { name: 'Reports', to: '/reports', icon: 'analytics' },
];

const systemItems = [
  { name: 'Notifications', to: '/notifications', icon: 'notifications' },
  { name: 'AI Assistant', to: '/ai-assistant', icon: 'smart_toy' },
  { name: 'Settings', to: '/settings', icon: 'settings' },
];

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/patients?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="layout-shell">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`layout-sidebar print:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        <div className="px-2 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-[22px]">medical_services</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-primary leading-none tracking-tight">HAPMS</h1>
            <p className="text-xs text-on-surface-variant opacity-70 mt-0.5">Clinical Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 transition-all duration-200 rounded-xl text-sm ${
                  isActive
                    ? 'bg-primary text-white font-semibold shadow-md shadow-primary/20'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}

          <div className="pt-5 pb-2 px-3 text-[10px] font-bold text-outline uppercase tracking-[0.15em]">
            System
          </div>

          {systemItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 transition-all duration-200 rounded-xl text-sm ${
                  isActive
                    ? 'bg-primary text-white font-semibold shadow-md shadow-primary/20'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`
              }
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* User Profile */}
        <div className="mt-auto pt-4 border-t border-outline-variant/30">
          <div className="p-2 bg-surface-container-low rounded-xl flex items-center gap-3">
            <img
              alt="Clinical Staff"
              className="w-9 h-9 rounded-full object-cover border-2 border-primary/20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1yPAqPevcfPPZc3D8x9q-wVWJEuupUikPQOoMDS8LHU8b-Cbhe1eZ60DoidB0xXgdxhJGodzpIV7651KRFuD4PmYTSySQ2IpUlQjRRTVhIUCczJA3TQUD4LiU3gTsbZgY3Om7EB0nrM8ZT3ZS1MNg3dqZouw0R9et1ZHrl-norWSNnsns_jIvrD6A_lVXD3n4IYmhppmgNfbvII5JYcKAHwep2mNW8rYc6SWX9OLHyKIzb1XFvh4kGo9U2lI6WxF6rGgHs_9KCKKx"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-on-surface truncate">Dr. Julian Vance</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Clinical Admin</p>
            </div>
            <Link
              to="/login"
              className="p-1.5 text-on-surface-variant hover:text-error hover:bg-error/5 rounded-lg transition-all"
              title="Sign out"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content column */}
      <div className="layout-main">
        {/* Header */}
        <header className="layout-header print:hidden">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 -ml-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-surface-container border-0 rounded-xl text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="Search patients, MRN, phone..."
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/notifications" className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-xl transition-colors relative">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full ring-2 ring-white"></span>
            </Link>
            <button
              className="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:bg-surface-container rounded-xl transition-colors"
              onClick={() => document.documentElement.classList.toggle('dark')}
            >
              <span className="material-symbols-outlined text-[20px]">contrast</span>
            </button>
            <div className="h-6 w-px bg-outline-variant mx-1 hidden sm:block"></div>
            <Link
              to="/patients"
              state={{ openRegisterModal: true }}
              className="hidden sm:flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-primary/20 active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              Register Patient
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="layout-content">
          <Outlet />
        </main>
      </div>
      
      {/* Global AI Assistant */}
      <FloatingAIAssistant />
    </div>
  );
}
