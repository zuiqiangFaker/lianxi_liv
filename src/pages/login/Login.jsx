import styles from "./Login.module.css";
import Button from "@/components/Button/index";
import Logo from "@/assets/images/login_Logo.png";
import logoTitle from "@/assets/images/login_title.png";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAsync } from "@/store/counterSlice.js";
export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await dispatch(loginAsync());
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
  };

  return (
    <>
      <div className={styles.bgImg}>
        <div className="flex flex-col justify-center items-center h-screen">
          <img className="w-[96px] h-[96px]" src={Logo} alt="" />
          <img
            className="w-[107px] h-[30px] mt-[24px] mb-[48px]"
            src={logoTitle}
            alt=""
          />
          <Button type="primary" onClick={handleLogin}>
            Log in with your address
          </Button>
        </div>
      </div>
    </>
  );
}
