import React, { useState } from "react";
import Board from "./Board";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function Game({ channel, setChannel, rival }) {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const player = rival.split("@");
  const p = `Playing with ${player[0]}`;
  const [result, setResult] = useState({ winner: "none", state: "none" });
  const navigate = useNavigate();

  channel.on("user.watching.start", (event) => {
    setPlayersJoined(event.watcher_count === 2);
  });
  if (!playersJoined) {
    return <div> Waiting for other player to join...</div>;
  }

  return (
    <>
      <h1>{p}</h1>
      <div className="gameContainer">
        <Board result={result} setResult={setResult} />

        <Button
          type="submit"
          onClick={async () => {
            await channel.stopWatching();
            setChannel(null);
          }}
          variant="contained"
          sx={{ borderRadius: 3, marginTop: 3, marginBottom: 3 }}
          color="warning"
        >
          Leave Game
        </Button>
        {result.state === "won" && <div> {result.winner} Won The Game</div>}
        {result.state === "tie" && <div> Game Tied</div>}
      </div>
    </>
  );
}

export default Game;
