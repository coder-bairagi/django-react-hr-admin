import CustomModal from "../../../components/CustomModal"
import { Box, Button, TextField, useTheme } from "@mui/material"
import { Formik } from 'formik'
import * as yup from 'yup'
import CustomSnackbar from '../../../components/CustomSnackbar'
import { currentDomain } from '../../../helper'
import { useDispatch } from 'react-redux'
import { showSnackbar } from '../../../redux/actions/actions'
import { useState } from "react"

const RecordUpdate = ({ recordId, recordName, refreshData, open, setOpen }) => {
  const theme = useTheme()
  const [formSubmitting, setFormSubmitting] = useState(false)
  const dispatch = useDispatch()

  const initialValues = {
    name: recordName
  }

  const yupSchema = yup.object().shape({
    name: yup.string().required("Required"),
  })

  const handleFormSubmit = async (values) => {
    setFormSubmitting(true)

    if (recordId === 1) {
      alert("Only Admin can Update Human Resouce Department, You can Update Any Other Department")
      setFormSubmitting(false)
    } else {
      try {
        const response = await fetch(`${currentDomain}api/hr/update-department`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + localStorage.getItem('accessToken'),
          },
          body: JSON.stringify({
            name: values.name,
            id: recordId
          })
        })

        if (response.ok) {
          dispatch(showSnackbar({
            message: "Department Updated Successfully",
            alertType: "success"
          }))
          setOpen(false)
          refreshData()
        } else {
          dispatch(showSnackbar({
            message: "Failed to Update Department",
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
        title="Update Department"
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
                        Update Department
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
