import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { selectCartItems, selectCartTotal } from "../features/cart/cartSelectors";
import { CartLineItem } from "../features/product/components/CartLineItem";
import { ROUTES } from "../shared/constants/routes";
import { useDocumentMeta } from "../shared/hooks/useDocumentMeta";
import { formatBRL } from "../shared/utils/currency";

export function CheckoutPage() {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const dispatch = useDispatch();
  const [confirmed, setConfirmed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useDocumentMeta({
    title: confirmed ? "Pedido confirmado | E-commerce" : "Checkout | E-commerce",
    description: "Finalize seu pedido fictício de forma segura.",
  });

  const onSubmit = () => {
    dispatch(clearCart());
    setConfirmed(true);
  };

  if (items.length === 0 && !confirmed) {
    return (
      <main id="main-content" className="container mx-auto p-6 text-center">
        <p>Seu carrinho está vazio.</p>
        <Link to={ROUTES.home} className="underline">Ver produtos</Link>
      </main>
    );
  }

  if (confirmed) {
    return (
      <main id="main-content" className="container mx-auto p-6 text-center" role="status">
        <h1 className="text-3xl font-bold mb-2">Pedido confirmado!</h1>
        <p>Este é um checkout fictício, nenhuma cobrança foi realizada.</p>
        <Link to={ROUTES.home} className="underline mt-4 inline-block">
          Voltar para a loja
        </Link>
      </main>
    );
  }

  return (
    <main id="main-content" className="container mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section aria-label="Resumo do pedido">
          <h1 className="text-2xl font-bold mb-4">Resumo do pedido</h1>
          <ul className="flex flex-col gap-3 list-none p-0 m-0">
            {items.map((item) => (
              <li key={item.id}>
                <CartLineItem item={item} />
              </li>
            ))}
          </ul>
          <p className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>{formatBRL(total)}</span>
          </p>
        </section>

        <section aria-label="Dados para entrega">
          <h2 className="text-2xl font-bold mb-4">Dados para entrega</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Nome completo</label>
              <input
                id="name"
                className="w-full h-12 px-4 rounded-md border border-gray-300"
                aria-invalid={Boolean(errors.name)}
                {...register("name", { required: true, maxLength: 120 })}
              />
              {errors.name && (
                <span role="alert" className="text-red-600 text-sm">Informe seu nome.</span>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">E-mail</label>
              <input
                id="email"
                type="email"
                className="w-full h-12 px-4 rounded-md border border-gray-300"
                aria-invalid={Boolean(errors.email)}
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/,
                  maxLength: 120,
                })}
              />
              {errors.email && (
                <span role="alert" className="text-red-600 text-sm">Informe um e-mail válido.</span>
              )}
            </div>

            <div>
              <label htmlFor="address" className="block mb-1 font-medium">Endereço de entrega</label>
              <input
                id="address"
                className="w-full h-12 px-4 rounded-md border border-gray-300"
                aria-invalid={Boolean(errors.address)}
                {...register("address", { required: true, maxLength: 200 })}
              />
              {errors.address && (
                <span role="alert" className="text-red-600 text-sm">
                  Informe o endereço de entrega.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="bg-secundary hover:bg-primary text-black py-2 w-full rounded-md"
            >
              Confirmar pedido
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
