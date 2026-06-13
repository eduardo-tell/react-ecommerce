import React from "react";
import { Link } from "react-router-dom";
import Favorites from "../favorites/Favorites";
import Cart from "../cart/Cart";

export default function Header() {
    // function toggleDarkTheme() {
    //     document.documentElement.classList.toggle("dark")
    //     document.querySelectorAll(".dark:").classList.remove()
    // }

    return (
        <div className="p-2 bg-slate-200 dark:bg-slate-900">
            <div className="container m-auto flex flex-nowrap justify-center">
                <nav className="">
                    <ul className="flex">
                        <li>
                            <button className="rounded-lg p-2"> <Link to="/" className="dark:text-white">Início</Link> </button>
                        </li>
                        <li>
                            <button className="rounded-lg p-2"> <Link to="/repositorio" className="dark:text-white">Detalhes</Link> </button>
                        </li>
                    </ul>
                </nav>

                <div className="flex">
                    <Cart />
                    <Favorites />
                </div>
            </div>
        </div>
    )
}

