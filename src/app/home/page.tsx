"use client"

import { db } from "@/firebase/firebase.firestore"
import { collection, onSnapshot, query } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"

// const prouducts = [
//   {
//     id:"1",
//     title: "Chiken Biryani",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, repudiandae dolorum. Enim perspiciatis sint dolore magni earum laborum placeat est!",
//     price: "20$",
//     image: "",
//   },
//   {
//     id:"2",
//     title: "Chiken Qourma",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, repudiandae dolorum. Enim perspiciatis sint dolore magni earum laborum placeat est!",
//     price: "20$",
//     image: "",
//   },
//   {
//     id:"3",
//     title: "Chiken Karai",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, repudiandae dolorum. Enim perspiciatis sint dolore magni earum laborum placeat est!",
//     price: "20$",
//     image: "",
//   },
//   {
//     id:"4",
//     title: "Chiken Teka",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, repudiandae dolorum. Enim perspiciatis sint dolore magni earum laborum placeat est!",
//     price: "20$",
//     image: "",
//   },
//   {
//     id:"5",
//     title: "Chiken Kabab",
//     description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, repudiandae dolorum. Enim perspiciatis sint dolore magni earum laborum placeat est!",
//     price: "20$",
//     image: "",
//   },
// ]

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
};

export default function Home() {
  const [products, setProuducts] = useState<Product[]>([])
  useEffect(() => {
    const cloneProducts = [...products]
    const collectioRef = collection(db, "products")
    const q = query(collectioRef)
    onSnapshot(q, (producct) => {
      producct.forEach((doc) => {
        const data = doc.data() as Product
        data.id = doc.id
        cloneProducts.push(data)
        setProuducts([...cloneProducts])
      })
    })
    console.log(products);

  }, [products])
  return (
    <>
      <div className="row">
        {
          products.length > 0 ?
            products.map((product) => (
              <Link href={`/${product?.id}`} key={product?.id} className="col">
                <div>
                  <img style={{width: "18rem", height: "13em"}} src={product?.image} alt="" />
                </div>
                <h3>{product?.title}</h3>
                <h4>cost: {product?.price}$</h4>
                <i className="bi bi-cart"></i>
              </Link>
            )) : <div></div>
        }
      </div>
    </>
  )
}