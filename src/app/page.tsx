import Cars from "./components/Cars";
import Filter from "./components/Filter";
import Header from "./components/Header"

export default function Home() {
  return (
    <div className="grid grid-rows-[min-content] h-full">
      <Header />
      <div className="grid grid-cols-[min-content_auto]">
        <Filter />
        <Cars />
      </div>
    </div>
  );
}
