import FirstView from "./feature/FirstView";
import Function from "./feature/Function";

// このサイトを大きく分けた感じ（コンポーネント）
// 表紙（ファーストビュー）、ファンクション、技術スタック（テクノロジースタック）、きっかけ、ネクストアクション、フッター
// コンポーネントに分けてそのことしか書かない
// それぞれをインポートして記述するからどこに何が書いてあるかわかりやすい
// 二つ以上同じ記述したらコンポーネントで書く

// ブランチはファーストビューを作りきるブランチ（feat/first-view）
// 細かすぎるとめんどい、大きすぎるとチェックが大変

export default function Home() {
  return (
    <>
      <main className="w-full">
        <section className="overflow-hidden min-h-screen w-full">
          <FirstView />
        </section>
        <section className="min-h-screen w-full">
          <Function />
        </section>
      </main>
    </>
  );
}
// コンポーネントにして　細かく書く
// コンポーネントフォルダに書いてインポートしていく
// featureフォルダ作ってほとんどをそこに記述してpage.tsxにインポートする形で書く
// 使いまわすなら全部ファイル分けして全部インポートして持ってくる
// ページ一個をコンポーネントにしていく
// テキストをコンポーネントにしてもいい。テキストに名前を付ける
// カラーコードに名前つけて指定する
// 機能1,2,3のUI一緒にしてもいいかも。もう、Webページみたいにいろいろ変えていいよ
