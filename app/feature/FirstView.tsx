export default function FirstView() {
  return (
    <>
      <div className="relative min-h-screen w-full overflow-hidden">
        <div className="pl-25 pt-45 flex-col w-150 h-150 rounded">
          <h1 className="text-4xl">読書管理アプリ</h1>
          <h1 className="text-7xl text-orange-500">Book Tracker</h1>
          <div className="mt-30">
            <h1 className="text">理工学部 コンピュータ科学専攻 2年 澤野そら</h1>
            <h1 className="text">理工学部 コンピュータ科学専攻 1年 桑原美智</h1>
          </div>
        </div>

        {/*左上の穴あきマル*/}
        <div className="absolute -top-30 -left-30 w-72 h-72 rounded-full border-[50px] border-orange-500" />
        {/*右下大マル*/}
        <div className="absolute -right-40 -bottom-48 w-[520px] h-[520px] rounded-full bg-orange-500" />
        {/*ちっちゃいマル*/}
        <div className="absolute top-45 right-120 w-20 h-20 bg-orange-500 rounded-full" />
      </div>
    </>
  );
}

// 左上穴あきマル
// 右下大マル

/* padding merginで位置を調節する */
// 基本absoluteは使わない。絶対的な位置をcomponentとかで使いたいときだけ
// 画像で張っちゃったら変にはみ出なくていいかも
// justify-betweenで両端。gapで調節
// もの同士の感覚で調節する。（絶対値じゃなくて）
// 基本重くならないように写真とかをimportする
// 重なるところは重ねてcomponentとして使うか、重ねないように置くか
// 勇者todoもpadding,merginに変更済み
