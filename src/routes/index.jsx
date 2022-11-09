import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./privateRoutes";
import { Home, Login, User, Signup } from "../components/pages/index.js";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Signup />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/user/:user" exat element={<User />} />
        </Route>
      </Routes>
    </Router>
  );
};
