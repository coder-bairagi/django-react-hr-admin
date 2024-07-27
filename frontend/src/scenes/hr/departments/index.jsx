import { useState } from 'react'
import { Box, Button, TextField, useTheme } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import Header from '../../../components/Header'
import CustomModal from '../../../components/CustomModal'
import CustomSnackbar from '../../../components/CustomSnackbar'
import { currentDomain } from '../../../helper'
import { useDispatch } from 'react-redux'
import { showSnackbar } from '../../../redux/actions/actions'
import useRowsFetcher from '../../../hooks/useRowsFetcher'
import DepartmentsGrid from './departmentsGrid'

const Departments = () => {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [formSubmitting, setFormSubmitting] = useState(false)
    const dispatch = useDispatch()
    const { rows, rowCount, paginationModel, setPaginationModel, rowsFetcher } = useRowsFetcher('get-departments')

    const initialValues = {
        name: ''
    }

    const checkoutSchema = yup.object().shape({
        name: yup.string().required("Required"),
    })

    const handleFormSubmit = async (values, { resetForm }) => {
        setFormSubmitting(true)

        try {
            const response = await fetch(`${currentDomain}api/hr/add-department`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(values)
            })

            if (response.ok) {
                dispatch(showSnackbar({
                    message: "Department Added Successfully",
                    alertType: "success"
                }))
                setOpen(false)
                rowsFetcher()
                resetForm()
            } else {
                dispatch(showSnackbar({
                    message: "Failed to Add Department",
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
            <Header title="Departments" subtitle="List of Departments" />
            <Box m="20px 0">
                <Button
                    color="secondary"
                    variant="outlined"
                    onClick={() => setOpen(true)}
                >
                    Add New Department
                </Button>
            </Box>
            <DepartmentsGrid
                rows={rows}
                rowCount={rowCount}
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
                rowsFetcher={rowsFetcher}
            />
            <CustomModal
            open={open}
            handleClose={() => setOpen(false)}
            title="Add New Department"
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
                                        label="Department Name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.name}
                                        name="name"
                                        error={!!touched.name && !!errors.name}
                                        helperText={touched.name && errors.name}
                                    />
                                    <Box display="flex" justifyContent="end" mt="10px">
                                        <Button type="submit" color="secondary" variant="contained" disabled={formSubmitting}>
                                            Add Department
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

export default Departments