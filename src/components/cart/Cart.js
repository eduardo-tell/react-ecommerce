import { useRef } from "react";
import { useSelector } from "react-redux";
import './styles.scss';
import ButtonCount from "../buttonCount/ButtonCount";
import CardProduct from "../cardProduct/CardProduct";

export default function Cart({icon}) {
  const cartProducts = useSelector(state => state.cartProducts)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  return (
    <>
        <ButtonCount src={icon} count={cartProducts?.length} name="Carrinho" onClick={(e) => document.getElementById('CartDrawer').classList.toggle('open')} />

        <div id="CartDrawer" ref={dialogRef}>
          <div className="cart-drawer__header transition-all flex justify-between align-middle duration-250 ease-in-out">
            <h3 className="flex">Seu Carrinho</h3>
            <button ref={closeButtonRef} className="p-4" onClick={(e) => document.getElementById('CartDrawer').classList.toggle('open')}>
              <svg part="hdt-close-icon" role="presentation" fill="none" focusable="false" width="16" height="14" viewBox="0 0 16 14">
                <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none"></path>
              </svg>
            </button>
          </div>
          <div className="cart-drawer__inner flex justify-start align-top transition-all duration-250 ease-in-out">
            <form action="/cart" className="flex flex-col gap-4 w-full" id="CartDrawer-Form" method="POST">
              {cartProducts?.map(cartProduct => {
                cartProduct = { ...cartProduct, className: "card-product-inside" }
                return (
                  <CardProduct key={cartProduct.id} props={cartProduct} />
                )
              })}
            </form>
          </div>
        </div>
    </>
  )
}
