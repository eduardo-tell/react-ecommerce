import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleCartProduct } from '../../features/cart/cart.js';
import { ButtonFavorite, ButtonCart, ContentBody, CardProductImage, CardProductContent } from './styles.tsx';

export default function CardProduct({props}) {
    const dispatch = useDispatch();
    const [productcart, setProductcart] = React.useState(useSelector(state => state.cartProducts).find((product) => product.id === props.id));
    const [productfavorite, setProductfavorite] = React.useState(false);

    const cartHandler = () => {
        setProductcart(!productcart);
        dispatch(toggleCartProduct(props));
    }

    const favoriteHandler = () => {
        setProductfavorite(!productfavorite);
    }

    const showActions = props.className !== "card-product-inside";

    return (
        <ContentBody className={props.className}>
            <CardProductImage className="CardProductStyle__images">
                <picture>
                    <img src={props.thumbnail} alt="Imagem do produto" />
                </picture>
            </CardProductImage>
            <CardProductContent className="CardProductStyle__content w-full text-center">
                <h4><b>{ props.title }</b></h4>
                <p><b> R${ props.price } </b></p>
            </CardProductContent>
            <div className="absolute justify-end top-0 right-0 flex flex-col gap-2 p-2 card-product__actions">
                {showActions && (
                    <div className="absolute justify-end top-0 right-0 flex flex-col gap-2 p-2 card-product__actions">
                        <ButtonCart 
                            className={`ease-linear duration-200 flex-auto p-2 bg-white hover:!bg-[#A3F7BF] w-[36px] h-[36px] ${productcart ? "active" : ""}`} 
                            onClick={cartHandler}
                            aria-label="Adicionar ao carrinho"
                        > 
                            <img src="/cart-icon.svg" alt="Carrinho" /> 
                        </ButtonCart>

                        <ButtonFavorite 
                            className={`ease-linear duration-200 delay-100 flex-auto p-2 bg-white hover:!bg-[#A3F7BF] w-[36px] h-[36px] ${productfavorite ? "active" : ""}`} 
                            onClick={favoriteHandler}
                            aria-label="Adicionar aos favoritos"
                        > 
                            <img src="/star.svg" alt="Favorito" /> 
                        </ButtonFavorite>
                    </div>
                )}
                
            </div>
        </ContentBody>
    )
}
