import * as React from "react";
import { Card, CardContent, CardMedia, Box, Typography, Button, Paper } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { getDogBreeds, getDogSearchResults, getDogs } from "../Helpers/api-client";
import { Dog, DogCardObj } from "../Helpers/typing";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { addToFavorites } from "../redux/reducers/UserInfo";


export default function DogCard({dogObject, showFav}: DogCardObj){
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

    React.useEffect(() => {
        checkFavorites();
    }, [dogObject])

    function checkFavorites(){
        let temp: Dog[] = [];
        favDogList.forEach((element: Dog) => {
            temp.push(element);
        });
        setLocalFav(temp);
        setIsFaved(favDogList.map((e: Dog) => e.id).indexOf(dogObject.id) !== -1);
        //console.log(favDogList.indexOf(dogObject) !== -1);
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
        <Card style={{width: 250, alignContent: 'center', margin: 'auto'}}>
                <CardContent>
                <CardMedia
                    sx={{ width: 220, height: 220 }}
                    image={dogObject.img}
                    title={dogObject.name}
                />
                <Box>
                    <Typography variant="h6">Meet {dogObject.name}!</Typography>
                    <Typography>Breed: {dogObject.breed}</Typography>
                    <Typography>Zip Code: {dogObject.zip_code}</Typography>
                    {showFav && <Button style={{color: '#FB8500'}} onClick={() => {
                        addFavorite();
                    }}> 
                        {isFaved ? <FavoriteIcon style={{color: '#FB8500'}}/> : <FavoriteBorderIcon style={{color: '#FB8500'}}/> }
                        {isFaved ? "Unfavorite" : "Favorite"}
                    </Button>}
                </Box>
                </CardContent>
            </Card>
    )
}