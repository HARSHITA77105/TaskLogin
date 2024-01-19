import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import {useState,useEffect} from 'react';
import axios from 'axios';
import Config from "../Config/Config";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


const label = { inputProps: { "aria-label": "Checkbox demo" } };
const LoginForm = () => {



    const navigate = useNavigate()
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    setData({
      ...data,
      rememberMe: e.target.checked,
    });

    if (e.target.checked) {
        
        Cookies.set("userData", JSON.stringify(data), { expires: 10 / (24 * 60) });
      } else {
      
        Cookies.remove("userData");
      }


  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const companyUrl = Config.baseUrl + Config.apiEndPoints.signInApi;

    try {
    
      const response = await axios.post(companyUrl, data);
      if (response.data.responseCode === 200) {
        if (data.rememberMe) {
       
          Cookies.set("userData", JSON.stringify(data), { expires: 10 / (24 * 60) });
        }
        navigate("/welcome");
      }
      
     
      console.log("", response.data);
    } catch (error) {
     
      console.error("API Error:", error.message);
    }
  };




  useEffect(() => {
   
    const userDataCookie = Cookies.get("userData");
  
    if (userDataCookie) {
      const parsedData = JSON.parse(userDataCookie);
      setData(parsedData);
      navigate("/welcome")
     
    }
  }, []); 
  

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 5,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,
        }}
      >

        <form sx={{display: "flex",
          flexDirection: "column",
          mt: 5,
          justifyContent: "center",
          alignItems: "center",
          gap: 10,}} >
        <Typography>Loginform</Typography>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          sx={{ width: "300px" }}
          value={data.username}
          onChange={handleChange}
          type="text"
        ></TextField>

        <TextField
          id="password"
          label="Password"
          variant="outlined"
          sx={{ width: "300px" }}
          value={data.password}
          onChange={handleChange}
          type="text"
        ></TextField>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography>Remember Me</Typography>
          <Checkbox   checked={data.rememberMe || false}
            onChange={handleCheckboxChange}
            
            sx={{ marginBottom: "10px" }} {...label} defaultChecked />
        </Box>
        <Button  variant="contained" onClick={handleSubmit}>Submit</Button>

        </form>
        
      </Box>
    </>
  );
};

export default LoginForm;
