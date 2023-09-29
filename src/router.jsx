import { Navigate, createBrowserRouter } from "react-router-dom";
import Transaksi from "./views/Transaksi";
import Food from "./views/Food";
import DefaultLayout from "./components/DefaultLayout";
import TambahMenu from "./views/TambahMenu";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/food",
        element: <Navigate to="/" />,
      },
      {
        path: "/",
        element: <Food />,
      },
      {
        path: "/transaksi",
        element: <Transaksi />,
      },
      {
        path: "tambah-menu",
        element: <TambahMenu />,
      },
    ],
  },
]);

export default router;
