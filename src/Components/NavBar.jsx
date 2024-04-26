import {  AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import SavingsIcon from '@mui/icons-material/Savings';

export const NavBar = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton size='large' edge='start' color='inherit' arial-label='logo'>
                    <SavingsIcon />
                </IconButton>
                <Typography variant='h6' component='div'>
                    CALULATE YOUR LOAN AND SAVE
                </Typography>
            </Toolbar>
        </AppBar>

    )
}