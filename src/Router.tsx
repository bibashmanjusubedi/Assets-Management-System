import { createBrowserRouter } from "react-router";
import Login from "./Components/Login";
// import Register from "./Components/Register";
// import Sidebar from "./Components/Sidebar";
import App from "./App";
import Assets from "./features/assets/AssetsPage";
import Statistics from "./Components/cards/Statistics";
import Categories from "./Components/Categories";
import Users from "./Components/Users";
import AssetsOut from "./pages/AssetsOut";
import AssetDetailsPage from "./features/assetsDetails/AssetDetailsPage";
import NewUsers from "./Components/Register";
import LogoutPage from "./Components/Logout";
import SingleAssetsDetailsPage from "./features/assetsDetails/SingleAssetsDetailsPage";
import MaintenanceTable from "./Components/Maintenence";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/newUsers",
    element: <NewUsers />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "/assets",
        children: [
          {
            index: true,
            element: <Assets />,
          },
        ],
      },

      {
        path: "/users",
        element: <Users />,
      },

      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/assets-details",
        children:[
          {
index: true,
            element: <AssetDetailsPage />,
          }
          ,{
            path: ":assetId",
            element: <SingleAssetsDetailsPage/>
          }
        ]
      },

      {
        path: "/assets-out",
        element: <AssetsOut />,
      },

      {
        path: "/maintenance",
        element: <MaintenanceTable />,
      },
    ],
  },
]);
