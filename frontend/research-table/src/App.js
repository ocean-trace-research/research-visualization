import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import ExcelTable from './ExcelTable';

function App() {

  return (
    <div className="App">
        <ExcelTable />
    </div>
  );
}

// const useFile = () => {
//   // Returned Excel JSON datas keep.
//   const [data, setData] = useState([]);
//   useEffect(() => {
//     // Fetch Excel file.
//     fetch("../../../research-list.xlsx")
//       // Convert to ArrayBuffer.
//       .then((res) => res.arrayBuffer())
//       .then((data) => {
//         const wb = XLSX.read(data, { type: "buffer" });
//         const wsname = wb.SheetNames[1];
//         const ws = wb.Sheets[wsname];
//         // Convert to JSON.
//         const json = XLSX.utils.sheet_to_json(ws);
//         setData(json);
//         ResearchTable(json)
//       });
//   }, []);
// };

// function ResearchTable(data) {
//   const paginationModel = { page: 0, pageSize: 5 }; 
//   let rows = data

//   return (
//     <Paper sx={{ height: 400, width: '100%' }}>
//       <TableContainer sx={{ maxHeight: 440 }}>
//         <Table stickyHeader aria-label="sticky table">
//           <TableHead>
//             <TableRow>
//               <TableCell>References</TableCell>
//               <TableCell>Year</TableCell>
//               <TableCell>Title</TableCell>
//               <TableCell>DOI</TableCell>
//               <TableCell>Link</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row) => (
//               <TableRow 
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//               >
//                 <TableCell>row.reference</TableCell>
//                 <TableCell>row.year</TableCell>
//                 <TableCell>row.title</TableCell>
//                 <TableCell>row.doi</TableCell>
//                 <TableCell>row.link</TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Paper>
//   )
// }

export default App;
