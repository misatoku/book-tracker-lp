import FirstView from "./feature/FirstView";
import Function from "./feature/Function";
import TechStuck from "./feature/TechStuck";

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
      </main>
    </>
  );
}
