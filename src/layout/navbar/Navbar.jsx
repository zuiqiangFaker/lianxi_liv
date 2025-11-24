import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Dropdown, Space } from "antd";

// 图片（路径按你项目调整）
import default_avatar from "@/assets/images/default_avatar.png";
import profileIcon from "@/assets/images/ProfileIcon.png";
import logOutIcon from "@/assets/images/LogOutIcon.png";
import back_icon from "@/assets/images/back_icon.png";

// store 替代示例（你后续可换成 Redux/Zustand）
const mockStore = {
  token: "mock-token",
  collapsed: false,
  sidebarHovered: false,
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const token = mockStore.token;
  const isCollapsed = mockStore.collapsed;
  const sidebarHovered = mockStore.sidebarHovered;

  const items = [
    {
      key: "1",
      label: "Personal Center",
    },
    {
      key: "2",
      label: "Log out",
    },
  ];
  // 计算菜单图标 class 逻辑
  const menuIconClass = useMemo(() => {
    if (isCollapsed) {
      return sidebarHovered ? "icon-caidan" : "icon-caidan_shou";
    }
    return "icon-caidan";
  }, [isCollapsed, sidebarHovered]);

  // 是否显示返回按钮
  const isShowBack = location.pathname.includes("details");

  const toggleSidebar = () => {
    console.log("toggleSidebar");
  };

  const popoverHandler = (type) => {
    if (type === "profile") {
      navigate("/personalCenter");
    } else if (type === "logout") {
      console.log("执行 logout");
      navigate("/login");
    }
    setPopoverOpen(false);
  };

  const backHandler = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-between  h-full">
      {/* 左侧菜单 */}
      <div className="flex items-center ">
        <span
          className={`iconfont !text-[22px] text-[#7F7FBE] cursor-pointer hover:text-[#BABAFF] ${menuIconClass}`}
          onClick={toggleSidebar}
        />

        {/* {isShowBack && (
          <>
            <div className="line w-[1px] h-full bg-[#7474AA51] mx-6" />
            <div
              className="flex items-center cursor-pointer"
              onClick={backHandler}
            >
              <img className="w-[16px] h-[15px]" src={back_icon} alt="" />
              <span className="ml-2 text-[14px] text-[#7F7FBE]">Back</span>
            </div>
          </>
        )} */}
      </div>

      {/* 右侧头像 + Popover */}
      <div className="flex items-center">
        <Dropdown menu={{ items }}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <img
                className="ml-4 w-[40px] h-[40px] rounded-full border border-[#7474aa52] cursor-pointer"
                src={default_avatar}
                alt=""
              />
            </Space>
          </a>
        </Dropdown>
      </div>
      {/* <div className="relative flex items-center"> */}
      {/* {token && (
          <img
            className="ml-4 w-[40px] h-[40px] rounded-full border border-[#7474aa52] cursor-pointer"
            src={default_avatar}
            alt=""
            onMouseEnter={() => setPopoverOpen(true)}
            onMouseLeave={() => setPopoverOpen(false)}
          />
        )} */}

      {/* {isPopoverOpen && (
          <div
            className="absolute top-[48px] right-0 !w-[136px] !min-w-[136px] !px-2 bg-[#1e1d3b] 
            rounded-md shadow-lg py-2 text-[#fff] text-[12px]"
            onMouseEnter={() => setPopoverOpen(true)}
            onMouseLeave={() => setPopoverOpen(false)}
          >
            <div className="flex items-center cursor-pointer" onClick={() => popoverHandler("profile")}>
              <img src={profileIcon} className="w-[16px] h-[16px] mr-1" alt="" />
              <span>Personal Center</span>
            </div>

            <div className="h-[1px] w-full bg-[#FFFFFF28] my-3"></div>

            <div className="flex items-center cursor-pointer" onClick={() => popoverHandler("logout")}>
              <img src={logOutIcon} className="w-[16px] h-[16px] mr-1" alt="" />
              <span>Log out</span>
            </div>
          </div>
        )} */}

      {/* </div> */}
    </div>
  );
};

export default Header;
