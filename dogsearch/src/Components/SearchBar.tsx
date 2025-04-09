import * as React from "react";
import { Card, CardContent, CardMedia, Box, Typography, Button, Autocomplete, TextField } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getDogBreeds, getDogSearchResults, getDogs } from "../Helpers/api-client";
import { Dog, DogCardObj } from "../Helpers/typing";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRef } from 'react';

export default function SearchBar(){
    const [dogBreeds, setDogBreeds] = React.useState([]);
    const [zipCode, setZipCode] = React.useState('');
    const [minAge, setMinAge] = React.useState(0);
    const [maxAge, setMaxAge] = React.useState(100);
    const breedList = useRef([]);

    React.useEffect(() => {
        getDogBreeds()
        .then((data: any) => {
            breedList.current = data.data;
        })
        .catch((error: any) => {
            console.log(error);
        });
    }, []);

    React.useEffect(() => {
        setDogBreeds(breedList.current);
        console.log(breedList.current);
    }, [breedList.current]);

    return (
        <Box style={{width: 450}}>
            <Autocomplete
                disablePortal
                options={dogBreeds}
                sx={{ width: 450 }}
                renderInput={(params) => <TextField {...params} label="Dog Breeds" />}
            />
            <TextField 
                id="outlined-basic" 
                label="ZipCode" 
                variant="outlined" 
                value={zipCode}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setZipCode(event.target.value);
                }}
                style={{margin: 5}}
            />
            <TextField 
                id="outlined-basic" 
                label="Min Age" 
                variant="outlined" 
                type="number"
                value={minAge}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setMinAge(event.target.valueAsNumber);
                }}
                style={{margin: 5, width: 70}}
            />
            <TextField 
                id="outlined-basic" 
                label="Max Age" 
                variant="outlined" 
                type="number"
                value={maxAge}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setMaxAge(event.target.valueAsNumber);
                }}
                style={{margin: 5, width: 80}}
            />
        </Box>
    )
}