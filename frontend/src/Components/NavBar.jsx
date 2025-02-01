import { useState, useRef, useEffect } from "react";
import { User, Menu, X } from "lucide-react";
import { Link } from "react-router";

const NavBar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (menuRef.current && !menuRef.current.contains(event.target)) {
				setIsOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	const handleButtonClick = () => {
		setIsMenuOpen(!isOpen);
	};

	const handleMenuMouseLeave = () => {
		setIsMenuOpen(false);
	};

	return (
		<nav className="fixed top-0 left-0 right-0 w-full bg-[#3D52D5] border-b rounded-none backdrop-blur-lg border-white/10 shadow-lg z-50">
	<div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
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
			{/* User Icon */}
			<button
				className="p-2 hover:bg-white/10 rounded-full transition-colors"
				onClick={handleButtonClick}
				aria-haspopup="true"
				aria-expanded={isMenuOpen}
			>
				<User className="h-5 w-5 text-white hover:cursor-pointer" />
			</button>
			{/* Menu */}
			{isMenuOpen && (
				<div
					ref={menuRef}
					className="absolute right-0 mt-12 w-48 rounded-xl shadow-lg bg-[#729EA1] ring-1 ring-black ring-opacity-5 focus:outline-none"
					role="menu"
					aria-orientation="vertical"
					aria-labelledby="user-menu"
					onMouseLeave={handleMenuMouseLeave}
				>
					<div className="py-1" role="none">
						<a
							href="#"
							className="block px-4 py-2 rounded-t-2xl text-sm text-white hover:bg-white/10"
							role="menuitem"
						>
							<User className='h-5 w-5 text-white' />
						</button>
						{isMenuOpen && (
							<div
								ref={menuRef}
								className='absolute right-0 mt-42 w-48 rounded-xl shadow-lg bg-[#729EA1] ring-1 ring-black ring-opacity-5 focus:outline-none'
								role='menu'
								aria-orientation='vertical'
								aria-labelledby='user-menu'
								onMouseLeave={handleMenuMouseLeave}
							>
								<div role='none'>
									<a
										href='#'
										className='block  px-4 py-3 rounded-t-xl text-sm font-semibold text-white hover:bg-[#567f82] hover:text-white/80'
										role='menuitem'
									>
										Sign in
									</a>
									<a
										href='#'
										className='block px-4 py-3 rounded-b-xl  text-sm font-semibold text-white hover:bg-[#567f82] hover:text-white/80'
										role='menuitem'
									>
										Sign up
									</a>
								</div>
							</div>
						)}

						{/* Mobile Menu Button */}
						<button
							className='md:hidden p-2 hover:bg-white/10 rounded-full transition-colors'
							onClick={() => setIsOpen(!isOpen)}
						>
							Sign up
						</a>
					</div>
				</div>
			)}

			{/* Mobile Menu Button */}
			<button
				className="md:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
				onClick={() => setIsOpen(!isOpen)}
			>
				{isOpen ? (
					<X className="h-6 w-6 text-white" />
				) : (
					<Menu className="h-6 w-6 text-white" />
				)}
			</button>
		</div>
	</div>

	{/* Mobile Menu */}
	{isOpen && (
		<div className="md:hidden mt-2 bg-[#3D52D5] border rounded-xl border-white/10 shadow-lg">
			<div className="flex flex-col items-center space-y-4 py-4">
				<Link
					to="#"
					className="text-white hover:text-white/80 transition-colors"
				>
					Home
				</Link>
				<Link
					to="#"
					className="text-white hover:text-white/80 transition-colors"
				>
					Products
				</Link>
				<Link
					to="#"
					className="text-white hover:text-white/80 transition-colors"
				>
					Services
				</Link>
				<Link
					to="#"
					className="text-white hover:text-white/80 transition-colors"
				>
					Contact
				</Link>
			</div>
		</div>
	)}
</nav>

	);
};

export default NavBar;
