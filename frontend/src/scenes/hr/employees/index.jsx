import { useState, useEffect } from 'react'
import { Box, Button } from '@mui/material'
import Header from '../../../components/Header'
import CustomSnackbar from '../../../components/CustomSnackbar'
import { currentDomain } from '../../../helper'
import { useDispatch } from 'react-redux'
import { showSnackbar } from '../../../redux/actions/actions'
import useRowsFetcher from '../../../hooks/useRowsFetcher'
import EmployeesGrid from './employeesGrid'
import RecordAdd from './recordAdd'

const Employees = () => {
    const [open, setOpen] = useState(false)
    const [jobPositions, setJobPositions] = useState(null)
    const [countries, setCountries] = useState(null)
    const dispatch = useDispatch()
    const { rows, rowCount, paginationModel, setPaginationModel, rowsFetcher } = useRowsFetcher('get-employees')

    useEffect(() => {
        const fetchJobPositions = async () => {
            try {
                const response = await fetch(`${currentDomain}api/hr/get-job-positions`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + localStorage.getItem('accessToken'),
                    }
                })

                if (response.ok) {
                    const data = await response.json()
                    setJobPositions(data.rows)
                } else {
                    dispatch(showSnackbar({
                        message: "Failed to load job positions",
                        alertType: "error"
                    }))
                }
            } catch (error) {
                dispatch(showSnackbar({
                    // message: error.message,
                    message: "Failed to load job positions",
                    alertType: "error"
                }))
            }
        }
        fetchJobPositions()
    }, [dispatch])

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch(`${currentDomain}api/hr/get-countries`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + localStorage.getItem('accessToken'),
                    }
                })

                if (response.ok) {
                    const data = await response.json()
                    setCountries(data.rows)
                } else {
                    dispatch(showSnackbar({
                        message: "Failed to load countries",
                        alertType: "error"
                    }))
                }
            } catch (error) {
                dispatch(showSnackbar({
                    // message: error.message,
                    message: "Failed to load countries",
                    alertType: "error"
                }))
            }
        }
        fetchCountries()
    }, [dispatch])

    return (
        <>
            <Header title="Employees" subtitle="List of Employees" />
            <Box m="20px 0">
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => setOpen(true)}
                >
                    Add New Employee
                </Button>
            </Box>
            <RecordAdd
                open={open}
                setOpen={setOpen}
                jobPositions={jobPositions}
                countries={countries}
                rowsFetcher={rowsFetcher}
            />
            <EmployeesGrid
                rows={rows}
                rowCount={rowCount}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                rowsFetcher={rowsFetcher}
                jobPositions={jobPositions}
                countries={countries}
            />
            <CustomSnackbar />
        </>
    )
}

export default Employees