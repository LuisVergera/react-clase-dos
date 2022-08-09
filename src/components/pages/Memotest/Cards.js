import broly from "./images/broly.png";
import fusion from "./images/fusion.png";
import gohan from "./images/gohan.png";
import goku from "./images/goku.png";
import trunks from "./images/trunks.png";
import vegeta from "./images/vegeta.png";

export const cards = [
  {
    name: "broly",
    src: broly,
  },
  {
    name: "fusion",
    src: fusion,
  },
  {
    name: "gohan",
    src: gohan,
  },
  {
    name: "goku",
    src: goku,
  },
  {
    name: "trunks",
    src: trunks,
  },
  {
    name: "vegeta",
    src: vegeta,
  },
];

export const initialCards = () => {
  let cartasIniciales = [];
  cards.forEach(({ src, name }) => {
    cartasIniciales.push({
      name,
      src,
      key: `${name}-1`,
    });
    cartasIniciales.push({
      name,
      src,
      key: `${name}-2`,
    });
  });
  cartasIniciales.sort(() => 0.5 - Math.random());
  return cartasIniciales;
};
