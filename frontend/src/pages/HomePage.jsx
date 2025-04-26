import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import NotLogInGrabyourbook from "../components/homecomponent/NotLogInGrabyourbook";
import SearchHome from "../components/homecomponent/SearchHome";
import Recommend from "../components/homecomponent/Recommend";
import Category from "../components/homecomponent/Category";
import LogInGrabyourbook from "../components/homecomponent/LoginGrabyourbook";
import LoginContext from "../context/LoginContext";

function HomePage() {
  const { isLogin } = useContext(LoginContext);

  return (
    <>
      <div className="relative flex flex-col w-full justify-center items-center min-h-screen overflow-hidden">
        <div className="w-full h-full bg-neutral-200 relative -z-10">
          <div className="w-[1246px] h-[1529px] left-[50%] top-[-500px] absolute bg-indigo-300 rounded-full blur-[300px] -z-10" />
          <div className="w-[690px] h-[921px] left-[80%] top-[-315px] absolute bg-blue-500 blur-[220px] -z-10" />
        </div>
        <div className="w-full z-[999]">
          <Navbar />
        </div>
        {isLogin ? (
          <div className="flex flex-col w-full items-center justify-center z-10">
            <LogInGrabyourbook />
            <SearchHome />
            <Recommend />
            <Category />
          </div>
        ) : (
          <div className="flex flex-col w-full items-center justify-center z-10">
            <NotLogInGrabyourbook />
            <SearchHome />
            <Recommend />
            <Category />
          </div>
        )}
        <div className="w-full h-full bg-neutral-200 relative -z-10">
          <div className="w-[690px] h-[921px] right-[80%] top-[-900px] absolute bg-blue-500 blur-[400px] -z-10" />
        </div>
      </div>
    </>
  );
}

export default HomePage;
