type BarProps = {
  text: string;
};

export default function Bar({ text }: BarProps) {
  return (
    <div className="flex justify-center items-center w-55 h-10 rounded-xl bg-orange-500 text-white text-2xl">
      <p className="text-center">{text}</p>
    </div>
  );
}
