import { useState } from "react";
import { Search, User, Menu, X } from "lucide-react";
import { Link } from "react-router";

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="fixed top-0 left-0 right-0 bg-[#3D52D5] border-b rounded-xl m-3 backdrop-blur-lg border-white/10 shadow-lg z-50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Logo */}
					<Link to="/" className="text-white font-semibold text-xl">
						. /
					</Link>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						<Link to="#" className="text-white hover:text-white/80 transition-colors">
							Home
						</Link>
						<Link to="#" className="text-white hover:text-white/80 transition-colors">
							Products
						</Link>
						<Link to="#" className="text-white hover:text-white/80 transition-colors">
							Services
						</Link>
						<Link to="#" className="text-white hover:text-white/80 transition-colors">
							Contact
						</Link>
					</div>

					{/* Right Side Icons */}
					<div className="flex items-center space-x-4">
						<button className="p-2 hover:bg-white/10 rounded-full transition-colors">
							<Search className="h-5 w-5 text-white" />
						</button>
						<button className="p-2 hover:bg-white/10 rounded-full transition-colors">
							<User className="h-5 w-5 text-white" />
						</button>

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
							<Link to="#" className="text-white hover:text-white/80 transition-colors">
								Home
							</Link>
							<Link to="#" className="text-white hover:text-white/80 transition-colors">
								Products
							</Link>
							<Link to="#" className="text-white hover:text-white/80 transition-colors">
								Services
							</Link>
							<Link to="#" className="text-white hover:text-white/80 transition-colors">
								Contact
							</Link>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
};

export default NavBar;
