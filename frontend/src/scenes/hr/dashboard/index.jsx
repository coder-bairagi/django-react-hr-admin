import PropTypes from 'prop-types'
import { Box, Button, IconButton, Typography, useTheme, Grid } from '@mui/material'
import Header from '../../../components/Header'
import { tokens } from '../../../theme'
import StatBox from '../../../components/StatBox'
import ProgressCircle from '../../../components/ProgressCircle'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import EmailIcon from '@mui/icons-material/Email'
import PointOfSaleIcon from '@mui/icons-material/PointOfSale'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import TrafficIcon from '@mui/icons-material/Traffic'
import { LineChart } from '../../../components/Charts/LineChart'
import { BarChart } from '../../../components/Charts/BarChart'
import { GeographyChart } from '../../../components/Charts/GeographyChart'
import { mockTransactions } from '../../../data/mockData'
import { useSelector } from 'react-redux'

const Dashboard = (props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const user = useSelector(state => state.user)
  const gridRowHeight_1 = "140"; // Concat px after this to make it work
  const gridRowHeight_2 = "310"; // Concat px after this to make it work
  const isMobile = window.innerWidth < 768;
  const stats = [
    {
      id: 1,
      title: "12,361",
      subtitle: "Email Sent",
      increasePercentage: "+14%",
      progress: "0.35",
      iconName: EmailIcon,
    },
    {
      id: 2,
      title: "4,31,225",
      subtitle: "Sales Made",
      increasePercentage: "+21%",
      progress: "0.5",
      iconName: PointOfSaleIcon,
    },
    {
      id: 3,
      title: "32,441",
      subtitle: "New Clients",
      increasePercentage: "+5%",
      progress: "0.30",
      iconName: PersonAddIcon,
    },
    {
      id: 4,
      title: "13,25,134",
      subtitle: "Traffic Inbound",
      increasePercentage: "+43%",
      progress: "0.80",
      iconName: TrafficIcon,
    }
  ]

  return (
    <>
      {/* Header */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={9}>
          <Header title="DASHBOARD" subtitle={"Welcome " + user.name} />
        </Grid>
        <Grid
          item xs={12} sm={12} md={3}
          display="flex"
          alignItems={{
            xs: "start",
            sm: "start",
            md: "center",
          }}
          justifyContent={{
            xs: "start",
            sm: "start",
            md: "end",
          }}
          p={{
            xs: "0 16px 16px 0",
            sm: "0 16px 16px 0",
            md: "16px 0 0 16px",
          }}
          marginTop={{
            xs: "-20px"
          }}>
          <Button sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            padding: "10px 20px",
            fontWeight: "bold",
            fontSize: "12px",
            '&:hover': {
              backgroundColor: colors.blueAccent[500],
            }
          }}>
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Grid>
      </Grid>

      {/* Grid & Charts */}
      {/* Row 1 */}
      <Grid container spacing={2}>
        {/* Stats Grid */}
        {stats.map((stat) => (
          <Grid item key={stat.id} xs={6} sm={6} md={3}>
            <Box
              backgroundColor={colors.primary[400]}
              display="flex"
              alignItems="center"
              justifyContent="center"
              height={gridRowHeight_1 + 'px'}
              marginBottom={{
                xs: "0px",
                md: "20px",
              }}
            >
              <StatBox
                title={stat.title}
                subtitle={stat.subtitle}
                increasePercentage={stat.increasePercentage}
                progress={stat.progress}
                icon={<stat.iconName sx={{
                  color: colors.greenAccent[600],
                  fontSize: "26px"
                }} />}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
      {/* Row 2 */}
      <Grid container spacing={2}>
        {/* Line Chart */}
        <Grid item xs={12} sm={12} md={8} marginTop={{ xs: "20px", md: "0" }}>
          <Box height={
            isMobile ? 'auto' : { gridRowHeight_2 } + 'px'
          }>
            <Box sx={{
              backgroundColor: `${colors.primary[400]}`,
              display: "flex",
              flexDirection: {
                xs: 'column',
                md: 'row'
              },
              justifyContent: {
                md: "space-between",
              },
              alignItems: {
                xs: "start",
                md: "center",
              },
              p: "25px 30px",
            }}>
              <Box>
                <Typography variant="h5" fontWeight="700" color={colors.grey[100]}>Transportation Across Countries</Typography>
                <Typography variant="h3" fontWeight="500" color={colors.greenAccent[500]}>Yearly Growth of 12%</Typography>
              </Box>
              <Box marginTop={{ xs: "5px", md: "0" }}>
                {/* <Button component={Link} to="/line-chart" variant="outlined" color="secondary" sx={{ mr: "5px", border: "1px solid", fontWeight: "bold" }}>
                  See Details
                </Button> */}
                <IconButton>
                  <DownloadOutlinedIcon sx={{
                    fontSize: "26px",
                    color: colors.greenAccent[500],
                  }}
                  />
                </IconButton>
              </Box>
            </Box>
            <Box sx={{
              backgroundColor: `${colors.primary[400]}`,
              width: "100%",
              height: "250px",
              mt: "-40px"
            }}>
              <LineChart isDashboard={true} />
            </Box>
          </Box>
        </Grid>
        {/* Transaction History */}
        <Grid item xs={12} sm={12} md={4} marginTop={{ xs: "5px", md: "0" }}>
          <Box sx={{
            backgroundColor: `${colors.primary[400]}`,
            height: `${gridRowHeight_2 + 'px'}`,
            p: "25px 30px",
            overflowY: "auto",
          }}>
            <Typography variant="h5" fontWeight="700" color={colors.grey[100]} borderBottom={`1px solid ${colors.grey[100]}`} pb="15px">Recent Transactions</Typography>
            {mockTransactions.map((transaction, i) => {
              return (
                <Box key={`${transaction.txId}-${i}`} sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: `1px solid ${colors.grey[100]}`,
                  p: "15px 0",
                }}>
                  <Box>
                    <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">{transaction.txId}</Typography>
                    <Typography color={colors.grey[100]}>{transaction.user}</Typography>
                  </Box>
                  <Box color={colors.grey[100]}>{transaction.user}</Box>
                  <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4 px">{transaction.cost}</Box>
                </Box>
              )
            })}
          </Box>
        </Grid>
      </Grid >
      {/* Row 3 */}
      <Grid container spacing={2}>
        {/* Campaign */}
        <Grid item xs={12} sm={6} md={4} marginTop={{ xs: "20px", md: "16px" }}>
          <Box height={
            isMobile ? 'auto' : { gridRowHeight_2 } + 'px'
          }>
            <Box sx={{
              backgroundColor: `${colors.primary[400]}`,
              p: "25px 30px",
            }}>
              <Typography variant="h5" fontWeight="700" color={colors.grey[100]} pb="15px">Campaign</Typography>
              <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <ProgressCircle size="150" fontSize="1rem" />
                <Typography variant="h5" color={colors.greenAccent[500]} mt="18px">₹5,26,520/-</Typography>
                <Typography variant="h5" color={colors.grey[100]} mt="2px">Include extra misc expenditures and costs</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* Country-wise Food Sales */}
        <Grid item xs={12} sm={12} md={4} marginTop={{ xs: "5px", md: "16px" }}>
          <Box height={
            isMobile ? 'auto' : { gridRowHeight_2 } + 'px'
          }>
            <Box sx={{
              backgroundColor: `${colors.primary[400]}`,
              p: "25px 30px",
            }}>
              <Box display="flex" justifyContent="space-between" marginBottom="25px">
                <Typography variant="h5" fontWeight="700" color={colors.grey[100]} pb="15px">Country-wise Food Sales</Typography>
                {/* <Button component={Link} to="/bar-chart" variant="outlined" color="secondary" sx={{ mr: "5px", border: "1px solid", fontWeight: "bold" }}>
                  See Details
                </Button> */}
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box sx={{
                  width: "100%",
                  height: "227px",
                  mt: "-40px"
                }}>
                  <BarChart isDashboard={true} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* Geography Based Traffic */}
        <Grid item xs={12} sm={12} md={4} marginTop={{ xs: "5px", md: "16px" }}>
        <Box height={
            isMobile ? 'auto' : { gridRowHeight_2 } + 'px'
          }>
            <Box sx={{
              backgroundColor: `${colors.primary[400]}`,
              p: "25px 30px",
            }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h5" fontWeight="700" color={colors.grey[100]} pb="15px">Geography Based Traffic</Typography>
                {/* <Button component={Link} to="/geography" variant="outlined" color="secondary" sx={{ mr: "5px", border: "1px solid", fontWeight: "bold" }}>
                  See Details
                </Button> */}
              </Box>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box sx={{
                  width: "100%",
                  height: "213px",
                }}>
                  <GeographyChart isDashboard={true} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid >
    </>
  )
}

Dashboard.propTypes = {
  userName: PropTypes.string,
}

export default Dashboard