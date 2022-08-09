import React, { useEffect, useState, useRef } from "react";
import cx from "classnames";
import ReactCardFlip from "react-card-flip";
import { cards } from "./Cards";
import { initialCards } from "./Cards";
import FancyButton from "../../small/FancyButton";

import cards2 from "./images/cards2.png";
import "./Memotest.css";
//import { useMemotestState } from "./useMemotestState";

const WinnerCard = ({ show, onRestart = () => {} }) => {
  return (
    <div className={cx("winner-card", { "winner-card--hidden": !show })}>
      <span className="winner-card-text">The game has ended</span>
      <FancyButton onClick={onRestart}>Play again?</FancyButton>
    </div>
  );
};

const Card = ({ src, name, flipped, onClick }) => {
  return (
    <div className="memotesCard">
      <ReactCardFlip isFlipped={flipped}>
        <div onClick={onClick} className="memotest-img-wrapper">
          <img className={"memotest-img"} src={cards2} alt={name} />
        </div>
        <div onClick={onClick} className="memotest-img-wrapper">
          <img className={"memotest-img"} src={src} alt={name} />
        </div>
      </ReactCardFlip>
    </div>
  );
};

const useMemotestState = () => {
  const [cards, setCards] = useState(initialCards);
  const [flip, setFlip] = useState([]);
  const [winCards, setWinCards] = useState([]);
  const timeoutRef = useRef();
  const gameEnded = winCards.length === cards.length / 2;

  const flipCard = (key) => {
    if (!flip.includes(key) && flip.length < 2) {
      setFlip([...flip, key]);

      const newLength = flip.length + 1;
      if (newLength === 2) {
        const firstName = flip[0].match(/^\w+/)[0];
        const secondName = key.match(/^\w+/)[0];

        if (firstName === secondName) {
          setWinCards([...winCards, firstName]);
          setFlip([]);
        } else {
          timeoutRef.current = setTimeout(() => {
            setFlip([]);
          }, 1000);
        }
      }
    } else if (!flip.includes(key) && flip.length === 2) {
      clearTimeout(timeoutRef.current);
      setFlip([key]);
    }
  };
  const onRestart = () => {
    setCards(initialCards);
    setWinCards([]);
  };
  return { flip, flipCard, winCards, cards, onRestart, gameEnded };
};

const Memotest = () => {
  const { flip, flipCard, winCards, cards, onRestart, gameEnded } =
    useMemotestState();
  return (
    <div className="card-wrapper">
      <WinnerCard show={gameEnded} onRestart={onRestart} />
      {cards.map(({ key, name, src }) => (
        <Card
          key={key}
          name={name}
          src={src}
          onClick={() => flipCard(key)}
          flipped={flip.includes(key) || winCards.includes(name)}
        />
      ))}
    </div>
  );
};

export default Memotest;
