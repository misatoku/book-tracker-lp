"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddSection, { AddSectionProps } from "../components/AddSection";

export default function AddFunction() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const isAnimating = useRef(false);
  const accumulatedDelta = useRef(0);
  const edgeDelta = useRef(0);
  const currentRef = useRef(0);
  const isInView = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const THRESHOLD = 100;
  const EDGE_THRESHOLD = 200;

  const addSection1: AddSectionProps = {
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

  const addSectionList = [addSection1, addSection2, addSection3];

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  // scrollイベントでこのコンポーネントが画面内かどうかだけ管理
  // passive:true なのでブラウザのスクロール処理を邪魔しない
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const el = wrapperRef.current;
        if (!el) {
          ticking = false;
          return;
        }

        const rect = el.getBoundingClientRect();
        const reached = rect.top <= 0 && rect.bottom > 0;

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

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // wheelリスナーをwrapperRefのdivにつける
  // → passive:false の影響がこのdivの範囲だけに限定されるので画面全体が重くならない
  // → w-screen で横幅全体をカバーしてどこでスクロールしても反応する
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // このコンポーネントが画面内にいない場合は何もしない
      if (!isInView.current) return;

      const goingDown = e.deltaY > 0;
      const goingUp = e.deltaY < 0;

      // アニメーション中は必ずページ移動を止める
      if (isAnimating.current) {
        e.preventDefault();
        accumulatedDelta.current = 0;
        edgeDelta.current = 0;
        return;
      }

      const atLast = currentRef.current >= addSectionList.length - 1;
      const atFirst = currentRef.current <= 0;

      // 端に達している場合はEDGE_THRESHOLDを超えたらページ移動に流す
      if ((goingDown && atLast) || (goingUp && atFirst)) {
        edgeDelta.current += Math.abs(e.deltaY);
        if (edgeDelta.current >= EDGE_THRESHOLD) {
          edgeDelta.current = 0;
          accumulatedDelta.current = 0;
          return; // preventDefaultしないのでページ移動する
        }
        e.preventDefault();
        return;
      }

      e.preventDefault();
      edgeDelta.current = 0;
      accumulatedDelta.current += e.deltaY;

      if (accumulatedDelta.current >= THRESHOLD) {
        accumulatedDelta.current = 0;
        setCurrent((prev) => {
          const next = Math.min(prev + 1, addSectionList.length - 1);
          setDirection(1);
          isAnimating.current = true;
          return next;
        });
      } else if (accumulatedDelta.current <= -THRESHOLD) {
        accumulatedDelta.current = 0;
        setCurrent((prev) => {
          const next = Math.max(prev - 1, 0);
          setDirection(-1);
          isAnimating.current = true;
          return next;
        });
      }
    };

    // windowではなくdivにpassive:falseでつける
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [addSectionList.length]);

  const variants = {
    enter: (dir: number) => ({
      y: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      y: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
  };

  return (
    <div
      ref={wrapperRef}
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
