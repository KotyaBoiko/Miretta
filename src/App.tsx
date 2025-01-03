import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./layout/Layout";
import { commonRouter } from "./router/common/commonRouter";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: commonRouter,
      errorElement: <div>404</div>,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
