import React, { useState, useEffect } from "react";
import SushiContainer from "./SushiContainer";
import Table from "./Table";

const API = "http://localhost:3001/sushis";

function App() {
  const [sushis, setSushis] = useState([]);
  const [beltPosition, setBeltPosition] = useState(0);
  const [money, setMoney] = useState(100);
  const displayCount = 4;

  useEffect(() => {
    fetch(API)
    .then((res) => res.json())
    .then((data) => setSushis(data))
  }, [])

  function advanceBeltPosition() {
    setBeltPosition((beltPosition + displayCount) % sushis.length)
  }

  function setEaten(piece) {
    const remainingMoney = money - piece.price

    if(remainingMoney >= 0) {
    setMoney(remainingMoney)
    setSushis(sushis.map(
      sushi => sushi.id === piece.id ? 
      {...sushi, eaten:true} : sushi))
    }
  }

  return (
    <div className="app">
      <SushiContainer 
      sushis={sushis.slice(beltPosition, beltPosition + displayCount)}
      handleMoreClick={advanceBeltPosition}
      handleEatSushi={setEaten}
      />
      <Table plates={sushis.filter(sushi => sushi.eaten)} money={money}/>
    </div>
  );
}

export default App;
