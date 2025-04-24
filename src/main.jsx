import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Mybook from "./pages/Mybook.jsx";
import Comedy from "./pages/Comedy.jsx";
import Register from "./pages/Register.jsx";
import Drama from "./pages/Drama.jsx";
import Fantasy from "./pages/Fantasy.jsx";
import Horror from "./pages/Horror.jsx";
import Romance from "./pages/Romance.jsx";
import Lgbtq from "./pages/Lgbtq.jsx";
import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DetailAva from "./pages/DetailBookava.jsx";
import LoginContext from "./context/LoginContext";
import CancleMyBookPage from "./pages/CancleMyBookPage.jsx";
import CancleSuccessPage from "./pages/CancleSuccessPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/mybook",
    element: <Mybook />,
  },
  {
    path: "/comedy",
    element: <Comedy />,
  },

  {
    path: "/drama",
    element: <Drama />,
  },
  {
    path: "/fantasy",
    element: <Fantasy />,
  },
  {
    path: "/horror",
    element: <Horror />,
  },
  {
    path: "/romance",
    element: <Romance />,
  },
  {
    path: "/lgbtq",
    element: <Lgbtq />,
  },
  {
    path: "/detailava",
    element: <DetailAva />,
  },
  {
    path: "/canclewarning",
    element: <CancleMyBookPage />,
  },
  {
    path: "/canclesuccess",
    element: <CancleSuccessPage />,
  }
]);

function RootWithContext() {
  const [isLogin, setIsLogin] = useState(() => {
    const saved = localStorage.getItem("isLogin");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLogin", isLogin);
  }, [isLogin]);

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin }}>
      <RouterProvider router={router} />
    </LoginContext.Provider>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootWithContext />
  </StrictMode>
);
