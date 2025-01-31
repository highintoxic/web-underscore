import PropTypes from "prop-types";
import { NavBar } from "../Components";
const BaseLayout = ({ children }) => {
	return (
		<div className='min-h-screen w-full bg-[#121619] flex flex-col'>
			<NavBar />
			<main>{children}</main>
			{/* <Footer /> */}
		</div>
	);
};

export default BaseLayout;

BaseLayout.propTypes = {
	children: PropTypes.element.isRequired,
};
