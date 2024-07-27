import { Box, Button, Typography, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../../theme'
import { useDispatch } from 'react-redux'
import { showSnackbar } from '../../../redux/actions/actions'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import RecordView from './recordView'
import RecordDeactivate from './recordDeactivate'
import { useState } from 'react'
import { currentDomain } from '../../../helper'

const JobPositionsGrid = ({ rows, rowCount, paginationModel, setPaginationModel, rowsFetcher, departments }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const dispatch = useDispatch()
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    const [tempRecordId, setTempRecordId] = useState(null)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [employeeContent, setEmployeeContent] = useState(false)

    const columns = [
        { field: "sno", headerName: "S.No", flex: 0.25, minWidth: 50 },
        { field: "first_name", headerName: "First Name", flex: 0.65, minWidth: 150 },
        { field: "last_name", headerName: "Last Name", flex: 0.65, minWidth: 150 },
        { field: "email", headerName: "Email", flex: 1, minWidth: 150 },
        {
            field: "is_active", headerName: "Status", flex: 0.75, minWidth: 150, renderCell: (params) => {
                return params.row.is_active === true ? (
                    <Box display="flex" sx={{ mt: "15px" }}>
                        <CheckCircleOutlineOutlinedIcon color="success" />
                        <Typography color={colors.greenAccent[500]} sx={{ ml: "10px" }}>
                            Active
                        </Typography>
                    </Box>) :
                    (
                        <Box display="flex" sx={{ mt: "15px" }}>
                            <CancelOutlinedIcon color="error" />
                            <Typography color={colors.redAccent[500]} sx={{ ml: "10px" }}>
                                Inactive
                            </Typography>
                        </Box>
                    )
            }
        },
        {
            field: "id", headerName: "Actions", flex: 1.15, minWidth: 150, renderCell: (params) => {
                const recordId = params.row.id
                return (
                    <Box key={`actions-${params.row.sno}`} sx={{
                        display: "flex !important",
                        justifyContent: "flex-start",
                        marginTop: "10px"
                    }}>
                        <Button sx={{ marginRight: "5px" }} color="secondary" variant="outlined" startIcon={<InfoOutlinedIcon />} onClick={() => handleViewDetailsRecord(recordId)}>
                            Details
                        </Button>
                        {params.row.is_active === true ?
                            <Button sx={{ marginLeft: "5px" }} color="error" variant="outlined" startIcon={<DeleteOutlineOutlinedIcon />} onClick={() => handleDeactivateRecord(recordId)}>
                                Deactivate
                            </Button>
                            :
                            <Button sx={{ marginLeft: "5px" }} color="success" variant="outlined" startIcon={<DeleteOutlineOutlinedIcon />} onClick={() => handleActivateRecord(recordId)}>
                                Activate
                            </Button>
                        }
                    </Box>
                )
            }
        }
    ]

    const handleViewDetailsRecord = async (recordId) => {
        try {
            const response = await fetch(`${currentDomain}api/hr/get-employee/${recordId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('accessToken'),
                }
            })

            if (!response.ok) {
                dispatch(showSnackbar({
                    message: "Failed to Fetch Employee Data",
                    alertType: "error"
                }))
            }

            const data = await response.json()
            setEmployeeContent(data.employee)
        } catch (error) {
            dispatch(showSnackbar({
                // message: error.message,
                message: "Something went wrong",
                alertType: "error"
            }))
        }
        setDialogOpen(true)
    }

    const handleDeactivateRecord = (recordId) => {
        setTempRecordId(recordId)
        setOpenConfirmationModal(true)
    }


    // Confirmation to deactivate employee
    const handleConfirm = async () => {
        if (tempRecordId === 20) {
            alert("Only Admin can Deactivate Employee Harish Gupta, You can Deactivate Any Other Employee")
        } else {
            try {
                const response = await fetch(`${currentDomain}api/hr/toogle-employee-status`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + localStorage.getItem('accessToken'),
                    },
                    body: JSON.stringify({
                        id: tempRecordId,
                    })
                })

                if (!response.ok) {
                    dispatch(showSnackbar({
                        message: "Failed to Deactivate Employee",
                        alertType: "error"
                    }))
                }

                setOpenConfirmationModal(false)
                setTempRecordId(null)
                rowsFetcher()
                dispatch(showSnackbar({
                    message: "Employee Deactivated Successfully",
                    alertType: "success"
                }))
            } catch (error) {
                dispatch(showSnackbar({
                    // message: error.message,
                    message: "Something went wrong",
                    alertType: "error"
                }))
            }
        }
    }

    const handleActivateRecord = async (recordId) => {
        try {
            const response = await fetch(`${currentDomain}api/hr/toogle-employee-status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('accessToken'),
                },
                body: JSON.stringify({
                    id: recordId,
                })
            })

            if (!response.ok) {
                dispatch(showSnackbar({
                    message: "Failed to Activate Employee",
                    alertType: "error"
                }))
            }

            rowsFetcher()
            dispatch(showSnackbar({
                message: "Employee Activated Successfully",
                alertType: "success"
            }))
        } catch (error) {
            dispatch(showSnackbar({
                // message: error.message,
                message: "Something went wrong",
                alertType: "error"
            }))
        }
    }

    const handleCancel = () => {
        setOpenConfirmationModal(false)
        setTempRecordId(null)
    }

    return (
        <>
            <RecordView recordId={tempRecordId}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                content={employeeContent}
            />
            <RecordDeactivate
                open={openConfirmationModal}
                setOpen={setOpenConfirmationModal}
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
            />
            <Box m="40px 0 0 0" height="75vh" width="100%" sx={{
                "& .MuiDataGrid-root": { border: "none" },
                "& .MuiDataGrid-columnHeaderTitle": { color: colors.greenAccent[300], fontWeight: "bold" },
                "& .MuiDataGrid-cell": { borderBottom: "none" },
                "& .MuiDataGrid-footerContainer": { borderTop: "none" },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": { color: colors.grey[100] },
            }}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    slots={{ toolbar: GridToolbar }}
                    paginationMode="server"
                    onPaginationModelChange={setPaginationModel}
                    rowCount={rowCount}
                    initialState={{ pagination: { paginationModel: { page: 0, pageSize: 25 } } }}
                />
            </Box>
        </>
    )
}

export default JobPositionsGrid