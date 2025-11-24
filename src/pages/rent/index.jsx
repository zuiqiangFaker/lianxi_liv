import style from "./rent.module.css";
import { Select } from "antd";
export default function Renting() {
  const options = [
  { label: "TPI", value: "TPI_desc", icon: "icon-paixu" },
  { label: "TPI", value: "TPI_asc", icon: "icon-xiangshang" },
  { label: "LVL", value: "LVL_desc", icon: "icon-paixu" },
  { label: "LVL", value: "LVL_asc", icon: "icon-xiangshang" },
];
  const handleChange = value => {
  console.log(`selected ${value}`);
};
  return (
    <>
      <div className="h-100vh relative">
        <div className="px-[120px]  mx-auto my-[80px] min-h-[calc(100vh-325px)]">
          <div className="flex items-center justify-between">
            <span className="text-[24px] font-weight-[500]">Renting (0)</span>

            <Select
              defaultValue="lucy"
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: "jack", label: "Jack" },
                { value: "lucy", label: "Lucy" },
              ]}
            />
          </div>
        </div>
      </div>
    </>
  );
}
