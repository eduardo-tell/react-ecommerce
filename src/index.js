import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import './index.scss';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Favoritos from './pages/Favoritos';
import SearchResults from './pages/SearchResults';
import Checkout from './pages/Checkout';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './Layout';
import store from "./storage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/produto/:id" element={<ProductDetails />} />
          <Route exact path="/favoritos" element={<Favoritos />} />
          <Route exact path="/busca" element={<SearchResults />} />
          <Route exact path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
