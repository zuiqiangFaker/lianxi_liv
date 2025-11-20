import { Button } from 'antd'
export default function Login() {
//   const navigate = useNavigate()

  const handleLogin = () => {
    // localStorage.setItem("token", "abc123")
    // navigate("/")
    console.log('登录');
    
  }

  return (
    <div className="flex items-center justify-center">
      <Button type="primary" onClick={handleLogin}>登录</Button>
    </div>
  )
}