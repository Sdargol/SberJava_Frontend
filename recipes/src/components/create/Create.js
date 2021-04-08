import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Ingredient from './Ingredient';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { create } from '../../api/request';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    button: {
        margin: theme.spacing(1),
    },
    root_bar: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function Create() {
    const classes = useStyles();
   
    //const [open, setOpen] = useState(false);
    const [open, setOpen] = useState({isOpen: false, message: ""});

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        //setOpen(false);
        setOpen({isOpen: false, message: ""});
    };

    const [name, setName] = useState("");
    const [ingredientsRequest, setIngredientsRequest] = useState([{ name: "", count: 0 }]); //[{ name: "привет", count: 1 }]

    const addIngredientInRequest = (name, count, index) => {
        const ingredient = { name, count };
        const arrIngredient = [...ingredientsRequest];

        arrIngredient[index] = ingredient;
        setIngredientsRequest(arrIngredient);
    }

    const [ingredients, setIngredients] = useState([<Ingredient key={0} index={0} addIngredientInRequest={addIngredientInRequest} />]);

    const handleInputName = (event) => {
        setName(event.target.value);
    }

    const handleAddIngredient = (event) => {
        event.preventDefault();
        setIngredients([...ingredients, <Ingredient key={ingredients.length}
            index={ingredients.length}
            addIngredientInRequest={addIngredientInRequest} />]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        create({ name, ingredients: ingredientsRequest }, setOpen);
    }

    console.log(ingredientsRequest);

    return (
        <div className={classes.root_bar} >
            <Paper elevation={3} >
                <Box p={3}>
                    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                        <Typography variant="h5" gutterBottom>Создать блюдо</Typography>
                        <div>
                            <TextField
                                required
                                id="filled-required"
                                label="Название"
                                variant="filled"
                                value={name}
                                onChange={handleInputName}
                            />

                            {ingredients}

                            <Button
                                variant="contained"
                                className={classes.button}
                                endIcon={<AddIcon></AddIcon>}
                                onClick={handleAddIngredient}
                            >
                                Добавить
                        </Button>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Создать
                        </Button>
                        </div>
                    </form>
                </Box>
            </Paper>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open.isOpen}
                autoHideDuration={6000}
                onClose={handleClose}
                message={open.message}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
        </div>
    );
}