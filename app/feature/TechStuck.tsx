export default function TechStuck() {
  return (
    <>
      <div className="min-h-screen">
        <div className="flex relative">
          <div className="flex flex-col justify-start mt-15 ml-15 z-10">
            <p className="text-5xl font-bold text-orange-500">
              主な技術スタック
            </p>
            <div className="w-25 h-25 bg-orange-500 mt-5 rounded-tr-4xl rounded-tl-4xl rounded-bl-4xl">
              <img
                src="/img/pazzle.png"
                alt="pazzle"
                style={{ width: "65px", height: "auto" }}
                className="pt-4 ml-4"
              />
            </div>
          </div>
          <div className="relative -ml-120 pb-20 -z-10">
            <div className="absolute inset-0 bg-orange-500 w-150 h-150" />
            <div className="absolute inset-0 bg-white w-150 h-150 rounded-bl-full" />
          </div>
          <div className="flex pt-50 ml-110 gap-30 z-10">
            <div className="flex flex-col jsutify-center items-center">
              <p className="font-bold text-3xl text-orange-500">
                フロントエンド
              </p>
              <img
                src="/img/ReactNative+Expo.png"
                alt="ReactNative+Expo"
                style={{ width: "300px", height: "auto" }}
                className="pt-10"
              />
            </div>
            <div className="flex flex-col justify-cener items-center">
              <p className="font-bold text-3xl text-orange-500">バックエンド</p>
              <img
                src="/img/GO.png"
                alt="GO"
                style={{ width: "300px", height: "auto" }}
                className="pt-10"
              />
              <img
                src="/img/PostgreSQL.png"
                alt="PostgreSQL"
                style={{ width: "300px", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
