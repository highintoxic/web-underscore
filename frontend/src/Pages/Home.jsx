import { BaseLayout } from "../Layouts";

const Home = () => {
	return (
		<BaseLayout>
			<div className='min-h-screen flex flex-col items-center justify-center'>
				<section className='container mx-auto p-5'>
					<h1 className='text-7xl text-[#729EA1] font-bold '>Home</h1>
				</section>
			</div>
		</BaseLayout>
	);
};

export default Home;
