import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '15px'
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

let setMoneyRequest = (token, amount, setOpen, setMessage) => {
    fetch('http://192.168.1.5:8080/api/terminal/set',
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ "amount": amount })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setOpen(true);
            
            if(data.hasOwnProperty('message')){
                setMessage(data.message);
            }else{
                setMessage(`Баланс ${data.balance}`);
            } 
        })
        .catch(e => console.log(e));
}

export default function SetMoney({ token }) {
    const classes = useStyles();
    const [amount, setAmount] = useState(0);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState(":)");

    const handleAmount = (event) => {
        setAmount(event.target.value);
    }
    
    const submit = (event) => {
        event.preventDefault();
        setMoneyRequest(token,amount, setOpen, setMessage);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    return (
        <div>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper>
                <div className={classes.paper}>
                    <Box mt={1} mb={1}>
                        <Typography component="h1" variant="h5">Внести сумму</Typography>
                    </Box>

                    <form className={classes.form} noValidate onSubmit={submit}>

                        <TextField
                            id="set-money-number"
                            label="Amount"
                            type="number"
                            fullWidth
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                            value={amount}
                            onChange={handleAmount}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Внести
                        </Button>
                    </form>
                </div>
            </Paper>
        </Container>

        <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message= {message}
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