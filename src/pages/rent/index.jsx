import style from "./rent.module.css";
export default function Renting() {
  return (
    <>
      <div className="h-100vh relative">
        {/* <div className={style.bgImg}></div>
        <div className={style.bgImg2}></div> */}
        <div className="px-[120px]  mx-auto my-[80px] min-h-[calc(100vh-325px)]">
            <div className="flex items-center justify-between">
                 <span className="text-[24px] font-weight-[500]">Renting (0)</span>
            </div>
        </div>
      </div>
    </>
  );
}
