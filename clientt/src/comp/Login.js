import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const cookies = new Cookies();
  const login = () => {
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      const { firstName, lastName, username, token, userId } = res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      // setIsAuth(true);
      navigate("./dash");
    });
  };
  return (
    <Box
      width={600}
      display="flex"
      flexDirection={"column"}
      justifyContent={"center"}
      border="2px solid grey"
      boxShadow="10px 10px 20px #ccc"
      padding={2}
      margin="auto"
      marginTop={10}
      borderRadius={5}
      backgroundColor="#F5E4E0"
      backgo
    >
      <Typography variant="h5" padding={3} color="black">
        <h6>Login</h6>
        Please enter your details
      </Typography>
      <div
        className="signup-content"
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <TextField
          name="name"
          style={{
            backgroundColor: "white",
            width: "500px",
          }}
          type="email"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
          placeholder="Type your email here"
          margin="normal"
        />
        <TextField
          name="name"
          type="password"
          style={{ backgroundColor: "white", width: "500px" }}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          placeholder="Type your password here"
          margin="normal"
        />
        <Button
          type="submit"
          onClick={login}
          variant="contained"
          sx={{ borderRadius: 3, marginTop: 3, marginBottom: 3 }}
          color="warning"
        >
          Sign UP
        </Button>
      </div>
    </Box>
  );
}

export default Login;
