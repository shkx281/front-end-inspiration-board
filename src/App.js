import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Board from "./components/Board";
import BoardForm from "./components/BoardForm";
import BoardList from "./components/BoardList";
import CardForm from "./components/CardForm";
import CardList from "./components/CardList";

function App() {
  const [boards, setBoards] = useState([]);
  const URL = "https://peaceful-shelf-16152.herokuapp.com/";

  const defaultBoard = {
    title: "",
    owner: "",
    id: 0,
  };
  const [selectedBoard, setSelectedBoard] = useState(defaultBoard);
  const [cards, setCards] = useState([]);

  const selectBoard = (id) => {
    for (const board of boards) {
      if (board.id === id) {
        setSelectedBoard(board);
      }
    }
  };

  const getBoards = () => {
    axios.get(`${URL}/boards`).then((res) => {
      const newBoards = res.data.map((board) => {
        return {
          id: board.board_id,
          title: board.title,
          owner: board.owner,
        };
      });
      setBoards(newBoards);
    });
  };

  const addBoard = (boardData) => {
    axios
      .post(`${URL}/boards`, boardData)
      .then(getBoards())
      .catch((err) => {
        console.log(err);
      });
  };

  const getCards = () => {
    const board_id_body = { board_id: selectedBoard.id };
    console.log(selectedBoard.id);
    axios.get(`${URL}/cards`, board_id_body).then((res) => {
      const newCards = res.data.map((card) => {
        return {
          message: card.message,
        };
      });
      setCards(newCards);
    });
  };

  const addCard = (cardData) => {
    axios
      .post(`${URL}/cards`, cardData)
      .then(getCards())
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(getBoards, []);
  useEffect(getCards, [selectedBoard]);

  return (
    <div className="App">
      <header className="App-header"></header>
      <main>
        <div>
          <h2>Boards</h2>
          <BoardList boards={boards} selectBoardCallback={selectBoard} />
        </div>
        <h2>Selected Board</h2>
        <p>
          {selectedBoard.title} - {selectedBoard.owner}
        </p>
        <h2>Cards for Pick-Me-Up Quotes</h2>
        <CardList cards={cards}/>
        <h2>Create a New Board</h2>
        <BoardForm addBoardCallback={addBoard} />
        <h2>Create a New Card</h2>
        <CardForm addCardCallback={addCard} board_id={selectedBoard.id} />
      </main>
    </div>
  );
}

export default App;
