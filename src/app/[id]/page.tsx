'use client'

import { useAuthContext } from "@/context/authContext";
import { db } from "@/firebase/firebase.firestore";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

// Define a type for the route parameters
type AuthProps = {
  params: { id: string };
};

// Define types for Product and User
interface Product {
  image: string;
  title: string;
  description: string;
  price: string;
}

interface User {
  name: string;
}

export default function Auth({ params: { id } }: AuthProps) {
  const [product, setProduct] = useState<Product | null>(null); // Use Product type or null
  const [user, setUser] = useState<User | null>(null); // Use User type or null

  useEffect(() => {
    fetchProduct();
    fetchUser();
  }, []);

  // Fetch product details from Firestore
  const fetchProduct = async () => {
    try {
      const docRef = doc(db, "products", id);
      const productSnap = await getDoc(docRef);
      if (productSnap.exists()) {
        setProduct(productSnap.data() as Product); // Cast to Product type
      } else {
        console.log("No such product!");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Fetch user details from Firestore
  const fetchUser = async () => {
    try {
      const docRef = doc(db, "users", id);
      const userSnap = await getDoc(docRef);
      if (userSnap.exists()) {
        setUser(userSnap.data() as User); // Cast to User type
      } else {
        console.log("No such user!");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <>
      {product ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            width: "70%",
            height: "35em",
            margin: "1em 12em",
            borderRadius: "10px",
          }}
        >
          <img style={{ width: "86em", height: "20em" }} src={product.image} alt={product.title} />
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <h3>Cost: {product.price}</h3>
          <button
            style={{
              padding: "15px",
              backgroundColor: "orange",
              border: "none",
              color: "#fff",
              fontSize: "20px",
              cursor: "pointer",
            }}
          >
            Order Now
          </button>
        </div>
      ) : null}

      {user ? (
        <div>
          <h1>Welcome {user.name}</h1>
        </div>
      ) : null}
    </>
  );
}
