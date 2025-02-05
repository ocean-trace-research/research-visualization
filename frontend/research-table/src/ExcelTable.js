import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';

const ExcelTable = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const filePath = "/research-list.xlsx";
        fetch(filePath)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                const workbook = XLSX.read(buffer, { type: "array" });
                //const workbook = XLSX.read(binaryStr, { type: "binary" })
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                setData(parsedData);
            })
            .catch(error => console.error("Error loading Excel file:", error));
    }, []);

    return (
        <div className="p-4">
            <Paper sx={{ height: '90%', width: '95%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: '90%' }}>
                    {data.length > 0 && (
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>{data[0][0]}</TableCell>
                                    <TableCell>{data[0][1]}</TableCell>
                                    <TableCell>{data[0][2]}</TableCell>
                                    <TableCell>{data[0][3]}</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.slice(1).map((row, rowIndex) => (
                                    <TableRow key={rowIndex}>
                                        <TableCell><Link color="primary" href={row[4]} target="_blank">{row[0]}</Link></TableCell>
                                        <TableCell>{row[1]}</TableCell>
                                        <TableCell>{row[2]}</TableCell>
                                        <TableCell>{row[3]}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </TableContainer>
            </Paper>
        </div>
    );
};

export default ExcelTable;