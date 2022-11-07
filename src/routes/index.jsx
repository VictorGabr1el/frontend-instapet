import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../components/pages/Home";
import Login from "../components/pages/Login";
import { PrivateRoute } from "./privateRoutes";
import Postagem from "../components/organisms/Postagem";
import User from "../components/pages/User";
import Register from "../components/pages/Signup";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/home/:userId" element={<Home />} />
          <Route path="/home/user" exat element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
};
