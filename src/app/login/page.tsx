"use client";

import { LoginUser } from '@/firebase/firebase.auth';
import '../bootstrap.icons.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleLogin = async () => {
        setError(''); // Clear previous errors
        setLoading(true); // Set loading state

        try {
            await LoginUser(email, password);
            router.push('/home'); // Redirect to the home page upon successful login
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="main-container">
            <div className="container">
                <label htmlFor="">Enter your email: </label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    required
                />
                
                <label htmlFor="">Enter your password: </label>
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    required
                />
                
                <button onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>
                
                {error && <div className="error-message">{error}</div>}
                
                <h1>Or</h1>
                <button>
                    <i className="bi bi-google"></i> Google
                </button>
            </div>
        </div>
    );
}
