import { useState } from "react";
import { useSelector } from "react-redux";
import { BadgeCount } from "../../../shared/components/BadgeCount";
import { IconAction } from "../../../shared/components/IconAction";
import { selectCartCount } from "../cartSelectors";
import { CartDrawer } from "./CartDrawer";

/** Ícone do header + estado aberto/fechado do drawer */
export function CartWidget() {
  const count = useSelector(selectCartCount);
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconAction
        label={`Carrinho${count ? `, ${count} itens` : ""}`}
        onClick={() => setOpen(true)}
      >
        <img src="/cart-icon.svg" width={20} height={20} alt="" />
        <BadgeCount count={count} />
      </IconAction>

      <CartDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
