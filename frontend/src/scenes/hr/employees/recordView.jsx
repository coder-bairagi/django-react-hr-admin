import { Box, Typography } from '@mui/material'
import Dialog from '../../../components/Dialog'

const RecordView = ({ recordId, dialogOpen, setDialogOpen, content }) => {
    const dialogScrollType = "paper"

    return (
        <>
            <Dialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                scrollType={dialogScrollType}
                title={`Details of ${content.first_name} ${content.last_name}`}
                content={
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
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5">First Name</Typography>
                                <Typography variant="h6">{content.first_name}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5">Last Name</Typography>
                                <Typography variant="h6">{content.last_name}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5">Email</Typography>
                                <Typography variant="h6">{content.email}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5">Status</Typography>
                                {content.is_active === 1 ?
                                    <Typography variant="h6">Active</Typography>
                                    :
                                    <Typography variant="h6">Inactive</Typography>
                                }
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5">Job Position</Typography>
                                <Typography variant="h6">{content.job_position_name}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5">Address</Typography>
                                <Typography variant="h6">{content.address}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5">City</Typography>
                                <Typography variant="h6">{content.city}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5">State</Typography>
                                <Typography variant="h6">{content.state}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5">Postal Code</Typography>
                                <Typography variant="h6">{content.postal_code}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5">Country</Typography>
                                <Typography variant="h6">{content.country_name}</Typography>
                            </Box>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="h5">Working From</Typography>
                                <Typography variant="h6">{content.working_from}</Typography>
                            </Box>
                        </Box>
                    </Box>
                }
            />
        </>
    )
}

export default RecordView
