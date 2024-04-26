import "./index.css";

export default function Heading() {
  return (
    <>
      <div className=" h-14 bg-slate-900 flex justify-between">
        <h1 className="bold text-white font-mono p-5 ">Deck of Cards</h1>
        <span className="bold text-white font-mono p-5  ">Shuffle</span>
      </div>
    </>
  );
}
