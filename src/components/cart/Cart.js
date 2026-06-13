import { useRef } from "react";
import { useSelector } from "react-redux";
import './styles.scss';
import ButtonCount from "../buttonCount/ButtonCount";

export default function Cart() {
  const cartProducts = useSelector(state => state.cartProducts)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)


  return (
    <>
        <ButtonCount count={cartProducts?.length} name="Carrinho" onClick={(e) => document.getElementById('CartDrawer').classList.toggle('open')} />

        <div id="CartDrawer" ref={dialogRef} className="">
          <div className="cart-drawer__header">
            <h3 className="hdt-mini-cart__header-title hdt-text-lg hdt-font-medium">Seu Carrinho</h3>
            <button ref={closeButtonRef} className="hdt-s-text hdt-dialog-btn__close" onClick={(e) => document.getElementById('CartDrawer').classList.toggle('open')}>
              <svg part="hdt-close-icon" className="hdt-icon hdt-icon-close" role="presentation" fill="none" focusable="false" width="16" height="14" viewBox="0 0 16 14">
                <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none"></path>
              </svg>
            </button>
          </div>
          <div className="cart-drawer__inner">
            <div className="hdt-mini-cart__main hdt-relative">
              <div data-hdt-scroll-me="" className="hdt-mini-cart__sroll hdt-current-scrollbar hdt-full-width-link" aria-label="link">
                <div className="hdt-mini-cart__items hdt-ratio--adapt_image">
                  <form action="/cart" id="CartDrawer-Form" method="POST">
                    {cartProducts?.map(cartProduct => {
                      return (
                          console.log(cartProduct),

                          <div key={cartProduct.id} className="hdt-mini-cart__item hdt-cart-item hdt-flex hdt-relative hdt-oh hdt-line-item">
                            <div className="hdt-mini-cart__image">
                              <a href="/products/ninebot-mini-pro?variant=47130213548288" className="hdt-mini-cart__img hdt-block hdt-relative hdt-oh hdt-ratio" style={{ '--aspect-ratioapt': '0.9975' }}>
                                <img src="" alt="" width="120" height="120" loading="lazy" sizes="(max-width: 1024px) 80px, 160px" />
                              </a>
                            </div>
                            <div className="">
                              <a href="/products/ninebot-mini-pro?variant=47130213548288" className=""> {cartProduct.title} </a>
                              <div className="">
                                <div className="">
                                  <div className="">
                                    <span className="">{cartProduct.price?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="actions">
                                <div className="hdt-flex hdt-align-center hdt-justify-start">
                                  <div inner="" placement="top" style={{ marginInlineEnd: '10px' }}>
                                    <div className="hdt-inline-flex hdt-align-center" data-index="1" form="id:CartDrawer-Form">
                                      {/* <a href="/cart/change?line=1&amp;quantity=0" className="hdt-mini-cart__remove hdt-s-text">
                                        <svg viewBox="0 0 24 24" width="17">
                                          <use href="#icon-cart-remove"></use>
                                        </svg>
                                        <span className="sr-only">Remove item</span>
                                      </a> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                      )
                    })}
                  </form>
                </div>
              </div>
            </div>
            <div className="hdt-mini-cart__bottom">
              
            </div>
          </div>
        </div>
    </>
  )
}
