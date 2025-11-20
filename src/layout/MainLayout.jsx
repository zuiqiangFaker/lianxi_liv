import { Layout, Menu } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const { Sider, Header, Content } = Layout

export default function MainLayout() {

  const navigate = useNavigate()

//   useEffect(() => {
//     const token = localStorage.getItem('token')
//     if (!token) {
//       navigate('/login')
//     }
//   }, [navigate])

  return (
    <Layout className="h-screen">
      <Sider width={200} className="bg-gray-800">
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/">首页</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header className="bg-white shadow px-4 flex justify-between items-center">
          <span className="font-bold text-lg">后台管理系统</span>
          <button
            className="text-red-500"
            onClick={() => {
              localStorage.removeItem('token')
              navigate('/login')
            }}
          >
            退出
          </button>
        </Header>

        <Content className="p-4 overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
