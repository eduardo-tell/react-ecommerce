import { ProductCard } from "../../features/product/components/ProductCard";

/** Grade responsiva compartilhada entre home, busca e favoritos */
export function ProductGrid({ products }) {
  return (
    <ul
      className="mt-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 px-4 lg:px-0 gap-7 list-none p-0 m-0"
      aria-label="Lista de produtos"
    >
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
