import React, { useState, useEffect } from 'react';
import axiosInstance from './axios';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Logo from './Logo';
import UserControl from './UserControl';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';

const deleteUserByEmail = async (email, setUsers) => {

    try {
        const response = await axiosInstance.get(`/users/users/${email}/`);
        const userId = response.data.id;

        const token = localStorage.getItem('access_token');
        await axiosInstance.delete(`/users/users/${userId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        setUsers(users => users.filter(user => user.email !== email));
    } catch (error) {
        console.error('Failed to delete user:', error);
    }
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
            <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
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

function ManageAccounts() {
    const [users, setUsers] = useState([]);
    const [userCount, setUserCount] = useState(0);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const navigate = useNavigate();

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axiosInstance.get('/users/users/');
                setUsers(response.data);
                setUserCount(response.data.length);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="detail-container">
            <header className="header-flex" >
                <Logo />
                <UserControl />
            </header>
            <div style={{ borderBottom: '0.5px solid #CCCCCC', marginTop: '3%', marginBottom: '3%' }}></div>
            <h2>User List</h2>
            <TableContainer component={Paper}>
                <Table aria-label="custom pagination table">
                    <TableBody>
                        {(rowsPerPage > 0
                            ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : users
                        ).map((user, index) => (
                            <TableRow key={user.email}>
                                <TableCell component="th" scope="row">
                                    {(page * rowsPerPage) + index + 1}
                                </TableCell>
                                <TableCell>
                                    {user.user_name}
                                </TableCell>
                                <TableCell>
                                    {user.email}
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => deleteUserByEmail(user.email, setUsers)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={4} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={4}
                                count={userCount}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>

            <h2>Statistics</h2>
            <p>Total Users: {userCount}</p>

            <Footer></Footer>
        </div>
    );
}

export default ManageAccounts;
