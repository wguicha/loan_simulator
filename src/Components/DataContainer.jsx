import Box from '@mui/system/Box';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import { TextField } from '@mui/material';
import { useState } from 'react';

export const DataContainer = () => {
    const [ plazo, setPlazo ] = useState('')
    return (
        <Box
            sx={{
                p: 2,
                minWidth: 300,
                border: '1px solid',
                borderColor: 'divider',
                bgcolor: 'background.default',
                borderRadius: 2,
            }}
        >
            <Grid container my={2}
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center">
                <Grid item xs={6} sm={2}>
                <TextField label='Plazo'
                        required
                        value={plazo}
                        onChange={(e) => setPlazo(e.target.value)}
                        error={!plazo}
                        helperText={
                            !plazo? 'required' : 'Ingrese la cantidad de meses'
                        }
                        size='small'
                        color='secondary'
                        InputProps={{
                            endAdornment: <InputAdornment position='end'>meses</InputAdornment>
                        }}>
                </TextField>
                </Grid>
                <Grid item xs={6} sm={2}>
                 </Grid>
                <Grid item xs={12} sm={6}>
                </Grid>
            </Grid>
        </Box>

    )
}