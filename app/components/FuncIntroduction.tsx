import Bar from "./Bar";
import BigCircle from "./BigCircle";

type Props = {
  color: string;
  text1: string;
  text2: string;
};

export default function FuncIntroduction(props: Props) {
  return (
    <div className="relative flex flex-col">
      <p className="absolute top-20 left-22">
        <Bar text={props.text1} />
      </p>

      <p>
        <BigCircle text={props.text2} color={props.color} />
      </p>
    </div>
  );
}
