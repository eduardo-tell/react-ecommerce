import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import './index.scss';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Favoritos from './pages/Favoritos';
import SearchResults from './pages/SearchResults';
import Checkout from './pages/Checkout';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Layout';
import store from "./storage";

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: '/produto/:id', element: <ProductDetails /> },
        { path: '/favoritos', element: <Favoritos /> },
        { path: '/busca', element: <SearchResults /> },
        { path: '/checkout', element: <Checkout /> }
      ]
    }
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
    }
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
