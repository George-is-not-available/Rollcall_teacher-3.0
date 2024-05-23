import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './Login/index.js';
import CallRoll from './CallRoll/index.js';
import Courses from './CoursesPage/index.js';
import Register from './register';
import AddCourseForm from './Addcourses/AddCoursePage.js';

import imageUrl from './AD.png'; // 引入本地图片

const App = () => {
    const [showAd, setShowAd] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowAd(true);
        }, 5000); // 5秒后显示广告

        return () => clearTimeout(timer);
    }, []);

    const handleCloseAd = () => {
        setShowAd(false);
    };
    

    const adUrl = "http://tp.9377s.com/1489582/";

    const routes = [
        {
            path: "/",
            element: (
                <div style={{
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column", // 垂直排列元素
                    height: "100vh", // 让容器铺满整个视口高度
                }}>
                    {showAd && (
                        <a href={adUrl} target="_blank" rel="noopener noreferrer" style={{
                            position: "absolute",
                            left: "0",
                            bottom: "0",
                            width: "300px",
                            height: "200px",
                            backgroundColor: "#fff",
                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                            transition: "left 0.5s ease-in-out",
                            zIndex: "9999",
                            textDecoration: "none", // 防止链接被下划线
                            color: "#333", // 设置链接颜色
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <img src={imageUrl} alt="广告图片" style={{ width: "600px", marginBottom: "20px" }} />
                            <div style={{
                                position: "absolute",
                                top: "-299px",
                                right: "-150px",
                            }}>
                                <button onClick={handleCloseAd}>关闭</button>
                            </div>
                        </a>
                    )}
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column", // 垂直排列元素
                        fontFamily: "Arial, sans-serif",
                        fontSize: "18px",
                        color: "#333",
                        backgroundColor: "#f0f0f0",
                        padding: "100px",
                        borderRadius: "5px",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                        textAlign: "center",
                        maxWidth: "500px"
                    }}>
                        <p>还在为寻找点名APP而烦恼？还在为没有广告而担忧？在线随机点名APP，是你的不二选择！</p>
                        <a href="/login" style={{ marginTop: "20px", textDecoration: "none", color: "#007bff" }}>现在登录！</a>
                    </div>
                </div>
            )
        },
        // 添加其他页面的路由配置
        {
            path: "/login",
            element: <Login />
        },
        {
            path: "/callroll",
            element: <CallRoll />
        },
        {
            path: "/courses",
            element: <Courses />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/add",
            element: <AddCourseForm />
        }
    ];

    const router = createBrowserRouter(routes);

    return <RouterProvider router={router} />;
}

export default App;
