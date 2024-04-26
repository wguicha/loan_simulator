import { Stack, Button, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export const MUIButtons = () => {
    return (
        <Stack spacing={4}>
            <Stack spacing={2} direction='row'>
                <Button variant='text'>Text</Button>
                <Button variant='contained'>Contained</Button>
                <Button variant='outlined'>Outlined</Button>
            </Stack>
            <Stack spacing={2} direction='row'>
                <Button variant='contained' color='primary'>primary</Button>
                <Button variant='contained' color='secondary'>secondary</Button>
                <Button variant='contained' color='info'>info</Button>
                <Button variant='contained' color='warning'>warning</Button>
                <Button variant='contained' color='success'>success</Button>
            </Stack>
            <Stack display='block' spacing={2} direction='row'>
                <Button variant='contained' size='small'>small</Button>
                <Button variant='contained' size='medium'>medium</Button>
                <Button variant='contained' size='large'>large</Button>
            </Stack>
            <Stack display='block' spacing={2} direction='row'>
                <Button variant='contained' startIcon={<SendIcon/>} onClick={()=> alert('clicked')}>Send</Button>
                <Button variant='contained' endIcon={<SendIcon/>}>Send</Button>
                <IconButton aria-label='send' color='success' size='large'>
                    <SendIcon/>
                </IconButton>
            </Stack>
        </Stack>
    )
}