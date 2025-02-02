import { useState, useRef, useEffect } from "react"
import { User, Menu, X } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

const NavBar = () => {
  const [user, setUser] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const userMenuRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

    // Listen for login events
    window.addEventListener("userLoggedIn", handleUserLogin)
    return () => {
      window.removeEventListener("userLoggedIn", handleUserLogin)
    }
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleUserLogin = (event) => {
    setUser(JSON.parse(event.detail))
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleSignOut = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    setIsUserMenuOpen(false)
    navigate("/")
  }

  return (
    <nav className="fixed top-0 left-0 right-0 w-full bg-[#3D52D5] border-b rounded-none backdrop-blur-lg border-white/10 shadow-lg z-50">
      <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="text-white font-semibold text-xl">
          . /
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-white/80 transition-colors">
            Home
          </Link>
          <Link to="/doctor" className="text-white hover:text-white/80 transition-colors">
            TravelDoc
          </Link>
          <Link to="/healthcalculator" className="text-white hover:text-white/80 transition-colors">
            Calculator
          </Link>
          <Link to="/awareness" className="text-white hover:text-white/80 transition-colors">
            Awareness
          </Link>
          <Link to="/communityforum" className="text-white hover:text-white/80 transition-colors">
            Community
          </Link>
          <Link to="/dashboard" className="text-white hover:text-white/80 transition-colors">
            Dashboard
          </Link>
          <Link to="/contact" className="text-white hover:text-white/80 transition-colors">
            Contact Us
          </Link>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={toggleUserMenu}
              className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center"
            >
              <User className="h-5 w-5 text-white hover:cursor-pointer" />
              {user && <span className="ml-2 text-white text-sm">{user.username}</span>}
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                {user ? (
                  <>
                    <button
                      onClick={() => {
                        navigate("/dashboard")
                        setIsUserMenuOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/signup"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                    <Link
                      to="/signin"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-[#3D52D5] border rounded-xl border-white/10 shadow-lg">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link to="/" className="text-white hover:text-white/80 transition-colors">
              Home
            </Link>
            <Link to="/doctor" className="text-white hover:text-white/80 transition-colors">
              TravelDoc
            </Link>
            <Link to="/healthcalculator" className="text-white hover:text-white/80 transition-colors">
              Calculator
            </Link>
            <Link to="/awareness" className="text-white hover:text-white/80 transition-colors">
              Awareness
            </Link>
            <Link to="/communityforum" className="text-white hover:text-white/80 transition-colors">
              Community
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default NavBar

