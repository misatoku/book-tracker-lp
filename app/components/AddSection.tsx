import PillShapedBox from "./PillShapedBox";

export type AddSectionProps = {
  text: string; // こっちは中身だけ
  number: number;
  description: React.ReactNode; //これでタグごと受け渡せる
  img: React.ReactNode;
};

export default function AddSection(props: AddSectionProps) {
  return (
    <div className="grid grid-cols-[420px_1fr] items-start gap-10">
      <div className="flex flex-col">
        <div className="flex items-center gap-6">
          <PillShapedBox number={props.number} text={props.text} />
        </div>

        <div className="mt-8">{props.description}</div>
      </div>

      <div className="flex justify-center pt-16 pr-20">{props.img}</div>
    </div>
  );
}
