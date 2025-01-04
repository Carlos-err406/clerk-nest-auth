import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	useAuth,
	UserButton,
} from '@clerk/clerk-react';
import { useState } from 'react';
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:4000',
});

export default function App() {
	const { getToken } = useAuth();
	const [loading, setLoading] = useState(false);
	const handleExternalApi = async () => {
		setLoading(true);
		const token = await getToken();
		try {
			const response = await axiosInstance.get('/auth/me', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			console.log(response);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className='w-screen h-screen flex flex-col items-center justify-center [&_button]:bg-blue-500 [&_button]:text-white [&_button]:px-4 [&_button]:py-2 [&_button]:rounded-md'>
			<SignedOut>
				<div className='flex flex-col gap-4'>
					<SignInButton />
					<SignUpButton />
				</div>
			</SignedOut>
			<SignedIn>
				<div className='flex flex-col gap-4 items-center justify-center'>
					<button onClick={handleExternalApi}>
						{loading ? 'Loading...' : 'Ping external API'}
					</button>
					<UserButton />
				</div>
			</SignedIn>
		</div>
	);
}
