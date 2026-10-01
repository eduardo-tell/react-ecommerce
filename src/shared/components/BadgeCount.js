/** Contador vermelho sobre ícones (carrinho / favoritos) */
export function BadgeCount({ count }) {
  if (!count || count <= 0) return null;

  return (
    <span
      className="absolute -top-1 right-0 min-w-[1.3rem] h-[1.3rem] px-1 rounded-full bg-red-600 text-white text-xs font-bold flex items-center justify-center"
      aria-hidden="true"
    >
      {count}
    </span>
  );
}
