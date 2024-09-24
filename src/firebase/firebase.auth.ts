import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from './firebase.config';
import { setUserDb } from "./firebase.firestore";

export const auth = getAuth(app);

// Create a new user
export const createUser = async (name: string, email: string, password: string) => {
    try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        // Save user data in Firestore
        await setUserDb({ name, email, uid: user.uid });
        return user;  // Return user object for further processing
    } catch (e) {
        // Handle specific Firebase errors if needed
        console.error("Error creating user:", e);
        throw e;  // Rethrow the error for UI handling
    }
}

// Log in a user
export const LoginUser = async (email: string, password: string) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        return user;  // Return user object to use in UI or session
    } catch (e) {
        console.error("Error logging in:", e);
        throw e;  // Rethrow error for UI handling
    }
}

// Log out the current user
export const LogOutUser = async () => {
    try {
        await signOut(auth);  // No need to pass currentUser
        return true;  // Return success flag
    } catch (e) {
        console.error("Error logging out:", e);
        throw e;  // Rethrow error for UI handling
    }
}
