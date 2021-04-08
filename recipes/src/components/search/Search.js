import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { IngredientCard } from '../listAll/IngredientCard';
import { fullNameSearch, likeNameSearch, deleteDish } from '../../api/request';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        margin: theme.spacing(1),
        minWidth: "100px"
    },  
}));

export default function Create() {
    const classes = useStyles();
    const [dishes, setDishes] = useState([]);
    const [name, setName] = useState("");

    const handleFullNameSearch = (event) => {
        event.preventDefault();
        fullNameSearch(name, setDishes);
    }

    const handleLikeNameSearch = (event) => {
        event.preventDefault();
        likeNameSearch(name, setDishes);
    }

    const handleNameInput = (event) => {
        setName(event.target.value);
    }

    const handleDeleteDish = (name) => {
        deleteDish(name, dishes, setDishes);
    }

    return (
        <div>
            <Paper elevation={3} >
                <Box p={3} mb={3}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <Typography variant="h5" gutterBottom>Поиск</Typography>
                        <div>
                            <TextField
                                id="filled"
                                label="Название"
                                variant="filled"
                                size="small"
                                value={name}
                                onChange={handleNameInput}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            
                            <Button
                                variant="contained"
                                className={classes.button}
                                color="primary"
                                onClick={handleFullNameSearch}
                            >
                                full
                            </Button>

                            <Button
                                variant="contained"
                                className={classes.button}
                                color="primary"
                                onClick={handleLikeNameSearch}
                            >
                                like
                        </Button>
                        </div>
                    </form>
                </Box>
            </Paper>

            {dishes.map((v, i) => <IngredientCard key={i}
                name={v.name}
                ingredients={v.ingredients}
                handleDeleteDish={handleDeleteDish}>

            </IngredientCard>)}

        </div>
    );
}