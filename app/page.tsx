import FirstView from "./feature/FirstView";
import Function from "./feature/Function";
import TechStuck from "./feature/TechStuck";
import Trigger from "./feature/Trigger";
import AddFunction from "./feature/AddFunction";

export default function Home() {
  return (
    <>
      <main className="w-full">
        <section className="min-h-screen">
          <FirstView />
        </section>
        <section className="min-h-screen">
          <Function />
        </section>
        <section className="min-h-screen">
          <TechStuck />
        </section>
        <div className="bg-orange-500 w-full h-20 mt-3.5" />
        <section className="min-h-screen">
          <Trigger />
        </section>
        <section className="min-h-screen">
          <AddFunction />
        </section>
      </main>
    </>
  );
}
