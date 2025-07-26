import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Home, Plus, History } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">MedSync</h1>
              <span className="text-sm text-muted-foreground px-2 py-1 bg-muted rounded-md">
                Healthcare Referral System
              </span>
            </div>
            
            <nav className="flex space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/') 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Home className="h-4 w-4 inline mr-2" />
                Dashboard
              </Link>
              <Link
                to="/referral/new"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/referral/new') 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Plus className="h-4 w-4 inline mr-2" />
                New Referral
              </Link>
              <Link
                to="/history"
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/history') 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <History className="h-4 w-4 inline mr-2" />
                History
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;