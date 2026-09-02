import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCartProduct } from "../../features/cart/cart.js";
import { selectIsProductInCart } from "../../features/cart/selectors.js";
import { toggleFavorite } from "../../features/favorites/favorites.js";
import { selectIsProductFavorite } from "../../features/favorites/selectors.js";
import { ButtonFavorite, ButtonCart, ContentBody, CardProductImage, CardProductContent } from "./styles.tsx";

export default function CardProduct({ product }) {
    const dispatch = useDispatch();
    const isInCart = useSelector(state => selectIsProductInCart(state, product.id));
    const isFavorite = useSelector(state => selectIsProductFavorite(state, product.id));

    const cartHandler = () => {
        dispatch(toggleCartProduct(product));
    }

    const favoriteHandler = () => {
        dispatch(toggleFavorite(product));
    }

    return (
        <ContentBody as="article" className={product.className + ` group`}>
            <CardProductImage>
                <Link to={`/produto/${product.id}`} aria-label={`Ver detalhes de ${product.title}`}>
                    <picture>
                        <img src={product.thumbnail} alt={product.title} />
                    </picture>
                </Link>
                <button className="bg-secundary hover:bg-primary text-black py-2 mx-3 mb-3 w-[calc(100%-1.5rem)] rounded-md absolute transition-all group-hover:bottom-0 -bottom-20 duration-200">
                    Comprar agora
                </button>
            </CardProductImage>
            <CardProductContent className="card-product__content w-full text-center">
                <h4>
                    <Link to={`/produto/${product.id}`} className="font-bold hover:underline focus-visible:underline line-clamp-[2]">
                        {product.title}
                    </Link>
                </h4>

                <div>
                    <p className="card-product__value font-bold text-primary">
                        R${product.price}
                    </p>
                </div>
            </CardProductContent>

            <div className="absolute justify-end top-0 right-0 flex flex-col gap-2 p-2 card-product__actions">
                <ButtonCart
                    className={`ease-linear duration-200 flex-auto p-2 bg-white rounded-md ${isInCart ? "active" : ""}`}
                    onClick={cartHandler}
                    aria-pressed={isInCart}
                    aria-label={isInCart ? `Remover ${product.title} do carrinho` : `Adicionar ${product.title} ao carrinho`}
                >
                    <img src="/cart-add-icon.svg" width="20" height="20" className={`add ${isInCart ? "hidden" : ""}`} alt="Adicionar ao carrinho" />
                    <img src="/cart-add-icon-hover.svg" width="20" height="20" className="add-hover hidden" alt="Adicionar ao carrinho (hover)" />

                    <img src="/cart-active-icon.svg" width="20" height="20" className={`active ${isInCart ? "" : "hidden"}`} alt="Item no carrinho" />
                    <img src="/cart-remove-icon-hover.svg" width="20" height="20" className="active-hover hidden" alt="Remover do carrinho (hover)" />
                </ButtonCart>

                <ButtonFavorite
                    className={`ease-linear duration-200 delay-100 flex-auto p-2 bg-white rounded-md ${isFavorite ? "active" : ""}`}
                    onClick={favoriteHandler}
                    aria-pressed={isFavorite}
                    aria-label={isFavorite ? `Remover ${product.title} dos favoritos` : `Adicionar ${product.title} aos favoritos`}
                >
                    <img src="/star.svg" className={`default ${isFavorite ? "hidden" : ""}`} width="20" height="20" alt="Favoritar" />
                    <img src="/star-hover.svg" className={`hover hidden ${isFavorite ? "hidden" : ""}`} width="20" height="20" alt="Favoritar" />
                    <img src="/star-active.svg" className={`active ${isFavorite ? "" : "hidden"}`} width="20" height="20" alt="Favorito" />
                    <img src="/star-remove-hover.svg" className="active-hover hidden" width="20" height="20" alt="Favorito" />
                </ButtonFavorite>
            </div>
        </ContentBody>
    )
}
