import { BaseLayout } from "../Layouts";

export const NotFound = () => {
	return (
		<BaseLayout>
			<div className='min-h-screen flex flex-col items-center justify-center'>
				<section className='container mx-auto p-5'>
					<h1 className='text-7xl text-[#729EA1] font-bold '>Page Not Found</h1>
				</section>
			</div>
		</BaseLayout>
	);
}

export default NotFound;