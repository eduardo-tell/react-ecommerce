/**
 * Botão de ícone reutilizável no header (carrinho, favoritos, etc.)
 */
export function IconAction({
  as: Component = "button",
  children,
  className = "",
  label,
  ...props
}) {
  return (
    <Component
      type={Component === "button" ? "button" : undefined}
      className={`relative p-2 border-b-2 border-transparent hover:border-primary focus:border-primary transition-all duration-200 focus-visible:outline focus-visible:outline-2 ${className}`}
      aria-label={label}
      {...props}
    >
      {children}
    </Component>
  );
}
