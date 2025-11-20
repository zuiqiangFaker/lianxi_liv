import { get, post } from "./http.js";

let url = import.meta.env.VITE_BASEURL;
// let url = 'https://api-dev.ishare.games';
//身份认证 - 获取签名内容
export const getNonce = (params) => get(url + "/login/getNonce", params);
// 身份认证 -登录
export const login = (params) => post(url + "/login/login", params);
// 身份认证 - 退出登录
export const logout = (params) => post(url + "/login/loginOut", params);
// 分享模块 - 用户列表
export const playerList = (params) => get(url + "/share/playerList", params);
// 首页 - 可借列表
export const borrowList = (params) => get(url + "/index/borrowList", params);
// 内页 - 内页基础信息
export const basicInfo = (token_id) => get(url + `/asset/basic/${token_id}`);
// 内页 - 内页owner
export const ownerInfo = (token_id) => get(url + `/asset/wallet/${token_id}`);
// 内页 - 内页可借
export const assetBorrow = (token_id) => get(url + `/asset/borrow/${token_id}`);
// 用户 - 用户信息
export const userInfo = (params) => get(url + "/user/info", params);
// 用户 - owner列表
export const ownerList = (params) => get(url + "/user/ownerList", params);
// 用户 - unlock 列表
export const unlockList = (params) => get(url + "/user/unlockList", params);
// 用户 - fostered  列表
export const userFosteredList = (params) => get(url + "/user/fosteredList", params);
// 用户 - rent 列表
export const userRentList = (params) => get(url + "/user/rentList", params);
// 用户 - 绑定hash
export const queueHash = (params) => post(url + "/user/queueHash", params);
// 用户 - 查询交易状态
export const checkHash = (params) => get(url + "/user/checkHash", params);
// 租用模块 - 租用列表
export const rentList = (params) => get(url + "/rent/list", params);
// 分享模块 - 分享列表
export const shareList = (params) => get(url + "/share/list", params);
// 分享模块 - 可分享怪列表
export const shareableList = (params) => get(url + "/share/shareableList", params);
// 用户 - 编辑资料
export const userEdit = (token_id, params) => post(url + `/user/edit/${token_id}`, params);
// 内页 - 内页分享列表
export const assetShareList = (token_id) => get(url + `/asset/share/${token_id}`);
// 分享模块 - 需求列表
export const preferenceList = (params) => get(url + `/share/preferenceList`, params);
// 消息 - 1、未读消息列表
export const messageList = (params) => get(url + `/message/list`, params);
// 消息 - 2、设置已读
export const messageRead = (params) => post(url + `/message/read`, params);
