import * as React from "react";
import { Box, Paper, Typography, Button, Alert, Modal } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import PaginationGrid from "../Components/PaginationGrid";
import SearchIcon from '@mui/icons-material/Search';
import { setCurScreen } from "../redux/reducers/UserInfo";
import { Dog } from "../Helpers/typing";
import PetsIcon from '@mui/icons-material/Pets';
import { getMatchingDog } from "../Helpers/api-client";
import DogCard from "../Components/DogCard";
import DoggleTitle from "../Components/DoogleTitle";


export default function FavoritedDogsScreen(){

    const dispatch = useDispatch();
    const [curPage, setCurPage] = React.useState(1);
    const startArray : Dog[] = [];
    const [curPageContent, setCurPageContent] = React.useState(startArray);
    const [favDogIds, setFavDogIds] = React.useState(['']);
    const [matchedDog, setMatchDog] = React.useState({id: '', img: '', name: '', age: -1, zip_code: '', breed: ''});

    const results = useSelector((store: any) => {
        return store.userInfo.favoriteDogs;
      });
    const [pageTotal, setPageTotal] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurPage(value);
      };

    React.useEffect(() => {
        //console.log(results);
        let temp = [];
        for(let x = (curPage - 1) * 25; x < ((curPage * 25 > results.length) ? ((curPage * 25) - ((curPage * 25) - results.length)) : curPage * 25); x++ ){
            temp.push(results[x]);
        }
        setCurPageContent(temp);
        setPageTotal(Math.round(results.length/25) + 1);
        setFavDogIds(results.map((e: Dog) => e.id));
        console.log(results.map((e: Dog) => e.id));
    }, [results, curPage]);

    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [curPage]);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Box width={'100%'} style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Box style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                <Paper elevation={12} style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center', backgroundColor: 'white', paddingBottom:15, marginBottom:35, paddingTop:5}}>
                    <DoggleTitle />
                    <Typography variant="h5">Your Favorited Doggies</Typography>
                </Paper>
                {results.length === 0 && 
                    <Paper style={{width: 300, padding: 25, margin:'auto', marginTop:'15vh', marginBottom: '15vh'}} >
                        <Typography variant="h4">Wait!</Typography>
                        <Typography variant="body1">You have not added any dogs to your favorites. Use the search and try adding some!</Typography>
                        <Button onClick={()=> {dispatch(setCurScreen({value: 0}))}}> <SearchIcon />Search Now for dogs to add.</Button>
                    </Paper>}
                {results.length > 0 &&
                    <Box marginTop={5}>
                        <Typography variant="h5">You have added dogs to your favorites list.</Typography>
                        <Button 
                            variant="contained" 
                            onClick={()=> { 
                                getMatchingDog(favDogIds)
                                .then((data: any)=> {
                                    setOpen(true);
                                    console.log(results);
                                    let temp = results.filter((value: Dog) => value.id === data.data.match)
                                    console.log(temp);
                                    setMatchDog(temp[0]);
                                })
                                .catch((error: any) => {
                                    console.log(error);
                                });
                                
                            }}  
                            style={{marginTop: 5}}> 
                            <PetsIcon /> Now Let's Find Your Match!
                        </Button>
                    </Box>
                }
                <PaginationGrid results={curPageContent} pageTotal={pageTotal} handlePageChange={handleChange} curPage={curPage}/>
            </Box>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                <Box sx={{position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,}}>
                    <Box width= '100%' style={{flex: 1, alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                        Found Your Match!
                        </Typography>
                        <Box style={{alignItems: 'center', justifyContent: 'center', textAlign: 'center'}}>
                            <DogCard dogObject={matchedDog} showFav={false}/>
                        </Box>
                        <Button onClick={()=> {setOpen(false);}}>Close</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}