import React, { useState } from 'react';

export const Sidebar = () => {
  const [servicesOpen, setServicesOpen] = useState(true);
  const [invoicesOpen, setInvoicesOpen] = useState(true);

  return (
    <aside className="w-[220px] h-screen flex flex-col bg-white border-r border-gray-200 ">
      {/* User Profile Section */}
      <div className="flex flex-col items-start gap-2.5 px-4 py-3 border-b border-gray-200">
        <button className="flex items-center justify-between px-3 py-2 w-full bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
          <div className="flex items-center gap-2 ">
            <div className="w-8 h-8 flex items-center justify-center bg-purple-600 rounded-lg">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7V13L10 18L17 13V7L10 2Z" fill="white"/>
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-semibold text-gray-900">Vault</span>
              <span className="text-xs text-gray-600">Anurag Yadav</span>
            </div>
          </div>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-400">
            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-3 overflow-y-auto">
        <div className="flex flex-col gap-1">
          {/* Dashboard */}
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full text-left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
              <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Dashboard
          </button>

          {/* Nexus */}
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full text-left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
              <circle cx="5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="11" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 10C5 8.34315 6.34315 7 8 7C9.65685 7 11 8.34315 11 10V13H5V10Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
            Nexus
          </button>

          {/* Intake */}
          <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full text-left">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 5V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Intake
          </button>

          {/* Services Section */}
          <div className="flex flex-col gap-1 mt-2">
            <button 
              onClick={() => setServicesOpen(!servicesOpen)}
              className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full"
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                  <path d="M3 3H13V10L8 13L3 10V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 3L8 6L13 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Services
              </div>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                className={`text-gray-400 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
              >
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {servicesOpen && (
              <div className="flex flex-col gap-1 ml-6">
                <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full text-left">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Pre-active
                </button>

                <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full text-left">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                    <rect x="3" y="3" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  Active
                </button>

                <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full text-left">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M10 6L6 10M6 6L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Blocked
                </button>

                <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full text-left">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Closed
                </button>
              </div>
            )}
          </div>

          {/* Invoices Section */}
          <div className="flex flex-col gap-1 mt-2">
            <button 
              onClick={() => setInvoicesOpen(!invoicesOpen)}
              className="flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full"
            >
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                  <path d="M4 2H12L14 4V14H2V4L4 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M5 6H11M5 9H11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                Invoices
              </div>
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 16 16" 
                fill="none" 
                className={`text-gray-400 transition-transform ${invoicesOpen ? 'rotate-180' : ''}`}
              >
                <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {invoicesOpen && (
              <div className="flex flex-col gap-1 ml-6">
                <button className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100 rounded-md transition-colors w-full text-left">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                    <path d="M4 2H12V14H4V2Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M6 5H10M6 8H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Proforma Invoices
                </button>

                <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full text-left">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-gray-600">
                    <path d="M4 2H12V14H4V2Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 5V8M8 11H8.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  Final Invoices
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </aside>
  );
};