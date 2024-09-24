"use client";

import { auth } from "@/firebase/firebase.auth";
import { createProduct } from "@/firebase/firebase.firestore";
import { storage } from "@/firebase/firebase.storage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

export default function CreateProduct() {
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [error, setError] = useState<string>('');
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        // Check if the user is authenticated
        const unsubscribe = auth.onAuthStateChanged(user => {
            setIsAuthenticated(!!user);
        });

        return () => unsubscribe();
    }, []);

    const handleProduct = async () => {
        // Check for empty fields
        if (!image || !title || !desc || !price) {
            setError("All fields must be filled out");
            return;
        }

        // Check if the user is authenticated
        if (!isAuthenticated) {
            setError("You must be logged in to create a product");
            return;
        }

        try {
            console.log("Product submitting...");
            const imageRef = ref(storage, `products/images/${image.name}`);
            await uploadBytes(imageRef, image);
            const url = await getDownloadURL(imageRef);
            console.log(url);

            await createProduct({
                title,
                description: desc,
                price,
                image: url,
                uid: auth.currentUser?.uid
            });

            console.log("Product submitted");
            // Reset form fields
            setTitle('');
            setDesc('');
            setPrice('');
            setImage(null);
            setError(''); // Clear any previous errors
        } catch (err) {
            console.error("Error submitting product:", err);
            setError("Failed to submit product. Please try again.");
        }
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file);
    };

    return (
        <div className="main-container">
            <div className="container">
                <label>Enter your product title: </label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                
                <label>Enter your product description: </label>
                <textarea rows={7} cols={7} value={desc} onChange={(e) => setDesc(e.target.value)}></textarea>
                
                <label>Enter your product price: </label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                
                <label>Upload your product image: </label>
                <input type="file" onChange={handleImage} />
                
                <button onClick={handleProduct}>Add Product</button>
                
                {/* Error message with animation */}
                {error && (
                    <div className="error-message animate-error">{error}</div>
                )}
            </div>
        </div>
    );
}
