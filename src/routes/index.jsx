import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoute } from "./privateRoutes";
import { Home, Login, Signup, User, Search } from "../pages";

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
            <Route path="/search/:username" element={<Search />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/user/:userId/post/:postId" element={<User />} />
          </Route>
        </Routes>
      </Router>
    </StateProvider>
  );
};
