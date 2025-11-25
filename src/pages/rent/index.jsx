import style from "./rent.module.css";
import { Select } from "antd";
import { useState, useEffect } from "react";
import { rentList } from "@/api/api.js";
const options = [
  { label: "TPI", value: "TPI_desc", icon: "icon-paixu" },
  { label: "TPI", value: "TPI_asc", icon: "icon-xiangshang" },
  { label: "LVL", value: "LVL_desc", icon: "icon-paixu" },
  { label: "LVL", value: "LVL_asc", icon: "icon-xiangshang" },
];
export default function Renting() {
  const [value, setValue] = useState(options[0].value);
  const [data, setData] = useState([]);
  useEffect(() => {
    getRentData();
  }, []);
  const getRentData = async () => {
    try {
      const res = await rentList();
      console.log(20, res);

      setData(res.data);
    } catch (error) {
      console.error("接口请求失败:", error);
    }
  };
  const handleChange = (val) => {
    setValue(val);
    console.log("selected:", val);
  };
  return (
    <>
      <div className="h-100vh relative">
        <div className="px-[120px]  mx-auto my-[80px] min-h-[calc(100vh-325px)]">
          <div className="flex items-center justify-between">
            <span className="text-[24px] font-weight-[500]">Renting (0)</span>

            <Select
              value={value}
              onChange={handleChange}
              style={{ width: 120 }}
              optionLabelProp="labelForDisplay" // 用于自定义展示
            >
              {options.map((item) => (
                <Select.Option
                  value={item.value}
                  key={item.value}
                  labelForDisplay={
                    <div className="flex items-center">
                      <span>{item.label}</span>
                      <span
                        className={`iconfont ml-1 ${item.icon} !text-[14px]`}
                      ></span>
                    </div>
                  }
                >
                  <div className="flex items-center">
                    <span>{item.label}</span>
                    <span className={`iconfont ml-1 ${item.icon}`}></span>
                  </div>
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    </>
  );
}
