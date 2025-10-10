import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import store from "./redux-toolkit/store";
import Feed from "./pages/Feed";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="feed" element={<Feed />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
