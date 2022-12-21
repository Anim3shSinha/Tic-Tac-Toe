import React from "react";
import { Button } from "@mui/material";
import pic from "./logo.gif";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "4px solid grey",
        padding: "50px",
        borderRadius: "20px",
        backgroundColor: "#F5E4E0",
      }}
    >
      <img src={pic} alt="logo" height="100px" />
      <p style={{ fontSize: "30px", fontStyle: "italic" }}>async</p>
      <p style={{ fontSize: "60px", fontStyle: "italic" }}>Tic Tac {"\n"}Toe</p>
      <Button
        type="submit"
        variant="contained"
        sx={{ borderRadius: 3, marginTop: 3, marginBottom: 3 }}
        color="warning"
        onClick={() => {
          navigate("/login");
        }}
      >
        Login
      </Button>
      <Button
        type="submit"
        variant="contained"
        sx={{ borderRadius: 3, marginTop: 3, marginBottom: 3 }}
        color="warning"
        onClick={() => {
          navigate("/signup");
        }}
      >
        Sign Up
      </Button>
    </div>
  );
}

export default Home;
