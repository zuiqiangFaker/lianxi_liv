import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { Provider } from "react-redux";
import { store } from "./store";
import "./index.css";
import 'antd/dist/reset.css'; // AntD 组件基础样式
import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'
import "@/assets/icon/iconfont.css";
import "@/assets/icon/iconfont.js";

import { injectStore } from './api/http'; // 导入注入函数

//在 store 创建完成后，注入到 request 模块
injectStore(store);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
