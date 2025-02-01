import { useState, useRef, useEffect } from "react"
import { User, Menu, X } from "lucide-react"
import { Link } from "react-router-dom"

const NavBar = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const [isOpen, setIsOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleButtonClick = () => {
    setIsMenuOpen(!isOpen)
  }

  const handleMenuMouseLeave = () => {
    setIsMenuOpen(false)
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
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <Link to="/user-profile" className="text-white font-semibold flex items-center gap-2">
              <User /> {user.username}
            </Link>
          ) : (
            <Link to="/user-profile" className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <User className="h-5 w-5 text-white hover:cursor-pointer" />
            </Link>
          )}

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

