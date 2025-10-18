import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, FileText } from 'lucide-react'

const Navbar = () => {
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
          
          <div className="flex gap-2">
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
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
