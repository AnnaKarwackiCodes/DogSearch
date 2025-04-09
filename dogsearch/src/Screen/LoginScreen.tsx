import * as React from "react";
import { Box, Card, Typography, TextField, Button, Alert } from "@mui/material";
import { login } from "../Helpers/api-client";


export default function LoginScreen(){

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');    
    const [loggedIn, setLoggedIn] = React.useState(-1);
    const loginSuccess = React.useRef(-1);

    React.useEffect(() => {
        setLoggedIn(loginSuccess.current);
    }, [loginSuccess.current]);

    return (
        <Box width={'300px'} style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
            <Card variant="outlined">
                <Typography variant="h4">Login</Typography>
                <Typography variant="body2">Enter your name and email to view cute dogs in your area!</Typography>
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
                        onClick={() => {
                            const message = login(name, email);
                            console.log(message);
                        }}
                    >
                        Login
                    </Button>
                </Box>
            </Card>
        </Box>
    )
}