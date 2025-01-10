import { createBrowserRouter, RouterProvider } from "react-router";
import { commonRouter } from "@/router/common/commonRouter";
import Layout from "@/layout/Layout";

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
