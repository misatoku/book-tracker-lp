import FirstView from "./feature/FirstView";
import Function from "./feature/Function";
import TechStuck from "./feature/TechStuck";
import Trigger from "./feature/Trigger";

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
        <section className="min-h-screen mt-3.5">
          <Trigger />
        </section>
      </main>
    </>
  );
}
