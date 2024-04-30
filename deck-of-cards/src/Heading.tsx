import "./index.css";
import { useQuery } from "@tanstack/react-query";

export default function Heading() {
  const deckUrl =
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";

  const deckQuery = useQuery({
    queryKey: ["deck"],
    queryFn: () => fetch(deckUrl).then((res) => res.json()),
  });

  const cardsQuery = useQuery({
    queryKey: ["cards"],
    enabled: !!deckQuery.data,
    queryFn: () => {
      const newDeck = deckQuery.data.deck_id;
      const cardsUrl = `https://deckofcardsapi.com/api/deck/${newDeck}/draw/?count=1`;
      return fetch(cardsUrl).then((res) => res.json());
    },
  });

  function reShuffle() {
    deckQuery.refetch();
    cardsQuery.refetch();
  }

  return (
    <>
      <div className=" h-14 bg-slate-900 flex justify-between">
        <h1 className="bold text-white font-mono p-5 ">Deck of Cards</h1>
        <span
          onClick={reShuffle}
          className="bold text-white font-mono p-5  hover:cursor-pointer hover:animate-pulse hover: "
        >
          Shuffle
        </span>
      </div>
    </>
  );
}
