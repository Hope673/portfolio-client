import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import WhiteLogo from '../assets/WhiteLogo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const navLinks = [
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ]

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition ${
      isActive ? 'text-[#ebebf2]' : 'text-[#ebebf2] hover:text-blue-600 hover:p-1 transition-all duration-300'
    }`

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    navigate('/login')
  }

  return (
    <nav className="border-b border-gray-200 bg-[#324580]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-black">
          <img src={WhiteLogo} alt="Logo Image" className="h-auto w-32" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <NavLink to="/dashboard" className={linkClass}>
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-black hover:text-blue-600 transition"
              >
                Log Out
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-0.5 bg-[#ebebf2] transition ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#ebebf2] transition ${isOpen ? 'opacity-0' : ''}`}></span>
          <span className={`w-6 h-0.5 bg-[#ebebf2] transition ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden px-6 pb-6 flex flex-col gap-4 border-t border-gray-200 pt-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={linkClass}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <NavLink to="/dashboard" className={linkClass} onClick={() => setIsOpen(false)}>
                Dashboard
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-black hover:text-blue-600 transition text-left"
              >
                Log Out
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClass} onClick={() => setIsOpen(false)}>
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  )
}