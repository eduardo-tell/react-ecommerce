import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { toggleCartProduct } from '../../features/cart/cart.js';
import { ButtonFavorite, ButtonCart, ContentBody, CardProductImage, CardProductContent } from './styles.tsx';

export default function CardProduct({props}) {
    const dispatch = useDispatch();
    const productcart = useSelector((state) => {
        const cartProducts = state.cartProducts;
        const matchingProduct = cartProducts.find((product) => product.id === props.id);
        const isProductInCart = Boolean(matchingProduct);
        return isProductInCart;
    });
    const [productfavorite, setProductfavorite] = React.useState(false);

    const cartHandler = () => {
        dispatch(toggleCartProduct(props));
    }

    const favoriteHandler = () => {
        setProductfavorite(!productfavorite);
    }

    const showActions = props.className !== "card-product-inside";

    return (
        <ContentBody className={props.className}>
            <CardProductImage>
                <picture>
                    <img src={props.thumbnail} alt="Imagem do produto" />
                </picture>
            </CardProductImage>
            <CardProductContent className="card-product__content w-full text-center">
                <h4>{ props.title }</h4>

                <div className={props.className === 'card-product-inside' ? 'flex w-full justify-between' : null }>
                    <p className="card-product__value">R${ props.price }</p>
                    {props.className === "card-product-inside" ?
                        <ButtonCart 
                            className={`ease-linear duration-200 flex-auto p-2 bg-white hover:!bg-[#c83a3a] rounded-md ${productcart ? "active" : ""}`} 
                            onClick={cartHandler}
                            aria-label="Adicionar ao carrinho"
                        > 
                            <img src="/trash.svg" width="40" height="40" alt="Remover do carrinho" /> 
                            <img src="/trash-white.svg" className="trash-hover hidden" width="40" height="40" alt="Remover do carrinho" />
                        </ButtonCart>
                    : null }
                </div>
            </CardProductContent>
            <div className="absolute justify-end top-0 right-0 flex flex-col gap-2 p-2 card-product__actions">
                {showActions && (
                    <div className="absolute justify-end top-0 right-0 flex flex-col gap-2 p-2 card-product__actions">
                        <ButtonCart 
                            className={`ease-linear duration-200 flex-auto p-2 bg-white rounded-md ${productcart ? "active" : ""}`} 
                            onClick={cartHandler}
                            aria-label="Adicionar ao carrinho"
                        > 
                            <img src="/cart-add-icon.svg" className={`add ${productcart ? 'hidden' : ''}`} alt="Carrinho" /> 
                            <img src="/cart-add-icon-hover.svg" className={`add-hover hidden`} alt="Carrinho" /> 
                            
                            <img src="/cart-active-icon.svg" className={`active ${productcart ? '' : 'hidden'}`} alt="Carrinho" /> 
                            <img src="/cart-remove-icon-hover.svg" className="active-hover hidden" alt="Carrinho" />
                        </ButtonCart>

                        <ButtonFavorite 
                            className={`ease-linear duration-200 delay-100 flex-auto p-2 bg-white rounded-md ${productfavorite ? "active" : ""}`} 
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
