import React from "react";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import Search from "../search/Search";

export default function Header() {
    return (
        <div className="container m-auto">
            <nav className="flex flex-nowrap justify-between align-middle">
                <ul className="flex gap-2 flex-nowrap justify-center align-middle">
                    <li className="flex">
                        <button className="rounded-lg"> <Link to="/" className="border-b-2 border-black p-2">Início</Link> </button>
                    </li>
                </ul>
                <h1 className="text-4xl font-bold leading-8"> E-commerce </h1>
                <div className="flex p-2">
                    <Search icon='./search.svg' />
                    <Cart icon='./cart-icon.svg' />
                </div>
            </nav>
        </div>
    )
}

