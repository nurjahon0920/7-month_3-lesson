import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    alert(`username: admin     password: 1111`);
  }, []);

  const login = (username, password) => {
    if (username === "admin" && password === "1111") {
      setUser({ username, password });
      navigate("/posts");
    } else {
      alert("Login yoki parol noto'g'ri!");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
