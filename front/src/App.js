import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import MyPage from "./pages/myPage/MyPage";
import SignUp from "./pages/signUp/SignUp";
import Category1 from "./pages/category1/Category1";
import Category2 from "./pages/category2/Category2";
import Detail from "./components/category1/detail/Detail";
import Writing from "./components/category1/writing/Writing";
import CategoryRouter from "./router/category1/CategoryRouter";
import PrivateRoute from "./until/PrivateRoute";

function App() {
    const user = useSelector((state) => state);

    useEffect(() => {}, []);

    return (
        <>
            {/*라우터관리*/}
            <Routes>
                <Route element={<PrivateRoute />}>
                    <Route path="/myPage" element={<MyPage />}></Route>
                    <Route path="/category2" element={<Category2 />}></Route>
                </Route>
                <Route path="/category1/*" element={<CategoryRouter />}></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route path="/sign" element={<SignUp />}></Route>
                <Route path="/" element={<Home />}></Route>
                {/*    네비바  */}

                {/*    상세페이지*/}
            </Routes>
        </>
    );
}

export default App;
