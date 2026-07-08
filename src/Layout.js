import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

export default function Layout() {
    return (
      <>
        <a href="#main-content" className="skip-link">Pular para o conteúdo</a>
        <Header />
        <Outlet />
      </>
    )
  }
