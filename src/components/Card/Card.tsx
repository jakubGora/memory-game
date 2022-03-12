import React, { useEffect, useState } from "react";
import { ICard } from "../../interfaces/interfaces";
import "./Card.css";

interface ICardComponent {
  card: ICard;
  setCards: React.Dispatch<React.SetStateAction<ICard[]>>;
  cardsChosen: ICard[];
  setCardsChosen: React.Dispatch<React.SetStateAction<ICard[]>>;
  reset(): void;
}

const Card: React.FC<ICardComponent> = ({
  card,
  setCards,
  cardsChosen,
  setCardsChosen,
  reset,
}) => {
  const [cardL, setCardL] = useState<ICard>(card);
  const refreshIco = require("../../img/update-arrow.png");
  const showCard = () => {
    if (cardL.zawartosc && !cardL.odgadniety && cardsChosen.length < 2) {
      setCardL((prevState) => ({ ...prevState, zakryty: false }));
      setCardsChosen((prev) => [...prev, card]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (cardsChosen.length === 2) {
        if (cardsChosen[0].zawartosc === cardsChosen[1].zawartosc) {
          console.log("b");
          setCards((cards) =>
            cards.map((a) => {
              if (a.zawartosc === cardsChosen[0].zawartosc) {
                return { ...a, odgadniety: true, zakryty: false };
              } else if (a.odgadniety === false) {
                return { ...a, odgadniety: false };
              } else return a;
            })
          );
        } else {
          console.log("a");
          setCards((cards) =>
            cards.map((a) => (a.odgadniety ? a : { ...a, zakryty: true }))
          );
        }

        setCardsChosen([]);
      }
    }, 500);
  }, [cardsChosen]);

  useEffect(() => {
    setCardL(card);
  }, [card]);

  return (
    <div
      onClick={() => showCard()}
      style={{ backgroundImage: `url(${cardL.photo})` }}
      className="Card"
    >
      <div
        style={{
          backgroundColor: `${
            cardL.zakryty
              ? !cardL.zawartosc
                ? "#222222"
                : "#333333"
              : "#00000000"
          }`,
        }}
        className="hide"
      >
        <p
          style={{
            color: `${
              cardL.zakryty ? "rgba(0, 110, 255, 0.973)" : "#00000000"
            }`,
            textShadow: `${
              cardL.zakryty ? "0 0 1rem rgb(0, 110, 255)" : "none"
            }`,
            fontSize: `${!cardL.zawartosc ? "1.6rem" : "1rem"}`,
          }}
        >
          MemoGame
        </p>
        {!cardL.zawartosc ? (
          <div onClick={() => reset()}>
            <img src={refreshIco} alt="refresh" />
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Card;
