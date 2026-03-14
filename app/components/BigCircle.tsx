type BigCircleProps = {
  color: string;
  text: string;
  className: string;
};

export default function BigCircle({ color, text, className }: BigCircleProps) {
  return (
    <div
      className={`w-100 h-100 flex justify-center items-center pt-5 rounded-full ${color} ${className}`}
    >
      <p className="text-center text-black text-xl whitespace-pre-line">
        {text}
      </p>
    </div>
  );
}
