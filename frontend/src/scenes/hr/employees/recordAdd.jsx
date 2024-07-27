import { useState, useRef } from 'react'
import { Box, Button, TextField, Select, MenuItem, InputLabel, FormControl, FormHelperText, useTheme } from '@mui/material'
import CustomModal from '../../../components/CustomModal'
import { Formik } from 'formik'
import * as yup from 'yup'
import { currentDomain } from '../../../helper'
import { useDispatch } from 'react-redux'
import { showSnackbar } from '../../../redux/actions/actions'

const RecordAdd = ({ open, setOpen, jobPositions, countries, rowsFetcher }) => {
    const theme = useTheme()
    const dispatch = useDispatch()
    const [formSubmitting, setFormSubmitting] = useState(false)
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const contactRef = useRef()
    const jobPositionRef = useRef()
    const addressRef = useRef()
    const cityRef = useRef()
    const postalCodeRef = useRef()
    const stateRef = useRef()
    const countryRef = useRef()
    const workingFromRef = useRef()

    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        contact: '',
        job_position: '',
        address: '',
        city: '',
        postal_code: '',
        state: '',
        country: '',
        working_from: '',

    }

    const validationSchema = yup.object().shape({
        first_name: yup.string().required("Required"),
        last_name: yup.string().required("Required"),
        email: yup.string().required("Required"),
        password: yup
            .string()
            .min(6, 'Password must be at least 6 characters')
            .required("Required"),
        contact: yup
            .string()
            .length(10, 'Contact must be exactly 10 digits')
            .matches(/^[0-9]+$/, 'Contact must be a valid number')
            .required("Required"),
        job_position: yup.string().required("Required"),
        address: yup.string().required("Required"),
        city: yup.string().required("Required"),
        postal_code: yup
            .string()
            .length(6, 'Postal code must be exactly 6 digits')
            .matches(/^[0-9]+$/, 'Postal code must be a valid number')
            .required("Required"),
        state: yup.string().required("Required"),
        country: yup.string().required("Required"),
        working_from: yup.string().required("Required"),
    })

    const handleFormSubmit = async (values, { resetForm }) => {
        setFormSubmitting(true)

        try {
            const response = await fetch(`${currentDomain}api/hr/add-employee`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('accessToken'),
                },
                body: JSON.stringify(values)
            })

            if (response.ok) {
                dispatch(showSnackbar({
                    message: "Employee Added Successfully",
                    alertType: "success"
                }))
                setOpen(false)
                rowsFetcher()
                resetForm()
            } else {
                const data = await response.json()
                dispatch(showSnackbar({
                    message: data.error,
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
        <CustomModal
            open={open}
            handleClose={() => setOpen(false)}
            isOverdropClose={false}
            title="Add Employee"
            width="80%"
            bgcolor={theme.palette.background.default}
            children={() => {
                return (
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
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
                                <Box display="grid">
                                    <Box sx={{
                                        display: 'grid',
                                        gridTemplateColumns: 'repeat(3, 1fr)',
                                        gap: "30px",
                                        "& .MuiInputBase-input": {
                                            paddingTop: "20px",
                                            paddingBottom: "20px",
                                        }
                                    }}>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            placeholder="First Name"
                                            inputRef={firstNameRef}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.first_name}
                                            name="first_name"
                                            error={!!touched.first_name && !!errors.first_name}
                                            helperText={touched.first_name && errors.first_name}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            placeholder="Last Name"
                                            inputRef={lastNameRef}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.last_name}
                                            name="last_name"
                                            error={!!touched.last_name && !!errors.last_name}
                                            helperText={touched.last_name && errors.last_name}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="email"
                                            placeholder="Email"
                                            inputRef={emailRef}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            name="email"
                                            error={!!touched.email && !!errors.email}
                                            helperText={touched.email && errors.email}
                                        />
                                        <Box display="flex">
                                            <TextField
                                                fullWidth
                                                variant="filled"
                                                type="text"
                                                placeholder="Set Password"
                                                inputRef={passwordRef}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.password}
                                                name="password"
                                                error={!!touched.password && !!errors.password}
                                                helperText={touched.password && errors.password}
                                            />
                                        </Box>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="number"
                                            placeholder="Contact / Mobile Number"
                                            inputRef={contactRef}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.contact}
                                            name="contact"
                                            error={!!touched.contact && !!errors.contact}
                                            helperText={touched.contact && errors.contact}
                                        />
                                        <FormControl
                                            variant="filled"
                                            fullWidth
                                            error={!!touched.job_position && !!errors.job_position}
                                        >
                                            <InputLabel id="job-position-label">Select Job Position</InputLabel>
                                            <Select
                                                labelId="job-position-label"
                                                id="job_position"
                                                name="job_position"
                                                value={values.job_position}
                                                inputRef={jobPositionRef}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            >
                                                {jobPositions.map((job_position) => (
                                                    <MenuItem key={job_position.id} value={job_position.id}>
                                                        {job_position.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {touched.job_position && errors.job_position && (
                                                <FormHelperText>{errors.job_position}</FormHelperText>
                                            )}
                                        </FormControl>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            placeholder="Address"
                                            inputRef={addressRef}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.address}
                                            name="address"
                                            error={!!touched.address && !!errors.address}
                                            helperText={touched.address && errors.address}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            placeholder="City"
                                            inputRef={cityRef}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.city}
                                            name="city"
                                            error={!!touched.city && !!errors.city}
                                            helperText={touched.city && errors.city}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            placeholder="Postal Code"
                                            inputRef={postalCodeRef}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.postal_code}
                                            name="postal_code"
                                            error={!!touched.postal_code && !!errors.postal_code}
                                            helperText={touched.postal_code && errors.postal_code}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            placeholder="State"
                                            inputRef={stateRef}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.state}
                                            name="state"
                                            error={!!touched.state && !!errors.state}
                                            helperText={touched.state && errors.state}
                                        />
                                        <FormControl
                                            variant="filled"
                                            fullWidth
                                            error={!!touched.country && !!errors.country}
                                        >
                                            <InputLabel id="country-label">Select Country</InputLabel>
                                            <Select
                                                labelId="country-label"
                                                id="country"
                                                name="country"
                                                value={values.country}
                                                inputRef={countryRef}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                            >
                                                {countries.map((country) => (
                                                    <MenuItem key={country.id} value={country.id}>
                                                        {country.name}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {touched.country && errors.country && (
                                                <FormHelperText>{errors.country}</FormHelperText>
                                            )}
                                        </FormControl>
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            inputRef={workingFromRef}
                                            onFocus={() => { workingFromRef.current.type = "date" }}
                                            placeholder="Working From"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.working_from}
                                            name="working_from"
                                            error={!!touched.working_from && !!errors.working_from}
                                            helperText={touched.working_from && errors.working_from}
                                        />
                                    </Box>
                                    <Box display="flex" justifyContent="end" mt="40px">
                                        <Button type="submit" color="secondary" variant="contained" disabled={formSubmitting}>
                                            Add Employee
                                        </Button>
                                    </Box>
                                </Box>
                            </form>
                        )}
                    </Formik>
                )
            }}>
        </CustomModal>
    )
}

export default RecordAdd
