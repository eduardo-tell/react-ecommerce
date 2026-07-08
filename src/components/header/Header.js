import React from "react";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import Search from "../search/Search";
import './styles.scss';

export default function Header() {
    const [menuOpen] = React.useState(false);

    return (
        <>
        <div className="bg-[#A3F7BF] flex items-center justify-center p-2"> <span className="text-[#000] text-xs">Lorem ipsum siamet</span> </div>
        <div className="container m-auto">
            <nav className={`flex flex-nowrap justify-between items-center ${menuOpen ? "sub-menu-open" : ""}`}>
                <ul className="lg:flex hidden lg:relative fixed gap-2 flex-nowrap justify-center items-center">
                    <li className="flex">
                        <button className="rounded-lg"> <Link to="/" className="border-b-2 border-black p-2">Início</Link> </button>
                    </li>
                </ul>
                <h1 className="text-4xl font-bold leading-8 lg:block hidden"> E-commerce </h1>
                <div className="flex p-2">
                    <Search icon='./search.svg' />
                    <Cart icon='./cart-icon.svg' />
                </div>
            </nav>
        </div>
        </>
    )
}

