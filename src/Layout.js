import { Outlet } from "react-router-dom";
import Header from "./components/header/Header";

export default function Layout() {

    function overlay(event) {
      if (event) {
        document.getElementById('body')?.classList.add('open')
      } else {
        document.getElementById('body')?.classList.remove('open')
      }
    }

    return (
      <>
        <Header />  
        <Outlet />
      </>
    )
  }