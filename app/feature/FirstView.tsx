import BackGroundCircle from "../components/BackGroundCircle";

export default function FirstView() {
  return (
    <>
      <div className="flex justify-between min-h-screen">
        {/*左上の穴あきマル*/}
        <div>
          <div className="w-72 h-60 rounded-br-full bg-orange-500" />
          <div className="pl-50 pt-5">
            <h1 className="text-4xl">読書管理アプリ</h1>
            <h1 className="text-7xl text-orange-500">Book Tracker</h1>
            <div className="mt-5">
              <h1 className="text">
                理工学部 コンピュータ科学専攻 2年 澤野そら
              </h1>
              <h1 className="text">
                理工学部 コンピュータ科学専攻 1年 桑原美智
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          {/*ちっちゃいマル*/}
          <div className="mt-20 w-20 h-20 bg-orange-500 rounded-full" />
          {/*右下大マル*/}
          <BackGroundCircle />
        </div>
      </div>
    </>
  );
}
