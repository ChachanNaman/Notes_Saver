import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Home, FileText, LogOut, User } from 'lucide-react'
import { authAPI } from '../utils/api'
import { toast } from 'sonner'

const Navbar = () => {
  const navigate = useNavigate();
  const user = authAPI.getUser();
  const isAuthenticated = authAPI.isAuthenticated();

  const handleLogout = () => {
    authAPI.logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PasteHub
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <Home className="w-4 h-4" />
                  <span className="font-medium">Home</span>
                </NavLink>
                <NavLink
                  to="/pastes"
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  <FileText className="w-4 h-4" />
                  <span className="font-medium">Pastes</span>
                </NavLink>
                <div className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="font-medium">Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                >
                  <span className="font-medium">Login</span>
                </NavLink>
                <NavLink
                  to="/register"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
                >
                  <span className="font-medium">Sign Up</span>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
