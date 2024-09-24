"use client";

import { createUser } from "@/firebase/firebase.auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const handleSignUp = async () => {
        setError(''); // Clear previous errors
        setLoading(true); // Set loading state

        // Basic validation
        if (!name || !email || !password) {
            setError("All fields must be filled out");
            setLoading(false);
            return;
        }

        try {
            await createUser(name, email, password);
            // Redirect to home page or another page upon successful signup
            router.push('/home');
        } catch (err) {
            console.error("Sign up failed:", err);
            setError("Failed to create account. Please try again.");
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="main-container">
            <div className="container">
                <label htmlFor="">Enter your name:</label>
                <input 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    type="text" 
                    required 
                />
                
                <label htmlFor="">Enter your email:</label>
                <input 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    type="email" 
                    required 
                />
                
                <label htmlFor="">Enter your password:</label>
                <input 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    required 
                />
                
                <button onClick={handleSignUp} disabled={loading}>
                    {loading ? "Creating account..." : "Create account"}
                </button>
                
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
}
