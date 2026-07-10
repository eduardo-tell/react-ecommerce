import { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import Search from "../search/Search";
import Favorites from "../favorites/Favorites";

export default function Header() {
    return (
        <header>
            <div className="bg-[#A3F7BF] flex items-center justify-center p-2">
                <span className="text-[#000] text-xs">Lorem ipsum siamet</span>
            </div>
            <div className="container m-auto">
                <nav className={`flex flex-nowrap justify-between items-center`} aria-label="Navegação principal">
                    <h1 className="text-4xl font-bold leading-8 lg:block hidden"> E-commerce </h1>

                    <div className="flex p-2 items-center gap-2">
                        <Search icon="/search.svg" />
                        <Favorites icon="/star.svg" iconActive="/star-active.svg" />
                        <Cart icon="/cart-icon.svg" />
                    </div>
                </nav>
            </div>
        </header>
    )
}
