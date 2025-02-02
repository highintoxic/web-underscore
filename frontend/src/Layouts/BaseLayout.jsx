import PropTypes from "prop-types";
import { NavBar } from "../Components";
import Footer from "../Components/footer";
const BaseLayout = ({ children }) => {
	return (
		<div className='min-h-screen bg-gray-100 flex flex-col'>
			<NavBar />
			<main>{children}</main>
			<Footer /> 
		</div>
	);
};

export default BaseLayout;

BaseLayout.propTypes = {
	children: PropTypes.element.isRequired,
};
