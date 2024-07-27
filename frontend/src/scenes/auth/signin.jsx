import { useState } from 'react'
import { Typography, useTheme } from '@mui/material'
import { tokens } from '../../theme'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Container from '@mui/material/Container'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { showSnackbar, hideSnackbar, setUserInfo } from '../../redux/actions/actions'
import { currentDomain, getJwtExpiration } from '../../helper'
import CustomSnackbar from '../../components/CustomSnackbar'
import LoadingButton from '@mui/lab/LoadingButton'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Stark Industries
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignIn = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [buttonLoading, setButtonLoading] = useState(false)

  const initialValues = {
    email: "",
    password: "",
  }

  const userSchema = yup.object().shape({
    email: yup.string().required("Required"),
    password: yup.string().required("Required"),
  })

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
      setButtonLoading(true)
      const response = await fetch(currentDomain + "api/hr/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values)
      })

      if (response.ok) {
        const data = await response.json()
        dispatch(showSnackbar({
          message: "Sign-in Successful, Redirecting you to Dashboard",
          alertType: "success"
        }))
        // Set userinfo
        dispatch(setUserInfo({
          name: data.user.first_name + " " + data.user.last_name,
          jobPosition: data.employee.job_position,
          accessToken: data.token.access,
          exp: getJwtExpiration(data.token.access),
          refreshToken: data.token.refresh,
        }))
        setTimeout(() => {
          // Redirect to Dashboard after successful sign-in
          dispatch(hideSnackbar())
          navigate("/dashboard")
        }, 2000);
      } else {
        setButtonLoading(false)
        const data = await response.json()
        dispatch(showSnackbar({
          // message: "Error: " + data.error,
          message: data.error,
          alertType: "error"
        }))
      }
    } catch (error) {
      setButtonLoading(false)
      // Show error in a mui snackbar
      dispatch(showSnackbar({
        // message: "Error: " + error.message,
        message: "Something went wrong",
        alertType: "error"
      }))
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CustomSnackbar />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik onSubmit={handleFormSubmit} initialValues={initialValues} validationSchema={userSchema}>
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {
            return (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mt: 1 }}>
                  <TextField
                    margin="normal"
                    fullWidth
                    type="email"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{
                      '& label.Mui-focused': {
                        color: colors.grey[100],
                      },
                      '& .css-p51h6s-MuiInputBase-input-MuiOutlinedInput-input:-webkit-autofill': {
                        boxShadow: `${"0 0 0 100px " + theme.palette.background.default + " inset !important"}`,
                      },
                    }}
                  />
                  <TextField
                    margin="normal"
                    fullWidth
                    type="password"
                    label="Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.password}
                    name="password"
                    error={!!touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    sx={{
                      '& label.Mui-focused': {
                        color: colors.grey[100],
                      },
                    }}
                  />
                  <LoadingButton
                    type="submit"
                    fullWidth
                    sx={{
                      mt: 3,
                      mb: 2,
                      color: `${colors.grey[100]}`,
                      border: `1px solid ${colors.greenAccent[500]}`,
                      "&:hover": {
                        backgroundColor: `${colors.greenAccent[500]}`,
                      },
                    }}
                    loading={buttonLoading}
                  >
                    Sign in
                  </LoadingButton>
                  <Grid container>
                    <Grid item xs>
                      <Link component={RouterLink} to="/forgot-password" variant="body2">
                        Forgot password?
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )
          }}
        </Formik>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

export default SignIn