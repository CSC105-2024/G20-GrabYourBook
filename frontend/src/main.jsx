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
import Booking from './pages/Booking.jsx'
import BookingSuccessPage from './pages/ConfirmBookingPage.jsx'
import LoginContext from "./context/LoginContext";
import CancleMyBookPage from "./pages/CancleMyBookPage.jsx";
import CancleSuccessPage from "./pages/CancleSuccessPage.jsx";
import Search from "./pages/Search.jsx";
import DetailBook from "./pages/DetailBook.jsx";
import DetailBookAva from "./pages/DetailBookAva.jsx"
import ErrorPage from "./pages/Error.jsx";
import SearchResult from "./pages/Search.jsx";

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
    path: "/booking/:id",
    element: <Booking/>,
  },
  {
    path: "/booking-success/:id",
    element: <BookingSuccessPage/>
  },
  {
    path: "/canclewarning",
    element: <CancleMyBookPage />,
  },
  {
    path: "/canclesuccess",
    element: <CancleSuccessPage />,
  },
  {
    path: "/detailbook",
    element: <DetailBook/>,
  },
  {
    path: "/detailbookava",
    element: <DetailBookAva/>,
  },
  {
    path: "*",
    element: <ErrorPage/>,
  },
  {
    path: '/searchresult',
    element: <SearchResult/>
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