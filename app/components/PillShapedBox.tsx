type Props = {
  text: string;
  number: number;
};

export default function PillShapedBox(props: Props) {
  return (
    <div className="flex w-120 h-25 bg-white gap-5">
      <div className="flex w-25 h-25 rounded-tr-4xl rounded-bl-4xl bg-orange-500 justify-center items-center text-white text-5xl">
        {props.number}
      </div>
      <div className="flex h-25 items-center text-xl font-bold">
        {props.text}
      </div>
    </div>
  );
}
