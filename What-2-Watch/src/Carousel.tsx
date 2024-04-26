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

  if (deckQuery.error || cardsQuery.error)
    return <div>There was an error fetching the data!</div>;

  if (deckQuery.isLoading || cardsQuery.isLoading)
    return <div>DATA IS LOADING.....</div>;

  function newCard() {
    cardsQuery.refetch();
  }

  const checkCards =
    cardsQuery.data &&
    cardsQuery.data.cards &&
    cardsQuery.data.cards.length > 0;

  return (
    <div className="flex flex-col items-center justify-center bg-slate-700">
      <div className="p-10">
        {checkCards ? (
          <img src={`${cardsQuery.data.cards[0].image}`} alt="pulled card" />
        ) : (
          <h1>out of cards!</h1>
        )}
      </div>
      <button onClick={newCard} className="bg-slate-500 p-3 rounded">
        NEW CARD
      </button>
    </div>
  );
}
