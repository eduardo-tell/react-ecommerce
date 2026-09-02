import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCartProduct } from "../../features/cart/cart.js";
import { selectIsProductInCart } from "../../features/cart/selectors.js";
import { toggleFavorite } from "../../features/favorites/favorites.js";
import { selectIsProductFavorite } from "../../features/favorites/selectors.js";
import { ButtonFavorite, ButtonCart, ContentBody, CardProductImage, CardProductContent } from "./styles.tsx";

export default function CardProduct({ product }) {
    const dispatch = useDispatch();

    const cartHandler = () => {
        dispatch(toggleCartProduct(product));
    }

    return (
        <ContentBody as="article" className={product.className + ` group`}>
            <CardProductImage>
                <Link to={`/produto/${product.id}`} aria-label={`Ver detalhes de ${product.title}`}>
                    <picture>
                        <img src={product.thumbnail} alt={product.title} />
                    </picture>
                </Link>

            </CardProductImage>
            <CardProductContent className="card-product__content w-full text-center">
                <h4>
                    <Link to={`/produto/${product.id}`} className="font-bold hover:underline focus-visible:underline line-clamp-[2]">
                        {product.title}
                    </Link>
                </h4>
                
                <span className="text-sm text-gray-600 line-clamp-[3]">
                    {product.description}
                </span>

                <div className="flex w-full justify-between items-center">
                    <p className="card-product__value font-bold text-primary">
                        R${(product.price * product.quantity).toFixed(2)}
                    </p>
                    <ButtonCart
                        className="ease-linear duration-200 flex-auto p-2 bg-white hover:!bg-[#c83a3a] rounded-md active"
                        onClick={cartHandler}
                        aria-label={`Remover ${product.title} do carrinho`}
                    >
                        <img src="/trash.svg" width="40" height="40" alt="" />
                        <img src="/trash-white.svg" className="trash-hover hidden" width="40" height="40" alt="" />
                    </ButtonCart>
                </div>
            </CardProductContent>
        </ContentBody>
    )
}
