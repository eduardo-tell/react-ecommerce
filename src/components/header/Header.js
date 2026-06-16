import React from "react";
import { Link } from "react-router-dom";
// import Favorites from "../favorites/Favorites";
import Cart from "../cart/Cart";

export default function Header() {
    return (
        <div className="container m-auto">
            <nav className="flex flex-nowrap justify-between align-middle">
                <ul className="flex gap-2 flex-nowrap justify-center align-middle">
                    <li className="flex">
                        <button className="rounded-lg"> <Link to="/" className="border-b-2 border-black p-2">Início</Link> </button>
                    </li>
                    {/* <li>
                        <button className="rounded-lg p-2"> <Link to="/repositorio" className="dark:text-white">Detalhes</Link> </button>
                    </li> */}
                </ul>
                <h1 className="text-4xl font-bold leading-8"> E-commerce </h1>
                <div className="flex p-2">
                    <Cart icon='./cart-icon.svg' />
                </div>
            </nav>
        </div>
    )
}

