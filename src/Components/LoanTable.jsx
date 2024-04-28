import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

export const LoanTable = () => {
    return (
        <TableContainer component={Paper} >
            <Table aira-label='loan calculation table'>
                <TableHead>
                    <TableRow>
                        <TableCell>Cuota</TableCell>
                        <TableCell>Saldo Inicial</TableCell>
                        <TableCell>Cuota</TableCell>
                        <TableCell>Interes</TableCell>
                        <TableCell>Capital</TableCell>
                        <TableCell>Saldo Final</TableCell>
                        <TableCell>Abono</TableCell>
                        <TableCell>Nuevo Saldo Final</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key='1'>
                        <TableCell>1</TableCell>
                        <TableCell>$ 40&apos;000.000</TableCell>
                        <TableCell>$ 1&apos;089.000</TableCell>
                        <TableCell>$ 710.154</TableCell>
                        <TableCell>$ 378.846</TableCell>
                        <TableCell>$ 39&apos;621.154</TableCell>
                        <TableCell>$ 200.000</TableCell>
                        <TableCell>$ 39&apos;421.154</TableCell>
                    </TableRow>
                    <TableRow key='2'>
                        <TableCell>2</TableCell>
                        <TableCell>$ 39&apos;421.154</TableCell>
                        <TableCell>$ 1&apos;089.000</TableCell>
                        <TableCell>$ 699.877</TableCell>
                        <TableCell>$ 389.123</TableCell>
                        <TableCell>$ 39&apos;032.031</TableCell>
                        <TableCell>$ 100.000</TableCell>
                        <TableCell>$ 38&apos;932.031</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>

    )
}