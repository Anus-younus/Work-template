import { addDoc, collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { app } from './firebase.config'

export const db = getFirestore(app)

type UserType = {
    email: string,
    name: string,
    uid: string
}

type ProductType = {
    title: string,
    description: string,
    price: string,
    image: string,
    uid: string | undefined
} 

export const setUserDb = async (user: UserType) => {
    try {
        const docRef = doc(db, "users", user.uid)
        await setDoc(docRef, user)
    } catch (e) {
        console.error(e);
    }
}

export const createProduct = async (product: ProductType) => {
    try {
        console.log("Product submiting...");
        const collectionRef = collection(db, "products")
        const res = await addDoc(collectionRef, product)
        console.log(res);
        console.log("Product submiting...");
        
    } catch (e) {
        console.error(e);
    }
}