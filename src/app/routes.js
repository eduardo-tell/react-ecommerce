import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import { HomePage } from "../pages/HomePage";
import { ProductPage } from "../pages/ProductPage";
import { FavoritesPage } from "../pages/FavoritesPage";
import { SearchPage } from "../pages/SearchPage";
import { CheckoutPage } from "../pages/CheckoutPage";

/** Definição central de rotas (fácil de auditar e testar) */
export const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: "produto/:id", element: <ProductPage /> },
        { path: "favoritos", element: <FavoritesPage /> },
        { path: "busca", element: <SearchPage /> },
        { path: "checkout", element: <CheckoutPage /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
