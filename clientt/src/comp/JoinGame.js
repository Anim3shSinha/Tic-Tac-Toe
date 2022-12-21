import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import { Button, TextField, Typography } from "@mui/material";

function JoinGame({ greet }) {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    const response = await client.queryUsers({ name: { $eq: rivalUsername } }); //getting rival user

    if (response.users.length === 0) {
      alert("User not found");
      return;
    }

    const newChannel = await client.channel("messaging", {
      //adding yourself and the new user to the channel
      members: [client.userID, response.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <Game
            channel={channel}
            setChannel={setChannel}
            rival={rivalUsername}
          />
        </Channel>
      ) : (
        <>
          <div
            className="dash"
            style={{
              border: "5px solid grey",
              backgroundColor: "#F5E4E0",
              borderRadius: "10px",
              display: "flex",
              flexDirection: "column",
              width: "700px",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              padding={3}
              color="black"
              style={{
                fontStyle: "italic",

                margin: "10px",
                padding: "5px",
                width: "90%",
                borderRadius: "15px",
                backgroundColor: "#F18627",
                color: "white",
                textAlign: "center",
              }}
            >
              {greet}
            </Typography>
            <h3 style={{ textAlign: "left" }}>Your games</h3>
            <div
              className="gameplay"
              style={{
                border: "3px solid #6C6F7C",
                width: "650px",
                height: "400px",
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              No recent game
            </div>

            <div
              className="join"
              style={{ display: "flex", flexDirection: "row", gap: "10px" }}
            >
              <TextField
                name="name"
                style={{
                  backgroundColor: "white",
                  border: "2px solid black",
                  borderRadius: "10px",
                }}
                type="email"
                onChange={(event) => {
                  setRivalUsername(event.target.value);
                }}
                placeholder="Enter opponents email here"
                margin="normal"
              />
              <Button
                type="submit"
                onClick={createChannel}
                variant="contained"
                sx={{ borderRadius: 3, marginTop: 3, marginBottom: 3 }}
                color="warning"
              >
                Create/Join game
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default JoinGame;
