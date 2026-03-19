import Bar from "../components/Bar";
import PillShapeBox from "../components/PillShapedBox";
import BackGroundCircle from "../components/BackGroundCircle";
import BigCircle from "../components/BigCircle";
import FuncIntroduction from "../components/FuncIntroduction";

export default function Function() {
  return (
    <>
      {/*1ページ目*/}

      <div className="min-h-screen">
        <div className="flex justify-between ">
          <div className="flex flex-col items-start mt-30 ml-30">
            <Bar text="主な機能" />
            <div className="flex flex-col pt-5 gap-3">
              <PillShapeBox number={1} text="登録した本の読書状況別一覧表示" />
              <PillShapeBox
                number={2}
                text="本を読んだ時の「読書ログ」の記録"
              />
              <PillShapeBox number={3} text="本の進捗状況,ログを一目で比較" />
            </div>
          </div>
          <div className="flex flex-col justify-start">
            <div className="w-100 h-100 rounded-bl-full bg-orange-500" />
          </div>
        </div>
      </div>
      {/*2ページ目*/}
      <div className="min-h-screen">
        <div className="flex gap-20 mt-20 ml-30">
          <FuncIntroduction
            color="bg-orange-100"
            text1="機能１"
            text2={`「本」タブで➕ボタンを押し、
                本を登録

              「すべて」「未読」「読み途中」「読破済み」読書状況に応じて登録した本が
              一覧で表示されます。`}
          />

          <img
            src="/img/func1.png"
            alt="func1"
            style={{ width: "500px", height: "auto" }}
          />
        </div>
      </div>
      {/*3ページ目*/}
      <div className="min-h-screen">
        <div className="flex justify-end gap-20 mt-10 mr-30">
          <img
            src="/img/func2.png"
            alt="func2"
            style={{ width: "500px", height: "auto" }}
          />

          <FuncIntroduction
            color="bg-orange-100"
            text1="機能２"
            text2={`「記録」タブで✒️ボタンを押し、
                記録を登録`}
          />
        </div>
      </div>
      {/*4ページ目*/}
      <div className="min-h-screen">
        <div className="flex gap-20 pt-20 ml-30">
          <FuncIntroduction
            color="bg-orange-100"
            text1="機能３"
            text2={`縦・横スクロール可能な
              「トラック」タブで読書の進捗を
              一目で比較`}
          />
          <img
            src="/img/func3.png"
            alt="func3"
            style={{ width: "500px", height: "auto" }}
          />
        </div>
      </div>
    </>
  );
}
