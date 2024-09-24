"use client"
import Link from 'next/link'
import '../app/globals.css'
import { useAuthContext } from '@/context/authContext'
import { useEffect, useRef } from 'react'
import { auth, LogOutUser } from '@/firebase/firebase.auth'

export default function Navbar() {
    const {isAuthenticated} = useAuthContext()!
    const ref = useRef<(HTMLDivElement | null)>(null)

    useEffect(() => {
        console.log(isAuthenticated);
        
    }, [])

    const handleChange = () => {
        if (ref.current) {
            ref.current.style.right = "0";
        }
    }

    const handleChangeLetf = () => {
        if (ref.current) {
            ref.current.style.right = "-30em";
        }
    }
    return (
        <>
            <nav className="navbar">
                <div className='navbar-brand'>
                    <h1>Restaurant</h1>
                    <ul>
                        <li>
                            <Link style={{ color: "#fff" }} href={'/home'}>Home</Link>
                        </li>
                        <li>
                            <Link style={{ color: "#fff" }} href={'/about'}>About</Link>
                        </li>
                    </ul>
                </div>
                {
                    isAuthenticated ?
                    <i onClick={handleChange} style={{cursor: "pointer", marginRight: "30px", color: "#fff", fontSize: "30px"}} className="bi bi-person-circle"></i>:
                        <div className="buttons">
                            <button><Link style={{ color: "#fff" }} href={'/login'}>Login</Link></button>
                            <button><Link style={{ color: "#fff" }} href={'/signup'}>Sign up</Link></button>
                        </div>
                 }
            </nav>
            <div className='div' ref={ref} style={{transition: "right .4s", height: "40em", width: "30%", backgroundColor: "#ff4f", position: 'absolute', right: "-30em", zIndex: '100', top: '0' }}>
            <i onClick={handleChangeLetf} style={{cursor: 'pointer', fontSize: "25px", margin: "30px"}} className="bi bi-arrow-right"></i>
            <ul style={{padding: '20px', display: "flex", flexDirection: "column", gap: "20px"}}>
            <Link style={{color: "#000"}} href={`/${auth.currentUser?.uid}`}><li style={{padding: "10px", border: "1px solid black", display: "flex", gap: "20px", cursor: "pointer"}}> profile <i style={{fontSize: "18px"}} className="bi bi-person-circle"></i></li></Link>
            <Link style={{color: "#000"}} href={'/createprouduct'}><li style={{padding: "10px", border: "1px solid black", display: "flex", gap: "20px", cursor: "pointer"}}> sell <i style={{fontSize: "18px"}} className="bi bi-plus"></i></li></Link>
               <li style={{padding: "10px", border: "1px solid black", display: "flex", gap: "20px", cursor: "pointer"}}>Settings <i className="bi bi-gear"></i></li>
               <li style={{padding: "10px", border: "1px solid black", display: "flex", gap: "20px", cursor: "pointer"}}>Orders <i className="bi bi-bell"></i></li>
               <li style={{padding: "10px", border: "1px solid black", display: "flex", gap: "20px", cursor: "pointer"}}>Cart <i className="bi bi-cart"></i></li>
               <li onClick={LogOutUser} style={{padding: "10px", border: "1px solid black", display: "flex", gap: "20px", cursor: "pointer"}}>Logout <i className="bi bi-cart"></i></li>
            </ul>
            </div>
        </>
    )
}