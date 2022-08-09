import React, { useEffect, useState } from "react";

const useInputState = (initialValue) => {
  const [value, setValue] = useState(false);
  return [value, setValue];
};

const CustomHook = () => {
  const input = useInputState("");
  return <FancyInput title="Custom hook" {...input} />;
};
export default CustomHook;

export const useMemotestState = () => {
  const [cards, setCards] = useState(false);

  const flipCard = () => {
    return setCards(true);
  };
};
