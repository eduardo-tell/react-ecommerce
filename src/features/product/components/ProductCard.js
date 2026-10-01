import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCartItem } from "../../cart/cartSlice";
import { selectIsInCart } from "../../cart/cartSelectors";
import { toggleFavorite } from "../../favorites/favoritesSlice";
import { selectIsFavorite } from "../../favorites/favoritesSelectors";
import { ROUTES } from "../../../shared/constants/routes";
import { formatBRL } from "../../../shared/utils/currency";
import { ActionButton, Actions, BuyNow, Card, Media } from "./productCard.styles";

/**
 * Card de produto na vitrine: toggle carrinho/favorito e CTA “Comprar agora”.
 */
export function ProductCard({ product }) {
  const dispatch = useDispatch();
  const inCart = useSelector((state) => selectIsInCart(state, product.id));
  const favorite = useSelector((state) => selectIsFavorite(state, product.id));

  return (
    <Card>
      <Media>
        <Link to={ROUTES.product(product.id)} aria-label={`Ver detalhes de ${product.title}`}>
          <img src={product.thumbnail} alt={product.title} loading="lazy" decoding="async" />
        </Link>

        <BuyNow type="button" onClick={() => dispatch(toggleCartItem(product))}>
          Comprar agora
        </BuyNow>
      </Media>

      <div className="p-2 text-center">
        <h2 className="text-base font-bold leading-snug">
          <Link to={ROUTES.product(product.id)} className="hover:underline line-clamp-2">
            {product.title}
          </Link>
        </h2>
        <p className="font-bold text-primary mt-1">{formatBRL(product.price)}</p>
      </div>

      <Actions>
        <ActionButton
          type="button"
          className={`action-favorite ${favorite ? "is-active" : ""}`}
          aria-pressed={favorite}
          aria-label={
            favorite
              ? `Remover ${product.title} dos favoritos`
              : `Adicionar ${product.title} aos favoritos`
          }
          onClick={() => dispatch(toggleFavorite(product))}
        >
          <img
            src={favorite ? "/star-active.svg" : "/star.svg"}
            width={20}
            height={20}
            alt=""
          />
        </ActionButton>

        <ActionButton
          type="button"
          className={`action-cart ${inCart ? "is-active" : ""}`}
          aria-pressed={inCart}
          aria-label={
            inCart
              ? `Remover ${product.title} do carrinho`
              : `Adicionar ${product.title} ao carrinho`
          }
          onClick={() => dispatch(toggleCartItem(product))}
        >
          <img
            src={inCart ? "/cart-active-icon.svg" : "/cart-add-icon.svg"}
            width={20}
            height={20}
            alt=""
          />
        </ActionButton>
      </Actions>
    </Card>
  );
}
