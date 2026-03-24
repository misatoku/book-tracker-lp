export default function Trigger() {
  return (
    <>
      <div className="min-h-screen bg-orange-500">
        <div className="flex justify-between">
          <div className="mt-35 -ml-15">
            <div className="w-50 h-50 bg-white rounded-full" />
            <div className="-mt-25 w-50 h-100 bg-white" />
          </div>

          <div className="flex flex-col mt-50 -ml-10">
            <p className="text-white text-4xl font-bold">きっかけ</p>
            <div className="flex flex-col mt-15 gap-10">
              <p className="text-white text-xl whitespace-pre-line">
                本を読みたいけど、
                <br />
                読書習慣がなくてなかな気が向かない。。。
              </p>
              <p className="text-white text-xl">
                読書の記録をどこかにまとめておきたい。。。
              </p>
              <p className="text-white text-xl">
                読み途中の本が溜まってしまっている。。。
              </p>
              <p className="text-white text-xl whitespace-pre-line">
                だいぶ前に借りて読んだあの本
                <br />
                なんてタイトルだっけ。。。。
              </p>
            </div>
          </div>
          <div className="flex flex-col mt-10">
            <div className="w-150 h-150 bg-white rounded-full" />
            <div className="-mt-75 w-150 h-75 bg-white" />
            <p className="text-orange-500 text-4xl leading-loose font-[500] -mt-95 text-center whitespace-pre-line">
              こんな悩みを
              <br />
              解決したいと思い
              <br />
              開発に着手しました。
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
