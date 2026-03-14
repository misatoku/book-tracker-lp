type PillShapedBoxProps = {
  text: string;
  number: number;
};

export default function PillShapedBox({ text, number }: PillShapedBoxProps) {
  return (
    <div className="flex w-120 h-25 bg-white gap-5">
      <div className="flex w-25 h-25 rounded-tr-4xl rounded-bl-4xl bg-orange-500 justify-center items-center text-white text-5xl">
        {number}
      </div>
      <div className="flex h-25 items-center text-xl font-bold">{text}</div>
    </div>
  );
}
