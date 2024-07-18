import "./App.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import Posts from "./pages/Posts";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { PostProvider } from "./context/postContext";
import { CountProvider } from "./context/countContext";
import { UserProvider } from "./context/userContext";

const App = () => {
  return (
    <div className="container">
      <Router>
        <AuthProvider>
          <Header />
          <Routes>
            <Route
              path="/posts"
              element={
                <PrivateRoute>
                  <UserProvider>
                    <PostProvider>
                      <CountProvider>
                        <Posts />
                      </CountProvider>
                    </PostProvider>
                  </UserProvider>
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
