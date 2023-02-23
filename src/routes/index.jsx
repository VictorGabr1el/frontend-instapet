import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./privateRoutes";
import { Home, Login, User, Signup } from "../components/pages";
import { StateProvider } from "../context";

export const AppRouter = () => {
  return (
    <StateProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Signup />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/home/:postId" element={<Home />} />
            <Route path="/user/:userId" exat element={<User />} />
            <Route path="/user/:userId/post/:postId" exat element={<User />} />
          </Route>
        </Routes>
      </Router>
    </StateProvider>
  );
};
