import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCartProduct } from "../../features/cart/cart.js";
import { selectIsProductInCart } from "../../features/cart/selectors.js";
import { toggleFavorite } from "../../features/favorites/favorites.js";
import { selectIsProductFavorite } from "../../features/favorites/selectors.js";
import { ButtonFavorite, ButtonCart, ContentBody, CardProductImage, CardProductContent } from "./styles.tsx";

export default function CardProduct({ props }) {
    const dispatch = useDispatch();
    const isInCart = useSelector(state => selectIsProductInCart(state, props.id));
    const isFavorite = useSelector(state => selectIsProductFavorite(state, props.id));

    const isInsideCart = props.className?.includes("card-product-inside");

    const cartHandler = () => {
        dispatch(toggleCartProduct(props));
    }

    const favoriteHandler = () => {
        dispatch(toggleFavorite(props));
    }

    return (
        <ContentBody as="article" className={props.className + ` group`}>
            <CardProductImage>
                <Link to={`/produto/${props.id}`} aria-label={`Ver detalhes de ${props.title}`}>
                    <picture>
                        <img src={props.thumbnail} alt={props.title} />
                    </picture>
                </Link>

                {isInsideCart ? null : (
                    <button className="bg-secundary hover:bg-primary text-black py-2 mx-3 mb-3 w-[calc(100%-1.5rem)] rounded-md absolute transition-all group-hover:bottom-0 -bottom-20 duration-200">
                        Comprar agora
                    </button>
                )}
            </CardProductImage>
            <CardProductContent className="card-product__content w-full text-center">
                <h4>
                    <Link to={`/produto/${props.id}`} className="font-bold hover:underline focus-visible:underline line-clamp-[2]">
                        {props.title}
                    </Link>
                </h4>

                {isInsideCart ? (
                        <span className="text-sm text-gray-600 line-clamp-[3]">
                        {props.description}
                    </span>
                ) :  null}

                <div className={isInsideCart ? "flex w-full justify-between items-center" : null}>
                    <p className="card-product__value font-bold text-primary">
                        R${isInsideCart ? (props.price * props.quantity).toFixed(2) : props.price}
                    </p>
                    {isInsideCart &&
                        <ButtonCart
                            className="ease-linear duration-200 flex-auto p-2 bg-white hover:!bg-[#c83a3a] rounded-md active"
                            onClick={cartHandler}
                            aria-label={`Remover ${props.title} do carrinho`}
                        >
                            <img src="/trash.svg" width="40" height="40" alt="" />
                            <img src="/trash-white.svg" className="trash-hover hidden" width="40" height="40" alt="" />
                        </ButtonCart>
                    }
                </div>
            </CardProductContent>

            {!isInsideCart && (
                <div className="absolute justify-end top-0 right-0 flex flex-col gap-2 p-2 card-product__actions">
                    <ButtonCart
                        className={`ease-linear duration-200 flex-auto p-2 bg-white rounded-md ${isInCart ? "active" : ""}`}
                        onClick={cartHandler}
                        aria-pressed={isInCart}
                        aria-label={isInCart ? `Remover ${props.title} do carrinho` : `Adicionar ${props.title} ao carrinho`}
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
                        aria-label={isFavorite ? `Remover ${props.title} dos favoritos` : `Adicionar ${props.title} aos favoritos`}
                    >
                        <img src="/star.svg" className={`default ${isFavorite ? "hidden" : ""}`} width="20" height="20" alt="Favoritar" />
                        <img src="/star-hover.svg" className={`hover hidden ${isFavorite ? "hidden" : ""}`} width="20" height="20" alt="Favoritar" />
                        <img src="/star-active.svg" className={`active ${isFavorite ? "" : "hidden"}`} width="20" height="20" alt="Favorito" />
                        <img src="/star-remove-hover.svg" className="active-hover hidden" width="20" height="20" alt="Favorito" />
                    </ButtonFavorite>
                </div>
            )}
        </ContentBody>
    )
}
