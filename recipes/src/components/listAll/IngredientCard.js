import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    card_m: {
       marginBottom: 7
    }
});

const Ingredient = ({ ingredient }) => <Typography variant="body2" component="p">{ingredient}</Typography>

export function IngredientCard({ name, ingredients, handleDeleteDish }) {
    const classes = useStyles();

    return (
        <Box mb={3}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">{name}</Typography>
                    <Typography className={classes.pos} color="textSecondary">ингредиенты:</Typography>

                    {ingredients.map((v, i) => <Ingredient key={i}
                        ingredient={(i + 1) + ") " + v.name + ": " + v.count}>
                    </Ingredient>)}

                </CardContent>

                <CardActions>
                    <Button className = {classes.card_m}
                    size="small"
                        variant="contained"
                        endIcon={<DeleteIcon></DeleteIcon>}
                        onClick={(e) => {
                            e.preventDefault();
                            handleDeleteDish(name);
                        }}>Удалить</Button>
                </CardActions>
            </Card>
        </Box>
    );
}



