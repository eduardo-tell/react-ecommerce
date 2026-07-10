import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartDrawer } from './styles.tsx';
import ButtonCount from "../buttonCount/ButtonCount";
import CardProduct from "../cardProduct/CardProduct";
import { selectCartItems, selectCartTotal } from "../../features/cart/selectors";

export default function Cart({ icon }) {
  const cartProducts = useSelector(selectCartItems)
  const cartTotal = useSelector(selectCartTotal)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)
  const triggerButtonRef = useRef(null)

  function toggleCartDrawer(action) {
    if (action === '1' && !dialogRef.current?.classList.contains('open')) {
      dialogRef.current?.classList.add('open')
      closeButtonRef.current?.focus()
      return
    }

    dialogRef.current?.classList.remove('open')
    triggerButtonRef.current?.focus()
  }

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        toggleCartDrawer()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <span ref={triggerButtonRef} className="inline-flex">
        <ButtonCount src={icon} count={cartProducts?.length} name="Carrinho" onClick={() => toggleCartDrawer('1')} />
      </span>

      <CartDrawer id="CartDrawer" ref={dialogRef} role="dialog" aria-modal="true" aria-label="Carrinho de compras">
        <div className="CartDrawer__overlay" onClick={() => toggleCartDrawer('0')}></div>
        <div className="py-8 cart-drawer__header items-center transition-all flex justify-between align-middle duration-250 ease-in-out border-b-2 border-[#e5e5e5]">
          <h3 className="text-base font-semibold">Seu Carrinho</h3>
          <button
            ref={closeButtonRef}
            className="p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
            onClick={() => toggleCartDrawer('0')}
            aria-label="Fechar carrinho"
          >
            <svg part="hdt-close-icon" role="presentation" fill="none" focusable="false" width="16" height="14" viewBox="0 0 16 14">
              <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none"></path>
            </svg>
          </button>
        </div>
        <div className="cart-drawer__inner flex flex-col justify-start align-top transition-all duration-250 ease-in-out">
          {cartProducts?.length > 0 ? (
            <>
              <div className="flex flex-col gap-4 w-full">
                {cartProducts.map(cartProduct => {
                  cartProduct = { ...cartProduct, className: "card-product-inside" }
                  return (
                    <CardProduct key={cartProduct.id} props={cartProduct} />
                  )
                })}
              </div>

              <div className="cart-drawer__footer border-t-2 border-[#e5e5e5] pt-4 mt-4">
                <p className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>R${cartTotal.toFixed(2)}</span>
                </p>
                <Link
                  to="/checkout"
                  onClick={() => toggleCartDrawer('0')}
                  className="mt-4 block text-center transition-all bg-[#A3F7BF] text-b rounded-md py-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 hover:bg-[#29A29D] hover:text-white focus-visible:outline-blue-600"
                >
                  Finalizar compra
                </Link>
              </div>
            </>
          ) : (
            <p className="text-center py-8">Seu carrinho está vazio.</p>
          )}
        </div>
      </CartDrawer>
    </>
  )
}
