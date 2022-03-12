import React, { useState } from "react";
import { ICard } from "../../interfaces/interfaces";
import Card from "../Card/Card";
import "./CardList.css";

interface ICardListComponent {
  cards: ICard[];
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  reset(): void;
}

const CardList: React.FC<ICardListComponent> = ({ cards, setCards, reset }) => {
  const [cardsChosen, setCardsChosen] = useState<ICard[]>([]);

  return (
    <div className="CardList">
      {cards.map((a, i) => (
        <Card
          key={i}
          card={a}
          setCards={setCards}
          cardsChosen={cardsChosen}
          setCardsChosen={setCardsChosen}
          reset={() => reset()}
        />
      ))}
    </div>
  );
};

export default CardList;
