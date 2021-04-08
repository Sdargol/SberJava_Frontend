import React from 'react';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import './state-account-style.css';
import { useFetch } from '../../hooks/useFetch';

export const StateAccount = ({token}) => {
    const { response, error } = useFetch('http://192.168.1.5:8080/api/terminal', {
        method: "GET",
        headers: { 'Content-Type': 'application/json;charset=utf-8', "Authorization": `Bearer ${token}` },
      });

      if(response){
        if(response.error){
            console.log(error);
            return <div>Error</div>
          }
      }

      if (!response) {
        return <div>Loading...</div>
      }


    const login = response.login;
    const balance = response.purseEntity.balance;

    return (
        <Container maxWidth="xs">
            <CssBaseline />

            <Box mt={3}>
                <Paper >
                    <div className="state_account_form">
                        <Box mt={1} mb={1}>
                            <Typography component="h1" variant="h5" gutterBottom>Состояние счета</Typography>
                        </Box>

                        <TextField
                            style = {{marginBottom: "25px"}}
                            id="read-only-state-username"
                            label="Username"
                            defaultValue= {login}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />

                        <TextField
                            id="read-only-state-balance"
                            label="Balance"
                            defaultValue= {balance}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined" 
                        />

                        
                    </div>
                </Paper>
            </Box>
        </Container>
    )
};