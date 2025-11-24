import { Layout } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./navbar/Navbar";
import style from "./MainLayout.module.css"
const { Sider, Header, Content } = Layout;

export default function MainLayout() {
  const navigate = useNavigate();

  //   useEffect(() => {
  //     const token = localStorage.getItem('token')
  //     if (!token) {
  //       navigate('/login')
  //     }
  //   }, [navigate])

  return (
    <div className={style.app_bg} >
      <Layout className="h-screen relative" style={{
          background: 'transparent',
        }}>
        <Sidebar />

        <Layout style={{
          background: 'transparent',
        }}>
          <Header className="sticky top-0 px-[30px] h-[80px] border-b border-[#7474AA51] bg-[#110F2428] lh-1">
            <Navbar />
          </Header>

          <Content className={`overflow-auto text-white ${style.antLayoutContent}`}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}
