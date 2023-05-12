'use client';

import { getReserves } from "@/services/reservationApi"

import { Box, Card, CardContent, CardMedia, Container, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete'

export default function Page() {

    const [page, setPage] = useState(1);
    const [reserves, setReserves] = useState<any[]>([]);

    const handleGetReserves = () => {
        getReserves()
            .then(res => setReserves(res))
            .catch(err => console.error(err))
    }

    useEffect(() => handleGetReserves(), [])

    const handleDelete = (id: string) => {
        handleGetReserves();
    }
    

    return (
        <Container maxWidth='md'>
            {
                reserves.map(r => (
                    <Card key={r.id} sx={{display: 'flex', mb: 2}}>
                    <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image="https://mui.com/static/images/cards/live-from-space.jpg"
                    alt="Live from space album cover"
                    />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                          <CardContent sx={{ flex: '1 0 auto' }}>
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',}}>
                                <Typography component="div" variant="h5">
                                № {r.id}
                                </Typography>

                                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(r.id)}>
                                <DeleteIcon />
                                </IconButton>
                            </Box>
                            <TableContainer>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align="right">Time</TableCell>
                                    <TableCell align="right">Capacity</TableCell>
                                    <TableCell align="right">Floor</TableCell>
                                    <TableCell align="right">Type</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {(new Date()).toLocaleDateString('ru-RU')}
                                </TableCell>
                                <TableCell align="right">9:00-18:00</TableCell>
                                <TableCell align="right">50</TableCell>
                                <TableCell align="right">3</TableCell>
                                <TableCell align="right">Adminka</TableCell>
                                </TableRow>
                                </TableBody>
                            </Table>
                            </TableContainer>
                          </CardContent>
                        </Box>
                    </Card>
                ))
            }
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <Pagination count={10} page={page} onChange={(event, value) => setPage(value)} />
            </Box>
        </Container>
    )
}