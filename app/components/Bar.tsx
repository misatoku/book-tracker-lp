type Props = {
  text: string;
};

export default function Bar(props: Props) {
  return (
    <p className="flex justify-center items-center w-55 h-10 rounded-xl bg-orange-500 text-white text-2xl text-center">
      {props.text}
    </p>
  );
}
