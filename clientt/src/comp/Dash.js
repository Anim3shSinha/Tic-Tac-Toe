import React from "react";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import JoinGame from "./JoinGame";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Dash() {
  const api_key = "8z7uudunffks";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(api_key);
  const navigate = useNavigate();
  const greet = `Welcome! ${cookies.get("firstName")}`;

  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser();
    navigate(-1);
  };

  if (token) {
    client.connectUser(
      {
        id: cookies.get("userId"),
        name: cookies.get("username"),
        firstName: cookies.get("firstName"),
        lastName: cookies.get("lastName"),
        hashedPassword: cookies.get("hashedPassword"),
      },
      token
    );
  }
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Chat client={client}>
            <JoinGame greet={greet} />
          </Chat>
        </div>
        <Button
          type="submit"
          onClick={logOut}
          variant="contained"
          sx={{ borderRadius: 3, marginTop: 3, marginBottom: 3 }}
          color="warning"
        >
          Logout
        </Button>
      </div>
    </>
  );
}

export default Dash;
