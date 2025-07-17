import { Outlet } from "react-router-dom";

export default function Layout () {
  return (
    <>
      <h1>layout Component</h1>
      <Outlet/>
    </>
  );
}