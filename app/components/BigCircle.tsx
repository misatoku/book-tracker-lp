type Props = {
  color: string;
  text: string;
};

export default function BigCircle(props: Props) {
  return (
    <div
      className={`w-100 h-100 flex justify-center items-center pt-5 rounded-full ${props.color}`}
    >
      <p className="text-center text-black text-xl whitespace-pre-line">
        {props.text}
      </p>
    </div>
  );
}
