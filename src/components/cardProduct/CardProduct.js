import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
// import { toggleFavorite } from '../../features/favorites/favorites';
import { toggleCartProduct } from '../../features/cart/cart.js';
import { ButtonFavorite, ButtonCart, ContentBody, CardProductImage, CardProductContent } from './styles.tsx';

export default function CardProduct({props}) {
    const dispatch = useDispatch();
    const [productcart, setProductcart] = React.useState(useSelector(state => state.cartProducts).find((product) => product.id === props.id));

    const cartHandler = () => {
        setProductcart(!productcart);
        dispatch(toggleCartProduct(props));
    }

    return (
        <ContentBody className={props.className}>
            <CardProductImage className="CardProductStyle__image absolute top-0 left-0 w-full h-[80%] block overflow-hidden">
                <picture>
                    <img src={props.thumbnail} alt="Imagem do produto" />
                </picture>
            </CardProductImage>
            <CardProductContent className="CardProductStyle__content">
                <h4><b>{ props.title }</b></h4>
                <p><b> R${ props.price } </b></p>
            </CardProductContent>
            <div className="absolute justify-end top-0 right-0 w-[50%] flex flex-col gap-2 p-2 card-product__actions">
                <ButtonCart className={`ease-linear flex-auto p-2 bg-green uppercase text-white border border-white ${productcart ? "active" : ""}`} onClick={cartHandler}> <img src="/cart-icon.svg" alt="Carrinho" /> </ButtonCart>
                <ButtonFavorite className={`ease-linear flex-auto p-2 bg-green uppercase text-white border border-white bg-green-600`}> <b> Favoritar </b> </ButtonFavorite>
            </div>
        </ContentBody>
    )
}
