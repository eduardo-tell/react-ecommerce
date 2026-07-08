import { useState } from "react";
import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import Search from "../search/Search";
import Favorites from "../favorites/Favorites";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header>
            <div className="bg-[#A3F7BF] flex items-center justify-center p-2">
                <span className="text-[#000] text-xs">Lorem ipsum siamet</span>
            </div>
            <div className="container m-auto">
                <nav className={`flex flex-nowrap justify-between items-center ${menuOpen ? "sub-menu-open" : ""}`} aria-label="Navegação principal">
                    <button
                        type="button"
                        className="lg:hidden p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
                        aria-expanded={menuOpen}
                        aria-controls="main-menu"
                        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
                        onClick={() => setMenuOpen(open => !open)}
                    >
                        <img src="/menu.svg" alt="" width="24" height="24" />
                    </button>

                    <ul id="main-menu" className="lg:flex hidden lg:relative gap-2 flex-nowrap justify-center items-center">
                        <li className="flex">
                            <Link to="/" className="border-b-2 border-black p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 rounded-lg" onClick={() => setMenuOpen(false)}>Início</Link>
                        </li>
                    </ul>

                    <h1 className="text-4xl font-bold leading-8 lg:block hidden"> E-commerce </h1>

                    <div className="flex p-2 items-center gap-2">
                        <Search icon="/search.svg" />
                        <Favorites icon="/star.svg" />
                        <Cart icon="/cart-icon.svg" />
                    </div>
                </nav>
            </div>
        </header>
    )
}
