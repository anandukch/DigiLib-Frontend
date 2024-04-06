import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Box,
  IconButton,
  Typography,
  createTheme,
  ThemeProvider,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { BookTransaction } from "../types";
import { getAllTransactions, issueBook, returnBook } from "../apis/booksApi";
import { formatDate } from "../utils";
import { v4 } from "uuid";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const TransactionTable: React.FC = () => {
  // const [openDialog, setOpenDialog] = useState(false);
  const [transactions, setTransactions] = useState<BookTransaction[]>([]);
  // const [transIndx, setTransIndx] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width: 600px)");
  useEffect(() => {
    setLoading(true);
    getAllTransactions()
      .then((response) => {
        setTransactions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
      });
  }, []);

  const issueBookHandler = (transIndx: number) => {
    setLoading(true);
    const transId = transactions[transIndx].id;
    issueBook(transId)
      .then((_) => {
        getAllTransactions()
          .then((response) => {
            setTransactions(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching book:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching book:", error);
      });
  };

  const returnBookHandler = (index: number) => {
    setLoading(true);
    returnBook(transactions[index].id)
      .then((_) => {
        getAllTransactions()
          .then((response) => {
            setTransactions(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching book:", error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns: GridColDef[] = [
    {
      field: "acc_no",
      headerName: "Accession No",
      width: 120,
    },
    {
      field: "img",
      headerName: "Book Image",
      width: 100,

      renderCell: (params) => {
        return <img style={{ width: "100%" }} src={params.value}></img>;
      },
    },
    {
      field: "title",
      headerName: "Book Title",
      width: 100,
      editable: true,
    },
    {
      field: "name",
      headerName: "User Name",
      width: 110,
      editable: true,
    },
    {
      field: "res_date",
      headerName: "Reservation Date",
      width: 130,
      editable: true,
    },
    {
      field: "iss_date",
      headerName: "Issue Date",
      width: 150,
      editable: true,
    },
    {
      field: "return_date",
      headerName: "Date of return",
      width: 150,
      editable: true,
    },
    {
      field: "act_return_date",
      headerName: "Actual Date of return",
      width: 150,
      editable: true,
    },
    {
      field: "fine",
      headerName: "Fine",
      width: 100,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      editable: true,

      renderCell: (params) => {
        return params.value == "reserved" ? (
          <Chip label="Reserved" color="primary" />
        ) : params.value == "issued" ? (
          <Chip label="Issued" color="secondary" />
        ) : params.value == "returned" ? (
          <Chip label="Returned" color="success" />
        ) : (
          <Chip label="In Queue" color="info" />
        );
      },
    },
    {
      field: "action",

      headerName: "Action",
      width: 100,
      editable: true,
      renderCell: (params) => {
        const { status, index } = params.value;

        return status == "reserved" ? (
          <IconButton
            color="success"
            onClick={() => issueBookHandler(index)}
            style={{ fontSize: "small" }}
          >
            Issue
            <Edit fontSize="small" />
          </IconButton>
        ) : status == "issued" ? (
          <IconButton
            color="primary"
            style={{ fontSize: "small" }}
            onClick={() => returnBookHandler(index)}
          >
            Return
            <Edit fontSize="small" />
          </IconButton>
        ) : (
          <IconButton color="primary" style={{ fontSize: "small" }} disabled>
            <Edit fontSize="small" />
          </IconButton>
        );
      },
    },
  ];

  const rows = transactions.map((transaction, index) => {
    return {
      id: v4(),
      acc_no: transaction.book_item?.acc_no
        ? transaction.book_item.acc_no
        : "-",
      img: transaction.book.image.url,
      title: transaction.book.title,
      status: transaction.status,
      fine: transaction.fine || 0,
      act_return_date: transaction.actual_date_of_return
        ? formatDate(transaction.actual_date_of_return)
        : "-",
      return_date: transaction.date_of_return
        ? formatDate(transaction.date_of_return)
        : "-",
      iss_date: transaction.date_of_issue
        ? formatDate(transaction.date_of_issue)
        : "-",
      res_date: formatDate(transaction.date_of_reservation),
      name: transaction.user.name,
      action: {
        status: transaction.status,
        index: index,
      },
    };
  });

  return (
    <ThemeProvider theme={theme}>
      {/* <Backdrop
                sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop> */}
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Book Transactions
        </Typography>

        <div style={{ width: "100%" }}>
          <DataGrid
            getRowHeight={() => 100}
            style={{
              // backgroundColor: '#515151',
              color: "white",
              width: !isMobile ? "1400px" : "auto",
            }}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 6,
                },
              },
            }}
            disableRowSelectionOnClick
            loading={loading}
          />
        </div>
      </Box>
    </ThemeProvider>
  );
};

export default TransactionTable;
