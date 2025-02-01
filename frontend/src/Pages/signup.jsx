import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import BaseLayout from "../Layouts/BaseLayout";

export default function SignUp() {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [coordinates, setCoordinates] = useState(null);
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        location: "",
        userType: "user",
        registrationNumber: "",
        registrationYear: "",
        councilName: ""
    });

    // Generate years for dropdown (last 50 years)
    const years = Array.from({ length: 50 }, (_, i) => new Date().getFullYear() - i);

    useEffect(() => {
        // Get user's location when component mounts
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        // Use reverse geocoding to get location name
                        const response = await fetch(
                            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_OPENCAGE_API_KEY`
                        );
                        const data = await response.json();
                        const locationName = data.results[0]?.formatted || `${latitude}, ${longitude}`;
                        
                        setFormData(prev => ({
                            ...prev,
                            location: locationName
                        }));
                        setCoordinates({ latitude, longitude });
                    } catch (error) {
                        setError("Failed to get location name. Please try again.");
                    }
                },
                (error) => {
                    setError("Please enable location access to continue");
                }
            );
        } else {
            setError("Geolocation is not supported by your browser");
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        
        try {
            const response = await api.post("/auth/signup", formData);
            const { token, user } = response.data;
            
            // Store token and user data
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            
            // Navigate to home page
            navigate("/");
        } catch (error) {
            setError(
                error.response?.data?.message || 
                "There was an error during sign up. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <BaseLayout>
            <div className='max-w-lg mx-auto px-4 py-8 mt-30'>
                <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
                    <h1 className='text-3xl font-bold text-center mb-6'>Sign Up</h1>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='username'>
                            Username
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='username'
                            type='text'
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='email'
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                            Password
                        </label>
                        <input
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='password'
                            type='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2'>
                            Location
                        </label>
                        <div className='flex items-center'>
                            <input
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                type='text'
                                value={formData.location}
                                readOnly
                                placeholder="Fetching location..."
                            />
                            {coordinates && (
                                <span className='ml-2 text-green-500'>✓</span>
                            )}
                        </div>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='userType'>
                            User Type
                        </label>
                        <select
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                            id='userType'
                            name='userType'
                            value={formData.userType}
                            onChange={handleChange}
                            required
                        >
                            <option value="user">User</option>
                            <option value="doctor">Doctor</option>
                        </select>
                    </div>

                    {formData.userType === 'doctor' && (
                        <>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Registration Number
                                </label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    type='text'
                                    name='registrationNumber'
                                    value={formData.registrationNumber}
                                    onChange={handleChange}
                                    required={formData.userType === 'doctor'}
                                />
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Registration Year
                                </label>
                                <select
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    name='registrationYear'
                                    value={formData.registrationYear}
                                    onChange={handleChange}
                                    required={formData.userType === 'doctor'}
                                >
                                    <option value="">Select Year</option>
                                    {years.map(year => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2'>
                                    Council Name
                                </label>
                                <input
                                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    type='text'
                                    name='councilName'
                                    value={formData.councilName}
                                    onChange={handleChange}
                                    required={formData.userType === 'doctor'}
                                />
                            </div>
                        </>
                    )}
                    
                    {error && (
                        <div className="mb-4 text-red-500 text-center">
                            {error}
                        </div>
                    )}
                    
                    <div className='flex items-center justify-between'>
                        <button
                            className='bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50'
                            type='submit'
                            disabled={isLoading}
                        >
                            {isLoading ? "Signing up..." : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </BaseLayout>
    );
}
