import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableFooter from '@mui/material/TableFooter';
import TableSortLabel from '@mui/material/TableSortLabel';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { visuallyHidden } from '@mui/utils';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
    const { headCells, order, orderBy, onRequestSort } =
        props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell, index) => (
                    <TableCell
                        key={headCell}
                        sortDirection={orderBy === index ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === index}
                            direction={orderBy === index ? order : 'asc'}
                            onClick={createSortHandler(index)}
                        >
                            {headCell}
                            {orderBy === index ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    headCells: PropTypes.array.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const ExcelTable = ({ocean}) => {
    const [headData, setHeadData] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState(1);
    const [searchQuery, setSearchQuery] = useState(ocean);

    useEffect(() => {
        const filePath = "research-visualization/mapped_studies.xlsx";//
        fetch(filePath)
            .then(response => response.arrayBuffer())
            .then(buffer => {
                const workbook = XLSX.read(buffer, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                parsedData[0].splice(4, 9)
                setHeadData(parsedData[0]);
                setRowData(parsedData.slice(1))
            })
            .catch(error => console.error("Error loading Excel file:", error));
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };


    const filteredData = rowData.filter((row) =>
        Object.values(row).some((value) =>
            value.toString().toLowerCase().includes(searchQuery.toString().toLowerCase())
        ))

    const visibleRows = React.useMemo(
        () =>
            [...filteredData]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, filteredData],
    );

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowData.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeSearchQuery = (event) => {
        if (event.target.value.length <= 100) {
            setSearchQuery(event.target.value)
        }        
    }

    return (
        <div className="p-4">
            <Paper sx={{ maxHeight: 0.85 * window.innerHeight, width: 0.95 * window.innerWidth, overflowY: 'scroll' }}>
                <TableContainer>
                    <TextField
                        label="Search Papers"
                        variant="outlined"
                        defaultValue={ocean}
                        onChange={handleChangeSearchQuery}
                        style={{ align: "left", marginLeft:"10px", float:"left", marginTop: "10px", marginBottom: "10px", width:"400px" }}
                    />
                    {filteredData.length > 0 && (
                        <Table stickyHeader aria-label="sticky custom pagination table">
                            <caption>A table with research papers related to trace elements in ocean</caption>
                            <EnhancedTableHead
                                headCells={headData}
                                order={order}
                                orderBy={orderBy}
                                onRequestSort={handleRequestSort}
                                rowCount={rowData.length}
                            />
                            <TableBody>
                                {(rowsPerPage > 0 ? visibleRows : filteredData).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ width: '15%' }}><Link color="primary" href={row[4]} target="_blank">{row[0]}</Link></TableCell>
                                        <TableCell sx={{ width: '5%' }}>{row[1]}</TableCell>
                                        <TableCell sx={{ width: '55%' }}>{row[2]}</TableCell>
                                        <TableCell sx={{ width: '5%' }}><Link color="primary" href={row[3]} target="_blank"><OpenInNewIcon/></Link></TableCell>
                                        {/* <TableCell sx={{ width: '15%' }}>{row[9]}</TableCell>
                                        <TableCell sx={{ width: '15%' }}>{row[10]}</TableCell>
                                        <TableCell sx={{ width: '15%' }}>{row[11]}</TableCell>
                                        <TableCell sx={{ width: '15%' }}>{row[12]}</TableCell> */}
                                        <TableCell sx={{ width: '15%' }}>{row[13].replaceAll("|", " ")}</TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter sx={{ position: 'sticky', }}>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={3}
                                        count={filteredData.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    )}
                </TableContainer>
            </Paper>
        </div>
    );
};

export default ExcelTable;