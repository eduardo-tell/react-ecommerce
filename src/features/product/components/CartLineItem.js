import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleCartItem } from "../../cart/cartSlice";
import { ROUTES } from "../../../shared/constants/routes";
import { formatBRL } from "../../../shared/utils/currency";

/** Item horizontal no drawer e no checkout */
export function CartLineItem({ item }) {
  const dispatch = useDispatch();
  const lineTotal = item.price * (item.quantity ?? 1);

  return (
    <article className="group flex gap-2 h-[131px]">
      <Link
        to={ROUTES.product(item.id)}
        className="shrink-0 w-[131px] h-[131px] rounded-lg overflow-hidden bg-slate-200"
      >
        <img
          src={item.thumbnail}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </Link>

      <div className="flex flex-col justify-between flex-1 min-w-0 text-left py-1">
        <div>
          <h3 className="font-bold line-clamp-2 group-hover:underline">
            <Link to={ROUTES.product(item.id)} className="focus-visible:underline">
              {item.title}
            </Link>
          </h3>
          {item.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mt-1">{item.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="font-bold text-primary">{formatBRL(lineTotal)}</p>
          <button
            type="button"
            className="p-2 rounded-md bg-white hover:bg-[#c83a3a] group-trash"
            onClick={() => dispatch(toggleCartItem(item))}
            aria-label={`Remover ${item.title} do carrinho`}
          >
            <figure className="group-trash-hover:hidden">
              <img 
                src="/trash.svg" 
                width={32} 
                height={32} 
                alt="" 
                className="size-5" 
              />
            </figure>

            <figure className="hidden group-trash-hover:block">
              <img
                src="/trash-white.svg"
                width={32}
                height={32}
                alt=""
                className="size-5"
              />
            </figure>
          </button>
        </div>
      </div>
    </article>
  );
}
