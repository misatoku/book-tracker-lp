import Bar from "./Bar";
import BigCircle from "./BigCircle";

type FuncIntroductionProps = {
  color: string;
  text1: string;
  text2: string;
  className?: string;
};

export default function FuncIntroduction({
  color,
  text1,
  text2,
  className,
}: FuncIntroductionProps) {
  return (
    <div className="relative flex flex-col">
      <div className="absolute top-20 left-22">
        <p>
          <Bar text={text1} />
        </p>
      </div>
      <p>
        <BigCircle text={text2} color={color} className={className || ""} />
      </p>
    </div>
  );
}
