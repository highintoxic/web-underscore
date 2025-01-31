import { Search, User } from "lucide-react";
import { Link } from "react-router";

const NavBar = () => {
	return (
		<nav className='fixed top-0 left-0 right-0  bg-[#3D52D5] border-b rounded-xl m-3 backdrop-blur-lg border-white/10 shadow-lg z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center space-x-3'>
						{/* Logo */}
						<Link to='/' className='text-white font-semibold text-xl'>
							. /
						</Link>
					</div>

					{/* Navigation Links */}
					<div className='hidden md:flex items-center space-x-8'>
						<Link
                            to='#'
							className='text-white hover:text-white/80 transition-colors'
						>
							Home
						</Link>
						<Link
							to='#'
							className='text-white hover:text-white/80 transition-colors'
						>
							Products
						</Link>
						<Link
							to='#'
							className='text-white hover:text-white/80 transition-colors'
						>
							Services
						</Link>
						<Link
							to='#'
							className='text-white hover:text-white/80 transition-colors'
						>
							Contact
						</Link>
					</div>

					{/* Right Side Icons */}
					<div className='flex items-center space-x-4'>
						<button className='p-2 hover:bg-white/10 rounded-full transition-colors'>
							<Search className='h-5 w-5 text-white' />
						</button>
						<button className='p-2 hover:bg-white/10 rounded-full transition-colors'>
							<User className='h-5 w-5 text-white' />
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
