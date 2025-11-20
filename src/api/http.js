// src/utils/request.js
import axios from "axios";
// import store from "@/store";

// import goEasy from "@/utils/goeasy";


// 设置默认超时时间
axios.defaults.timeout = 300000;

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // const token = store.state.token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    }
    return Promise.reject(response);
  },
  (error) => {
    console.log(error);
    try {
      if (error.response && error.response.status === 401) {
        // 登录过期
        // ElMessage({
        //   type: "error",
        //   message: "Login failed",
        // });
        // localStorage.clear();
        // 取消 GoEasy 订阅
        // const userAddress = store.state.userInfo.address;
        // if (userAddress) {
        //   goEasy.pubsub.unsubscribe({
        //     channel: userAddress,
        //     onSuccess: () => console.log("取消订阅成功"),
        //     onFailed: (error) => console.error("取消订阅失败：", error),
        //   });
        // }
        // store.commit("logout");
        // router.push("/login");
      } else if (error.message.includes("timeout")) {
        // ElMessage({
        //   type: "error",
        //   message: "请求超时！",
        //   icon: "CircleCloseFilled",
        // });
      }
      return Promise.reject(error);
    } catch (error) {
      return Promise.reject(error);
    }
  }
);

// GET 请求
export function get(url, params = {}, timeout = axios.defaults.timeout) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        timeout,
      })
      .then((res) => {
        if (res.data.code === 200) {
          resolve(res.data.data);
        } else {
          // ElMessage({
          //   type: "error",
          //   message: res.data.msg || "请求失败",
          // });
          resolve(res.data); // 兼容非 200 情况
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// POST 请求
export function post(url, params = {}, timeout = axios.defaults.timeout) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, { timeout })
      .then((res) => {
        if (res.data.code !== 200) {
          // ElMessage({
          //   type: "error",
          //   message: res.data.msg || "操作失败",
          // });
        }
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
