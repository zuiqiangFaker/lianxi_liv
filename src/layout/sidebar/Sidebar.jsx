import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "antd";
import styles from "./Sidebar.module.css";

import logo from "@/assets/images/ILV_logo.png";
import logoTitle from "@/assets/images/ILV_title.png";

const { Sider } = Layout;

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // 折叠状态：可根据全局状态管理替换
  const [collapsed, setCollapsed] = useState(false);
  const [hoverExpanded, setHoverExpanded] = useState(false);

  const active = location.pathname.replace("/", "");

  const shouldExpand = !collapsed || hoverExpanded;

  const menu = [
    { name: "ranting", label: "Renting", icon: "icon-jieshouku_receive" },
    { name: "sharing", label: "Sharing", icon: "icon-fenxiang_sharing" },
  ];

  return (
    <Sider
      width={shouldExpand ? 200 : 80}
      className="bg-[#0e0c1d] h-screen border-r border-[#7474AA51] transition-all duration-300 overflow-hidden"
      onMouseEnter={() => collapsed && setHoverExpanded(true)}
      onMouseLeave={() => collapsed && setHoverExpanded(false)}
    >
      {/* LOGO区域 */}
      <div className="h-[80px] flex items-center pl-6 cursor-pointer" onClick={() => navigate("/")}>
        <img className="w-[32px] h-[32px]" src={logo} alt="" />
        <img
          className={`w-[60px] h-[16px] ml-4 transition-opacity duration-300 ${
            shouldExpand ? "opacity-100" : "opacity-0"
          }`}
          src={logoTitle}
          alt=""
        />
      </div>

      {/* 菜单区域 */}
      <nav className="pt-6 flex-1">
        <ul>
          {menu.map((item) => (
            <li
              key={item.name}
              onClick={() => navigate("/" + item.name)}
              className={`relative flex items-center py-5 px-6 text-[14px] cursor-pointer transition-colors duration-200 my-2 ${
                active === item.name
                  ? "bg-[#14122BFF] text-white"
                  : "text-[#FFFFFF99] hover:bg-[#14122BFF]"
              } ${!shouldExpand ? "justify-center" : ""}`}
            >
              {/* 左侧选中条 */}
              <span
                className={`absolute left-0 h-full w-[4px] rounded-r ${
                  active === item.name
                    ? "bg-[#6365FF] opacity-100"
                    : "opacity-0"
                }`}
              />

              {/* 光圈背景 */}
              {active === item.name && (
                <span
                  className={styles.circleGlow}
                />
              )}

              {/* 图标 */}
              <span className={`iconfont ${item.icon} text-[24px] z-10`} />

              {/* 文本 */}
              <span
                className={`whitespace-nowrap transition-all overflow-hidden duration-300 ${
                  shouldExpand ? "opacity-100 ml-3" : "opacity-0 w-0"
                }`}
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </Sider>
  );
}
