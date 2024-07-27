import CustomModal from "../../../components/CustomModal"
import { Box, Button, TextField, InputLabel, Select, MenuItem, FormControl, FormHelperText, useTheme } from "@mui/material"
import { Formik } from 'formik'
import * as yup from 'yup'
import CustomSnackbar from '../../../components/CustomSnackbar'
import { currentDomain } from '../../../helper'
import { useDispatch } from 'react-redux'
import { showSnackbar } from '../../../redux/actions/actions'
import { useState } from "react"

const RecordUpdate = ({ recordId, name, departmentName, departmentId, departments, refreshData, open, setOpen }) => {
  const theme = useTheme()
  const [formSubmitting, setFormSubmitting] = useState(false)
  const dispatch = useDispatch()

  const initialValues = {
    name: name,
    departmentId: departmentId,
    departmentName: departmentName,
  }

  const yupSchema = yup.object().shape({
    name: yup.string().required("Required"),
    departmentId: yup.string().required("Required"),
    departmentName: yup.string().required("Required"),
  })

  const handleFormSubmit = async (values) => {
    setFormSubmitting(true)

    if (recordId === 3) {
      alert("Only Admin can Update HR Specialist, You can Update Any Other Job Position")
      setFormSubmitting(false)
    } else {
      try {
        const response = await fetch(`${currentDomain}api/hr/update-job-position`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('accessToken'),
          },
          body: JSON.stringify({
            name: values.name,
            department: values.departmentId,
            id: recordId
          })
        })

        if (response.ok) {
          dispatch(showSnackbar({
            message: "Job Position Updated Successfully",
            alertType: "success"
          }))
          setOpen(false)
          refreshData()
        } else {
          dispatch(showSnackbar({
            message: "Failed to Update Job Position",
            alertType: "error"
          }))
        }
      } catch (error) {
        dispatch(showSnackbar({
          message: "Something went wrong",
          alertType: "error"
        }))
      } finally {
        setFormSubmitting(false)
      }
    }
  }

  return (
    <>
      <CustomSnackbar />
      <CustomModal
        open={open}
        handleClose={() => setOpen(false)}
        title="Update Job Position"
        width="45%"
        bgcolor={theme.palette.background.default}
        children={() => {
          return (
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={yupSchema}
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
                      error={!!touched.departmentName && !!errors.departmentName}
                    >
                      <InputLabel id="department-label">Link to Department</InputLabel>
                      <Select
                        labelId="department-label"
                        id="department"
                        name="departmentId"
                        value={values.departmentId}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      >
                        {departments.map((department) => (
                          <MenuItem key={department.id} value={department.id} selected={departmentId === department.id}>
                            {department.name}
                          </MenuItem>
                        ))}
                      </Select>
                      {touched.departmentName && errors.departmentName && (
                        <FormHelperText>{errors.departmentName}</FormHelperText>
                      )}
                    </FormControl>
                    <Box display="flex" justifyContent="end" mt="10px">
                      <Button type="submit" color="secondary" variant="contained" disabled={formSubmitting}>
                        Update Job Position
                      </Button>
                    </Box>
                  </Box>
                </form>
              )}
            </Formik>
          )
        }}>
      </CustomModal>
    </>
  )
}

export default RecordUpdate
