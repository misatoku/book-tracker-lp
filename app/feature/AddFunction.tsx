"use client"; // クライアント側(ブラウザ)で動かします！
// useState,useEffect,window.addEventListenerはブラウザでしか動かない
// SSR(Sever Side Rendering)→CSR(Client Side Rendering)

// useState: 値によって変わる画面状態の管理
// useEffect: 画面を表示した後に実行したい処理。
// useRef: 画面には表示しないけど保持しておきたい値を入れておく。"値が変わっても再レンダリングしない"
import { useState, useEffect, useRef } from "react";
// motion: 動く本体。これが無いとAnimatePresenceも動かない
// AnimatePresence: 要素の動き方を決める
import { motion, AnimatePresence } from "framer-motion";
import AddSection, { AddSectionProps } from "../components/AddSection";

export default function AddFunction() {
  const [current, setCurrent] = useState(0); // 今いるセクションの番号を保持
  const [direction, setDirection] = useState(1); // アニメーションの方向　1 → 下　-1 → 上

  // useRefで画面には関係ないけど記憶しておきたい"状態"を記憶する
  const isAnimating = useRef(false); // アニメーション中か
  const accumulatedDelta = useRef(0); // スクロールの量を集計
  const edgeDelta = useRef(0); // 上限に達した時にどのくらいスクロールを溜めたか。edge:端, delta:スクロール量
  const currentRef = useRef(0); // "最新"のcurrentを保持
  const isInView = useRef(false); // 画面に入ったか
  const wrapperRef = useRef<HTMLDivElement>(null); // HTMLDivElemnt: div専用の型　→divごと要素を格納できる

  const THRESHOLD = 100; // スクロール量が100を越えたら次にいく
  const EDGE_THRESHOLD = 200;

  const addSection1: AddSectionProps = {
    // コンポーネントから表示する内容をオブジェクト化。定義した型に合わせる
    // text, number, description, imgで定義する
    // descriptionとimgはReact.Nodeで型定義したのでタグごと渡せる
    text: "バーコードを読み込んで本を登録",
    number: 1,
    description: (
      <p className="pt-10 whitespace-pre-line text-xl">
        バーコードを読み取るだけで本を素早く登録できる機能
        <br />
        手入力なしで記録がスムーズになります。
      </p>
    ),
    img: (
      <img
        src="/img/readcode.png"
        alt="readcode"
        style={{ width: "400px", height: "auto" }}
      />
    ),
  };

  const addSection2: AddSectionProps = {
    text: "本のタグ",
    number: 2,
    description: (
      <p className="pt-10 whitespace-pre-line text-xl">
        ユーザが自由に本のタグを付与し、
        <br />
        分野別に整理できる機能。
        <br />
        自分だけのカテゴリで本棚を構築でき、
        <br />
        検索性・管理性が大きく向上します。
      </p>
    ),
    img: (
      <img
        src="/img/tag.png"
        alt="tag"
        style={{ width: "300px", height: "auto" }}
      />
    ),
  };

  const addSection3: AddSectionProps = {
    text: "カレンダー",
    number: 3,
    description: (
      <p className="pt-10 whitespace-pre-line text-xl">
        その日の読破量に応じて色が変わる可視化機能。
        <br />
        読書の習慣やペースを一目で把握でき、
        <br />
        毎日のモチベーション維持にもつながります。
      </p>
    ),
    img: (
      <img
        src="/img/calendar.png"
        alt="calendar"
        style={{ width: "170px", height: "auto" }}
      />
    ),
  };

  // 上でオブジェクト化したセクションを配列化。これによってaddSectionList[current]で現在のセクションを取得できる
  const addSectionList = [addSection1, addSection2, addSection3];

  // currentが変更されたときにcurrentRefに同期する
  // 関数が古いcurrentを覚えたままになってしまうこと→stale closureという
  // render後に実行する処理を書く場所。アロー関数(()=>{})
  // useEffect(関数、依存配列): 第一引数で「何をするか」。第二引数で「何が変わったらするか」。
  useEffect(() => {
    currentRef.current = current; // Ref.currentはrenderと関係なく最新値を保持できる
  }, [current]);

  // scrollイベントでこのコンポーネントが画面内かどうかだけ管理
  // passive:true なのでブラウザのスクロール処理を邪魔しない
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return; // そのまま。tiking(処理中)ならreturn(返す)。連打防止。

      ticking = true; // フラグで今処理中を提示

      // スクロールの量を描画タイミングでまとめて計算する
      requestAnimationFrame(() => {
        const el = wrapperRef.current;
        if (!el) {
          ticking = false;
          return;
        }

        const rect = el.getBoundingClientRect(); // 要素の位置を取得。DOMRectによって要素の位置とサイズを受け取る
        const reached = rect.top <= 0 && rect.bottom > 0; // コンポーネントがtopより下、bottomより上、つまり画面内にいるか判定する

        if (reached !== isInView.current) {
          isInView.current = reached;
          if (!reached) {
            setCurrent(0);
            currentRef.current = 0;
            isAnimating.current = false;
            accumulatedDelta.current = 0;
            edgeDelta.current = 0;
          }
        }

        ticking = false;
      });
    };

    // scrollをしたらhandleScrollを呼びます！
    window.addEventListener("scroll", handleScroll, { passive: true }); // {passive: true} スクロールを邪魔しません。
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll); // もう呼びません！
  }, []); // 第二引数空配列

  // wheelリスナーをwrapperRefのdivにつける
  // → passive:false の影響がこのdivの範囲だけに限定されるので画面全体が重くならない
  // → w-screen で横幅全体をカバーしてどこでスクロールしても反応する
  useEffect(() => {
    const el = wrapperRef.current; // wrapperRefのdivでelを定義
    if (!el) return; // elじゃなかったら何も返さない

    const handleWheel = (e: WheelEvent) => {
      // このコンポーネントが画面内にいない場合は何もしない
      if (!isInView.current) return;

      const goingDown = e.deltaY > 0; // 下にスクロール
      const goingUp = e.deltaY < 0; // 上にスクロール

      // アニメーション中は必ずページ移動を止める
      if (isAnimating.current) {
        e.preventDefault(); // 画面遷移のスクロールを止める
        accumulatedDelta.current = 0; // 今のスクロール量を0に戻す
        edgeDelta.current = 0; // 端まで行った後の溜まったスクロール量をリセット
        return; // 何も返さない
      }

      const atLast = currentRef.current >= addSectionList.length - 1; // 今いる場所は配列の数よりも少なくならない
      const atFirst = currentRef.current <= 0; // 最初のページは配列の先頭なので要素番号は0以下

      // 下にスクロールして下まで行ったら||上で上まで行ったら
      if ((goingDown && atLast) || (goingUp && atFirst)) {
        edgeDelta.current += Math.abs(e.deltaY); // 端まで行ったあとのスクロールを加算していく
        // ある一定の値を越えたら
        if (edgeDelta.current >= EDGE_THRESHOLD) {
          edgeDelta.current = 0; // 端に行った後に加算してたスクロール量をリセット
          accumulatedDelta.current = 0; // 普通にスクロール量をリセット
          return; // preventDefaultしないのでページ移動する
        }
        e.preventDefault(); // アニメーションのスクロールから通常のページスクロールに戻る
        return;
      }

      e.preventDefault(); // 普通のスクロールに戻って
      edgeDelta.current = 0; // アニメーションのスクロールもリセットして
      accumulatedDelta.current += e.deltaY; // ページスクロールに加算していく

      // スクロール量を監視して、一定量越えたら現在表示中のセクションを前後に切り替える実装
      if (accumulatedDelta.current >= THRESHOLD) {
        accumulatedDelta.current = 0; // スクロール量をリセットして
        // 現在表示中のindexを更新してる。prev:
        setCurrent((prev) => {
          // Math.min(prev+1,add.len-1)でprev+1とadd.len-1を比べて小さいほうを次に表示する
          // add.len-1で配列の最後の要素を指してる
          // prev+1で次の配列の要素を指してる
          // 上の二つを比べることで配列以上の要素を指すことがないようにしてる（範囲制限(clamp)）
          const next = Math.min(prev + 1, addSectionList.length - 1);
          setDirection(1); // 下スクロールで次のセクションへ
          isAnimating.current = true; // 今アニメーション中
          return next; // currentを更新
        });
      } else if (accumulatedDelta.current <= -THRESHOLD) {
        accumulatedDelta.current = 0;
        setCurrent((prev) => {
          const next = Math.max(prev - 1, 0); // 今度は下に行きすぎないように大きいほうを返す
          setDirection(-1); // 上スクロールで前のセクションへ
          isAnimating.current = true;
          return next;
        });
      }
    };

    // {passive: false}: スクロールをこっちで制御するからブラウザで画面スクロールしないで
    // addEventListener: この出来事が起きたらこの関数を実行して！→　→　→　↓
    el.addEventListener("wheel", handleWheel, { passive: false }); // el上でwheel(スクロール)されたらhandleWheel(すぐ上に書いてある処理)を呼んでね。
    // return () =>: 後付け関数()を返す
    return () => el.removeEventListener("wheel", handleWheel); // removeEventListenerでスクロールをもう受け取らないようにする
  }, [addSectionList.length]); // addSectionList.lengthが変わった時だけ、このuseEffectをやり直す

  // アニメーションの設計図（状態ごとの見た目を管理する）←variantsのすごいところ
  const variants = {
    // 入ってくる時
    enter: (dir: number) => ({
      y: dir > 0 ? 80 : -80, // 三項演算子(条件式 ? trueの時 : falseの時)
      opacity: 0, // 消えてる状態からスタート
    }),
    // 表示中
    center: {
      y: 0,
      opacity: 1, // 完全表示
    },
    // 消えるとき
    exit: (dir: number) => ({
      y: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
  };

  return (
    <div
      ref={wrapperRef} // このセクション全体のDOMを取得して、アニメーションを制御するために使ってる
      className="grid h-screen w-full overflow-hidden bg-white"
    >
      {/* 背景：高さを固定 */}
      <div className="col-start-1 row-start-1 z-0 flex h-screen w-full justify-between pointer-events-none">
        <div className="w-70 h-70 -ml-35 -mt-35 rounded-full bg-orange-500" />

        <div className="w-[600px] h-[350px] rounded-bl-[600px_350px] bg-orange-500" />
      </div>

      {/* 中身：高さを固定 */}
      <div className="col-start-1 row-start-1 ml-20 z-10 flex h-screen w-full flex-col px-20 pt-24">
        <p className="font-bold text-3xl text-orange-500">今後追加予定の機能</p>

        <div className="mt-10 h-full w-full overflow-hidden">
          <AnimatePresence
            custom={direction}
            mode="wait"
            onExitComplete={() => {
              isAnimating.current = false;
              accumulatedDelta.current = 0;
              edgeDelta.current = 0;
            }}
          >
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-full w-full"
            >
              <AddSection {...addSectionList[current]} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
