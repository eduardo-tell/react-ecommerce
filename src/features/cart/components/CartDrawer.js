import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { CartLineItem } from "../../product/components/CartLineItem";
import { selectCartItems, selectCartTotal } from "../cartSelectors";
import { ROUTES } from "../../../shared/constants/routes";
import { formatBRL } from "../../../shared/utils/currency";
import { useOnEscape } from "../../../shared/hooks/useOnEscape";
import { DrawerRoot, Overlay, Panel } from "./cartDrawer.styles";

/**
 * Drawer do carrinho renderizado no body (portal) para não ficar preso ao header.
 */
export function CartDrawer({ open, onClose }) {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  useOnEscape(onClose, open);

  return createPortal(
    <DrawerRoot className={open ? "is-open" : ""} role="presentation">
      <Overlay type="button" aria-label="Fechar carrinho" onClick={onClose} />
      <Panel role="dialog" aria-modal="true" aria-label="Carrinho de compras">
        <header className="h-[78px] px-4 flex items-center justify-between border-b-2 border-[#e5e5e5]">
          <h2 className="text-base font-semibold">Seu Carrinho</h2>
          <button
            type="button"
            className="p-4"
            onClick={onClose}
            aria-label="Fechar carrinho"
          >
            <svg width="16" height="14" viewBox="0 0 16 14" aria-hidden="true">
              <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" />
            </svg>
          </button>
        </header>

        <div className="flex-1 overflow-y-auto pt-4 pl-4 pr-4 flex flex-col justify-between">
          {items.length === 0 ? (
            <p className="text-center py-8">Seu carrinho está vazio.</p>
          ) : (
            <>
              <ul className="flex flex-col gap-4 list-none p-0 m-0">
                {items.map((item) => (
                  <li key={item.id}>
                    <CartLineItem item={item} />
                  </li>
                ))}
              </ul>

              <footer className="border-t-2 border-[#e5e5e5] pt-4 pb-4 mt-4 sticky bottom-0 bg-white">
                <p className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>{formatBRL(total)}</span>
                </p>
                <Link
                  to={ROUTES.checkout}
                  onClick={onClose}
                  className="mt-4 block text-center bg-secundary rounded-md py-3 hover:bg-primary hover:text-white transition-colors"
                >
                  Finalizar compra
                </Link>
              </footer>
            </>
          )}
        </div>
      </Panel>
    </DrawerRoot>,
    document.body
  );
}
