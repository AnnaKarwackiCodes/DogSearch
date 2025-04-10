import * as React from "react";
import { Card, CardContent, CardMedia, Box, Typography, Button } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getDogBreeds, getDogSearchResults, getDogs } from "../Helpers/api-client";
import { Dog, DogCardObj } from "../Helpers/typing";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToFavorites } from "../redux/reducers/UserInfo";


export default function DogCard({dogObject}: DogCardObj){
    const dispatch = useDispatch();

    const favDogList = useSelector((store: any) => {
        return store.userInfo.favoriteDogs;
      });

    const startArray : Dog[] = [];
    const [localFav, setLocalFav] = React.useState(startArray);
    const [isFaved, setIsFaved] = React.useState(false);

    React.useEffect(() => {
        checkFavorites();
    }, [favDogList]);

    React.useEffect(() => {
        checkFavorites();
    }, []);

    function checkFavorites(){
        let temp: Dog[] = [];
        favDogList.forEach((element: Dog) => {
            temp.push(element);
        });
        setLocalFav(temp);
        setIsFaved(favDogList.map((e: Dog) => e.id).indexOf(dogObject.id) !== -1);
        console.log(favDogList.indexOf(dogObject) !== -1);
    }
    function addFavorite(){
        if(isFaved){
            setIsFaved(false);
            let temp = localFav.filter((favDog: Dog) => favDog.id !== dogObject.id);
            dispatch(addToFavorites({favoriteDogs: temp}));
        }
        else{
            let temp = localFav;
            temp.push(dogObject);
            dispatch(addToFavorites({favoriteDogs: temp}));
            setIsFaved(true);
        }
    }

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
                <Button style={{color: 'red'}} onClick={() => {
                    addFavorite();
                }}> 
                    {isFaved ? <FavoriteIcon style={{color: 'red'}}/> : <FavoriteBorderIcon style={{color: 'red'}}/> }
                    {isFaved ? "Unfavorite" : "Favorite"}
                </Button>
            </Box>
            </CardContent>
        </Card>
    )
}