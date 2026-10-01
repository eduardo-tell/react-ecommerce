import { useEffect, useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchProducts } from "../../../services/productService";
import { useDebounce } from "../../../shared/hooks/useDebounce";
import { ROUTES } from "../../../shared/constants/routes";
import { SEARCH_MIN_AUTOCOMPLETE } from "../../../shared/constants/limits";
import { sanitizeSearchQuery } from "../../../shared/utils/sanitize";
import { formatBRL } from "../../../shared/utils/currency";

/**
 * Campo de busca com sugestões (máx. 6) e navegação por teclado.
 */
export function SearchField() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounced = useDebounce(query);
  const navigate = useNavigate();
  const listId = useId();

  useEffect(() => {
    const term = sanitizeSearchQuery(debounced);
    if (term.length < SEARCH_MIN_AUTOCOMPLETE) {
      setResults([]);
      return;
    }

    let active = true;
    searchProducts(term, 6).then((items) => {
      if (active) setResults(items);
    });

    return () => {
      active = false;
    };
  }, [debounced]);

  const goToProduct = (id) => {
    navigate(ROUTES.product(id));
    setQuery("");
    setResults([]);
    setActiveIndex(-1);
  };

  const goToResultsPage = () => {
    const term = sanitizeSearchQuery(query);
    if (!term) return;
    navigate(ROUTES.search(term));
    setResults([]);
    setActiveIndex(-1);
  };

  const onKeyDown = (event) => {
    if (event.key === "Escape") {
      setQuery("");
      setResults([]);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    }
    if (event.key === "Enter") {
      event.preventDefault();
      if (activeIndex >= 0 && results[activeIndex]) {
        goToProduct(results[activeIndex].id);
      } else {
        goToResultsPage();
      }
    }
  };

  const showDropdown =
    sanitizeSearchQuery(query).length >= SEARCH_MIN_AUTOCOMPLETE;

  return (
    <div
      className="relative border-2 border-[#393E46] rounded-lg hover:border-primary focus-within:border-primary transition-colors lg:w-[300px]"
    >
      <label htmlFor="site-search" className="sr-only">Buscar produtos</label>
      <input
        id="site-search"
        type="search"
        name="busca"
        placeholder="Buscar..."
        autoComplete="off"
        maxLength={80}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(-1);
        }}
        onKeyDown={onKeyDown}
        role="combobox"
        aria-expanded={showDropdown && results.length > 0}
        aria-controls={listId}
        className="w-full rounded-md px-3 py-1.5 pr-10 text-sm focus:outline-none"
      />

      <button
        type="button"
        className="absolute right-0 top-0 bottom-0 w-9 flex items-center justify-center hover:bg-primary"
        aria-label="Buscar"
        onClick={goToResultsPage}
      >
        <img src="/search.svg" width={20} height={20} alt="" />
      </button>

      {showDropdown && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.length === 0 ? (
            <p className="p-4 text-sm text-center">Nenhum resultado encontrado</p>
          ) : (
            <ul id={listId} role="listbox" className="list-none m-0 p-2">
              {results.map((product, index) => (
                <li key={product.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={index === activeIndex}
                    className="w-full flex gap-2 py-2 border-b border-primary text-left hover:bg-slate-50"
                    onClick={() => goToProduct(product.id)}
                  >
                    <img
                      src={product.thumbnail}
                      alt=""
                      width={56}
                      height={56}
                      className="bg-slate-200 object-cover shrink-0"
                    />
                    <span className="min-w-0">
                      <span className="block font-bold text-sm truncate">{product.title}</span>
                      <span className="block text-xs text-gray-500 truncate">
                        {product.description}
                      </span>
                      <span className="text-sm text-primary font-bold">
                        {formatBRL(product.price)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
