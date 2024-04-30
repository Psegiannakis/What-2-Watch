import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Carousel1() {
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

  const [hasNewCard, setHasNewCard] = useState(false);

  function newCard() {
    cardsQuery.refetch();
    setHasNewCard(true);
  }

  useEffect(() => {
    if (hasNewCard) {
      const timer = setTimeout(() => {
        setHasNewCard(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasNewCard]);

  const checkCards =
    cardsQuery.data &&
    cardsQuery.data.cards &&
    cardsQuery.data.cards.length > 0;

  if (deckQuery.isLoading || cardsQuery.isLoading)
    return <div className=" h-screen bg-slate-700">DATA IS LOADING.....</div>;

  if (deckQuery.error || cardsQuery.error)
    return <div>There was an error fetching the data!</div>;

  return (
    <div className=" h-screen flex flex-col items-center justify-center bg-slate-700">
      <div
        className={`card-container p-10 ${
          hasNewCard ? "animate-spin-turn" : ""
        }`}
      >
        {checkCards ? (
          <img
            className="main-card"
            src={`${cardsQuery.data.cards[0].image}`}
            alt="pulled card"
          />
        ) : (
          <button
            onClick={reShuffle}
            className="font-bold text-black p-10 cursor-pointer pointer-events-auto "
          >
            OUT OF CARDS!
          </button>
        )}
      </div>
      <button
        onClick={newCard}
        className="font-bold bg-slate-500 p-3 rounded hover:bg-cyan-900 text-white"
      >
        NEW CARD
      </button>
    </div>
  );
}
