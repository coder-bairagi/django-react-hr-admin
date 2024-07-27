import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { showSnackbar } from '../redux/actions/actions';
import { currentDomain } from '../helper';
import { useNavigate } from 'react-router-dom';

const useRowsFetcher = (endpoint) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [rowCount, setRowCount] = useState(0);
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 25,
    });

    const fetchRowCount = useCallback(async () => {
        try {
            const url = `${currentDomain}api/hr/${endpoint}/totalrowcounts`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('accessToken')
                }
            });

            if (response.ok) {
                const data = await response.json();
                setRowCount(data.count);
            } else if (response.status === 401) {
                navigate("/logout");
            } else {
                dispatch(showSnackbar({
                    message: "Something went wrong loading the table",
                    alertType: "error"
                }));
            }
        } catch (error) {
            dispatch(showSnackbar({
                message: "Something went wrong loading the table",
                alertType: "error"
            }));
        }
    }, [dispatch, navigate, endpoint])

    const rowsFetcher = useCallback(async () => {
        try {
            const url = `${currentDomain}api/hr/${endpoint}?p=${paginationModel.page}&ps=${paginationModel.pageSize}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem('accessToken')
                }
            });

            if (response.ok) {
                const data = await response.json();
                setRows(data.rows.map((row, index) => ({
                    ...row,
                    sno: index + 1
                })));
            } else if (response.status === 401) {
                navigate("/logout");
            } else {
                dispatch(showSnackbar({
                    message: "Failed to load data",
                    alertType: "error"
                }));
            }
        } catch (error) {
            dispatch(showSnackbar({
                message: "Something went wrong",
                alertType: "error"
            }));
        }
    }, [paginationModel.page, paginationModel.pageSize, dispatch, navigate, endpoint]);

    useEffect(() => {
        fetchRowCount();
    }, [dispatch, navigate, fetchRowCount]);

    useEffect(() => {
        rowsFetcher();
    }, [paginationModel, dispatch, navigate, rowsFetcher]);

    return {
        rows,
        rowCount,
        paginationModel,
        setPaginationModel,
        rowsFetcher
    };
};

export default useRowsFetcher;