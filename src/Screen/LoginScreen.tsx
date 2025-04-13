import * as React from "react";
import { Box, Paper, Typography, TextField, Button, Alert } from "@mui/material";
import { login } from "../Helpers/api-client";
import { useDispatch, useSelector } from 'react-redux';
import DoggleTitle from "../Components/DoogleTitle";

export default function LoginScreen(){

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');  
    const dispatch = useDispatch();  

    const loginSuccess = useSelector((store: any) => {
        return store.userInfo.loginSuccess;
      });

    return (
        <Box style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
            <Paper elevation={12} style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor:'white', paddingBottom:15, marginBottom:35, paddingTop:5}} >
                <DoggleTitle />
                <Typography variant="h5">The search engine for dogs</Typography>
            </Paper>
            <Paper elevation={4} style={{width:'300px', margin:'auto', padding:15}}>
                <Typography variant="h4">Login</Typography>
                <Typography variant="body2">Enter your name and email to view cute dogs!</Typography>
                <Box style={{padding: 15}}>
                    <TextField 
                        id="outlined-basic" 
                        label="Name" 
                        variant="outlined" 
                        value={name} 
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setName(event.target.value);
                        }}
                        style={{margin: 5}}
                    />
                    <TextField 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined" 
                        value={email}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(event.target.value);
                        }}
                        style={{margin: 5}}
                    />
                    <Button 
                        variant="contained"
                        style={{backgroundColor: '#023047'}}
                        onClick={() => {
                            login(name, email, dispatch);
                        }}
                    >
                        Login
                    </Button>
                    {loginSuccess === 0 && <Alert severity="error">There was an issue logging in, please check your name and email</Alert>}
                </Box>
            </Paper>
        </Box>
    )
}