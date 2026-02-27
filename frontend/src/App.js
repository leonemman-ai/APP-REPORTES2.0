import React, { useState, useEffect } from 'react';
import '@/App.css';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FormularioOrden } from '@/components/orden/FormularioOrden';
import { ConfiguracionArchivos } from '@/components/orden/ConfiguracionArchivos';
import { ListaDocumentos } from '@/components/orden/ListaDocumentos';
import { useAfiliaciones } from '@/hooks/useAfiliaciones';
import { useTroubleTickets } from '@/hooks/useTroubleTickets';
import { FileText, Settings, Files, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import api from '@/services/api';

function Navigation() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { path: '/', icon: FileText, label: 'Nueva Orden' },
    { path: '/documentos', icon: Files, label: 'Documentos' },
    { path: '/configuracion', icon: Settings, label: 'Configuración' }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">
              Sistema de Órdenes
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center px-4 py-3 rounded-md text-sm font-medium mb-1 ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}

function HomePage() {
  const { afiliaciones, loading: loadingAfiliaciones, refetch: refetchAfiliaciones } = useAfiliaciones();
  const { troubleTickets, loading: loadingTT, refetch: refetchTT } = useTroubleTickets();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Afiliaciones Cargadas</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loadingAfiliaciones ? '...' : afiliaciones.length}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Trouble Tickets</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {loadingTT ? '...' : troubleTickets.length}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                <Files className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Form */}
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900" data-testid="page-title">
            Orden de Incidente y Requerimiento del Servicio
          </h1>
          <p className="text-gray-600 mt-2">
            Complete el formulario para generar un nuevo documento de orden
          </p>
        </div>
        <FormularioOrden />
      </div>
    </div>
  );
}

function DocumentosPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900" data-testid="page-title">
          Documentos Generados
        </h1>
        <p className="text-gray-600 mt-2">
          Historial de documentos generados
        </p>
      </div>
      <ListaDocumentos />
    </div>
  );
}

function ConfiguracionPage() {
  const { refetch: refetchAfiliaciones } = useAfiliaciones();
  const { refetch: refetchTT } = useTroubleTickets();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900" data-testid="page-title">
          Configuración
        </h1>
        <p className="text-gray-600 mt-2">
          Cargue los archivos de afiliaciones y trouble tickets
        </p>
      </div>
      <ConfiguracionArchivos 
        onAfiliacionesUploaded={refetchAfiliaciones}
        onTTUploaded={refetchTT}
      />
    </div>
  );
}

function App() {
  return (
    <div className="App min-h-screen bg-gray-50">
      <BrowserRouter>
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/documentos" element={<DocumentosPage />} />
            <Route path="/configuracion" element={<ConfiguracionPage />} />
          </Routes>
        </main>
        <footer className="bg-white border-t border-gray-200 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-center text-gray-500 text-sm">
              © {new Date().getFullYear()} Sistema de Órdenes de Incidente y Requerimiento - Grupo Desarrollador Caseoli
            </p>
          </div>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
