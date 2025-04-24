import { createContext } from "react";

const LoginContext = createContext({
  isLogin: false,
  setIsLogin: () => {},
});

export default LoginContext;
