import { useState, useEffect } from 'react'
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, useTheme } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../../../components/Header'
import CustomModal from '../../../components/CustomModal'
import CustomSnackbar from '../../../components/CustomSnackbar'
import { currentDomain } from '../../../helper'
import { useDispatch } from 'react-redux'
import { showSnackbar } from '../../../redux/actions/actions'
import useRowsFetcher from '../../../hooks/useRowsFetcher'
import JobPositionsGrid from './jobPositionsGrid'

const JobPositions = () => {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [departments, setDepartments] = useState(null)
    const [formSubmitting, setFormSubmitting] = useState(false)
    const dispatch = useDispatch()
    const { rows, rowCount, paginationModel, setPaginationModel, rowsFetcher } = useRowsFetcher('get-job-positions')

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const response = await fetch(`${currentDomain}api/hr/get-departments`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + localStorage.getItem('accessToken'),
                    }
                })

                if (response.ok) {
                    const data = await response.json()
                    setDepartments(data.rows)
                } else {
                    dispatch(showSnackbar({
                        message: "Failed to load departments",
                        alertType: "error"
                    }))
                }
            } catch (error) {
                dispatch(showSnackbar({
                    // message: error.message,
                    message: "Failed to load departments",
                    alertType: "error"
                }))
            }
        }
        fetchDepartments()
    }, [dispatch])

    const initialValues = {
        name: '',
        department: ''

    }

    const checkoutSchema = yup.object().shape({
        name: yup.string().required("Required"),
        department: yup.string().required("Required"),

    })

    const handleFormSubmit = async (values, { resetForm }) => {
        setFormSubmitting(true)

        try {
            const response = await fetch(`${currentDomain}api/hr/add-job-position`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(values)
            })

            if (response.ok) {
                dispatch(showSnackbar({
                    message: "Job Position Added Successfully",
                    alertType: "success"
                }))
                setOpen(false)
                rowsFetcher()
                resetForm()
            } else {
                dispatch(showSnackbar({
                    message: "Failed to Add Job Position",
                    alertType: "error"
                }))
            }
        } catch (error) {
            dispatch(showSnackbar({
                // message: error.message,
                message: "Something went wrong",
                alertType: "error"
            }))
        } finally {
            setFormSubmitting(false)
        }
    }

    return (
        <>
            <Header title="Job Positions" subtitle="List of Job Positions" />
            <Box m="20px 0">
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => setOpen(true)}
                >
                    Add New Job Position
                </Button>
            </Box>
            <JobPositionsGrid
                rows={rows}
                rowCount={rowCount}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                rowsFetcher={rowsFetcher}
                departments={departments}
            />
            <CustomModal
                open={open}
                handleClose={() => setOpen(false)}
                title="Add New Job Position"
                width="45%"
                bgcolor={theme.palette.background.default}
                children={() => {
                    return (
                        <Formik
                            onSubmit={handleFormSubmit}
                            initialValues={initialValues}
                            validationSchema={checkoutSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box display="grid" gap="30px">
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Job Position Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}
                                            name="name"
                                            error={!!touched.name && !!errors.name}
                                            helperText={touched.name && errors.name}
                                        />
                                        <FormControl
                                            variant="filled"
                                            fullWidth
                                            error={!!touched.department && !!errors.department}
                                        >
                                            <InputLabel id="department-label">Link to Department</InputLabel>
                                            <Select
                                                labelId="department-label"
                                                id="department"
                                                name="department"
                                                value={values.department}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            >
                                                {departments.map((department) => (
                                                    <MenuItem key={department.id} value={department.id}>
                                                        {department.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {touched.department && errors.department && (
                                                <FormHelperText>{errors.department}</FormHelperText>
                                            )}
                                        </FormControl>
                                        <Box display="flex" justifyContent="end" mt="10px">
                                            <Button type="submit" color="secondary" variant="contained" disabled={formSubmitting}>
                                                Add Job Position
                                            </Button>
                                        </Box>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    )
                }}>
            </CustomModal>
            <CustomSnackbar />
        </>
    )
}

export default JobPositions