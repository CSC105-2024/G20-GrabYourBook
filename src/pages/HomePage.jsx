// import "../App.css";
// import React, { useState, useRef, useContext } from "react";
// import Navbar from "../components/Navbar";
// import NotLogInGrabyourbook from "../components/homecomponent/NotLogInGrabyourbook";
// import SearchHome from "../components/homecomponent/SearchHome";
// import Recommend from "../components/homecomponent/Recommend";
// import Category from "../components/homecomponent/Category";
// import LogInGrabyourbook from "../components/homecomponent/LoginGrabyourbook";
// import LoginContext from "../context/LoginContext";

// function HomePage() {
//   // const [isLogin, setIsLogin] = useState(true);
//   const { isLogin } = useContext(LoginContext);

//   return (
//     <div className="flex flex-col w-full  justify-center items-center">
//       {isLogin ? (
//         <>
//           <div className="w-full">
//             <Navbar />
//             <LogInGrabyourbook />
//             <SearchHome />
//             <Recommend />
//           </div>

//           <Category />
//         </>
//       ) : (
//         <>
//           <div className="w-full h-full bg-neutral-200 relative -z-10">
//             <div className="w-[1246px] h-[1529px] left-[50%] top-[-500px] absolute bg-indigo-300 rounded-full blur-[300px] -z-10" />

//             <div className="w-[690px] h-[921px] left-[80%] top-[-315px] absolute bg-blue-500 blur-[220px] -z-10" />
//           </div>
//           <div className="flex flex-col w-full justify-center items-center ">
//             <Navbar />
//             <NotLogInGrabyourbook />
//             <SearchHome />
//             <Recommend />
//             <Category />
//           </div>
//           <div className="w-full h-full bg-neutral-200 relative -z-10">
//             <div className="w-[690px] h-[921px] right-[80%] top-[-900px] absolute bg-blue-500 blur-[400px] -z-10" />
//           </div>
//           {/* <div className="w-full">
//             <div className="relative min-h-screen ">
//               <div className="absolute inset-0 -z-10">
//                 <div className="w-full h-full overflow-hidden flex items-center justify-center absolute">
//                   <div className="w-[1000px] h-[1400px] left-[-300px] top-[-500px] sm:w-[1360px] sm:h-[1500px] sm:left-[250px] sm:top-[0px] absolute bg-[#8B73A0] rounded-full blur-[100px] sm:blur-[254.50px]" />
//                   <div className="w-[900px] h-[1200px] right-[-200px] top-[-700px] sm:w-[1200px] sm:h-[1500px] sm:right-[-400px] sm:top-[-600px] absolute bg-[#4E7DD7] blur-[150px] sm:blur-[254.50px]" />
//                 </div>
//               </div>
//               <Navbar />
//               <NotLogInGrabyourbook />
//               <SearchHome />
//               <Recommend />
//               <Category />
//             </div>
//           </div> */}
//         </>
//       )}
//     </div>
//   );
// }

// export default HomePage;

import "../App.css";
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
    <div className="relative flex flex-col w-full justify-center items-center min-h-screen overflow-hidden">
 
      {!isLogin && (
        <>
          <div className="w-full h-full bg-neutral-200 relative -z-10">
            <div className="w-[1246px] h-[1529px] left-[50%] top-[-500px] absolute bg-indigo-300 rounded-full blur-[300px] -z-10" />
            <div className="w-[690px] h-[921px] left-[80%] top-[-315px] absolute bg-blue-500 blur-[220px] -z-10" />
          </div>
        </>
      )}
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

      {!isLogin && (
        <div className="w-full h-full bg-neutral-200 relative -z-10">
          <div className="w-[690px] h-[921px] right-[80%] top-[-900px] absolute bg-blue-500 blur-[400px] -z-10" />
        </div>
      )}
    </div>
  );
}

export default HomePage;
