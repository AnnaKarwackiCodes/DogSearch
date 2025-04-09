import * as React from "react";
import { Card, CardContent, CardMedia, Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getDogBreeds, getDogSearchResults, getDogs } from "../Helpers/api-client";
import { Dog, DogCardObj } from "../Helpers/typing";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';


export default function DogCard({dogObject}: DogCardObj){


    return (
        <Card variant="outlined" style={{width: 250, alignContent: 'center'}}>
            <CardContent>
            <CardMedia
                sx={{ width: 200, height: 200 }}
                image={dogObject.img}
                title={dogObject.name}
            />
            <Box>
                <Typography>Meet {dogObject.name}!</Typography>
                <Typography>Breed: {dogObject.breed}</Typography>
                <Typography>Zip Code: {dogObject.zip_code}</Typography>
                <Button style={{color: 'red'}}> <FavoriteBorderIcon style={{color: 'red'}}/> Favorite</Button>
            </Box>
            </CardContent>
        </Card>
    )
}