import { Outlet } from "react-router-dom";
import { SkipLink } from "../../shared/components/SkipLink";
import { SiteHeader } from "./SiteHeader";

/** Layout com header + conteúdo das rotas */
export function AppLayout() {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <Outlet />
    </>
  );
}
