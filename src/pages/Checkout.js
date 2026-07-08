import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotal } from '../features/cart/selectors';

export default function Checkout() {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const onSubmit = () => setOrderConfirmed(true);

  if (cartItems.length === 0 && !orderConfirmed) {
    return (
      <main id="main-content" className="main-content p-6">
        <div className="container m-auto text-center">
          <p>Seu carrinho está vazio.</p>
          <Link to="/" className="underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600">
            Ver produtos
          </Link>
        </div>
      </main>
    )
  }

  if (orderConfirmed) {
    return (
      <main id="main-content" className="main-content p-6">
        <div className="container m-auto text-center" role="status">
          <h1 className="text-3xl font-bold mb-2">Pedido confirmado!</h1>
          <p>Este é um checkout fictício, nenhuma cobrança foi realizada.</p>
          <Link to="/" className="underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600 mt-4 inline-block">
            Voltar para a loja
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main id="main-content" className="main-content p-6">
      <div className="container m-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section aria-label="Resumo do pedido">
          <h1 className="text-2xl font-bold mb-4">Resumo do pedido</h1>
          <ul className="flex flex-col gap-3">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between border-b pb-2">
                <span>{item.title} <span className="text-gray-500">x{item.quantity}</span></span>
                <span>R${(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="flex justify-between font-bold text-lg mt-4">
            <span>Total</span>
            <span>R${cartTotal.toFixed(2)}</span>
          </p>
        </section>

        <section aria-label="Dados para entrega">
          <h2 className="text-2xl font-bold mb-4">Dados para entrega</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Nome completo</label>
              <input
                id="name"
                type="text"
                className="w-full h-12 px-4 py-1 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'name-error' : undefined}
                {...register('name', { required: true })}
              />
              {errors.name && <span id="name-error" role="alert" className="text-red-600 text-sm">Informe seu nome.</span>}
            </div>

            <div>
              <label htmlFor="email" className="block mb-1 font-medium">E-mail</label>
              <input
                id="email"
                type="email"
                className="w-full h-12 px-4 py-1 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'email-error' : undefined}
                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              />
              {errors.email && <span id="email-error" role="alert" className="text-red-600 text-sm">Informe um e-mail válido.</span>}
            </div>

            <div>
              <label htmlFor="address" className="block mb-1 font-medium">Endereço de entrega</label>
              <input
                id="address"
                type="text"
                className="w-full h-12 px-4 py-1 rounded-md border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                aria-invalid={errors.address ? 'true' : 'false'}
                aria-describedby={errors.address ? 'address-error' : undefined}
                {...register('address', { required: true })}
              />
              {errors.address && <span id="address-error" role="alert" className="text-red-600 text-sm">Informe o endereço de entrega.</span>}
            </div>

            <button
              type="submit"
              className="bg-black text-white rounded-md py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Confirmar pedido
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
