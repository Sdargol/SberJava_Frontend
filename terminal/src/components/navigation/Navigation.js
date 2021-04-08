import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Menu } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import { Link as RouterLink,  useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import AddBoxIcon from '@material-ui/icons/AddBox';
import GetAppIcon from '@material-ui/icons/GetApp';

import './navigation-style.css';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar({setToken}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    let history = useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        setToken(null);
        history.push("/");
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={handleClick} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>

                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClose}>
                            <Link component={RouterLink} to="/state">
                                <div className = "menu__link">
                                    <AccountBalanceWalletIcon className={classes.menuButton}/>
                                    <Typography variant="body1" gutterBottom>Состояние счета</Typography>
                                </div>  
                            </Link>
                        </MenuItem>
                        
                        <MenuItem onClick={handleClose}>
                            <Link component={RouterLink} to="/set_money">
                                <div className = "menu__link">
                                    <AddBoxIcon className={classes.menuButton}/>
                                    <Typography variant="body1" gutterBottom>Внести</Typography>
                                </div> 
                            </Link>
                        </MenuItem>
                        
                        <MenuItem onClick={handleClose}>
                            <Link component={RouterLink} to="/get_money">
                                <div className = "menu__link">
                                    <GetAppIcon className={classes.menuButton}/>
                                    <Typography variant="body1" gutterBottom>Снять</Typography>
                                </div> 
                            </Link>
                        </MenuItem>
                    </Menu>

                    <Typography variant="h6" className={classes.title}>
                        Terminal
                    </Typography>

                    <Button onClick={handleLogout} color="inherit">Выход</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}