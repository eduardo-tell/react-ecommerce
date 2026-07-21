import { Link } from "react-router-dom";
import Cart from "../cart/Cart";
import Search from "../search/Search";
import Favorites from "../favorites/Favorites";

export default function Header() {
    return (
        <header>
            <div className="bg-secundary flex items-center justify-center p-2">
                <span className="color-secundary text-xs">Lorem ipsum siamet</span>
            </div>
            <div className="container m-auto py-7">
                <nav className={`flex flex-nowrap justify-between items-center`} aria-label="Navegação principal">
                    <Link to="/">
                        <h1 className="text-4xl font-bold leading-8 lg:block hidden transition-all hover:text-[#29A29D]"> E-commerce </h1>
                    </Link>

                    <div className="flex items-center gap-2">
                        <Search icon="/search.svg" />
                        <Favorites icon="/star.svg" iconActive="/star-active.svg" />
                        <Cart icon="/cart-icon.svg" />
                    </div>
                </nav>
            </div>
        </header>
    )
}
