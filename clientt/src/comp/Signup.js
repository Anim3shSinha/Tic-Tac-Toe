import React, { useState } from "react";
import Axios from "axios";
import { Box } from "@mui/system";
import { Button, TextField, Typography } from "@mui/material";

import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("username", username);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("hashedPassword", hashedPassword);
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
    >
      <Typography variant="h5" padding={3} color="black">
        <h6>Create account</h6>
        Lets get to know you better
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
          onChange={(event) => {
            setUser({ ...user, firstName: event.target.value });
          }}
          placeholder="Type your first name here"
          margin="normal"
        />
        <TextField
          name="name"
          style={{ backgroundColor: "white", width: "500px" }}
          onChange={(event) => {
            setUser({ ...user, lastName: event.target.value });
          }}
          placeholder="Type your last name here"
          margin="normal"
        />
        <TextField
          style={{ backgroundColor: "white", width: "500px" }}
          name="name"
          onChange={(event) => {
            setUser({ ...user, username: event.target.value });
          }}
          type={"email"}
          placeholder="Type your email here"
          margin="normal"
        />
        <TextField
          name="name"
          style={{ backgroundColor: "white", width: "500px" }}
          onChange={(event) => {
            setUser({ ...user, password: event.target.value });
          }}
          type={"password"}
          placeholder="Type your password here"
          margin="normal"
        />
        <Button
          type="submit"
          onClick={signUp}
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

export default SignUp;
