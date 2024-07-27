import { Box, Button, useTheme } from '@mui/material'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { tokens } from '../../../theme'
import { useDispatch } from 'react-redux'
import { showSnackbar } from '../../../redux/actions/actions'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import RecordUpdate from './recordUpdate'
import RecordDelete from './recordDelete'
import { useState } from 'react'
import { currentDomain } from '../../../helper'

const DepartmentsGrid = ({ rows, rowCount, paginationModel, setPaginationModel, rowsFetcher }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const dispatch = useDispatch()
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false)
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [tempRecordId, setTempRecordId] = useState(null)
    const [tempRecordName, setTempRecordName] = useState(null)

    const columns = [
        { field: "sno", headerName: "S.No", flex: 0.5, minWidth: 50 },
        { field: "name", headerName: "Name", flex: 1, minWidth: 150 },
        { field: "formatted_created_at", headerName: "Date Created", flex: 1, minWidth: 150 },
        { field: "formatted_updated_at", headerName: "Date Modified", flex: 1, minWidth: 150 },
        {
            field: "id", headerName: "Actions", flex: 1, minWidth: 150, renderCell: (params) => {
                const recordId = params.row.id
                const recordName = params.row.name
                return (
                    <Box key={`actions-${params.row.sno}`} sx={{
                        display: "flex !important",
                        justifyContent: "flex-start",
                        mt: "8px",
                        marginLeft: "0"
                    }}>
                        <Button sx={{ cursor: "pointer", paddingLeft: "0", marginLeft: "-15px" }} onClick={() => handleUpdateRecord(recordId, recordName)}>
                            <EditOutlinedIcon sx={{ "color": colors.blueAccent[500] }} />
                        </Button>
                        <Button sx={{ cursor: "pointer", paddingLeft: "0", marginLeft: "-15px" }} onClick={() => handleDeleteRecord(recordId)}>
                            <DeleteOutlineOutlinedIcon sx={{ "color": colors.redAccent[500] }} />
                        </Button>
                    </Box>
                )
            }
        }
    ]

    const handleUpdateRecord = (recordId, recordName) => {
        setTempRecordId(recordId)
        setTempRecordName(recordName)
        setOpenUpdateModal(true)
    }

    const handleDeleteRecord = (recordId) => {
        setTempRecordId(recordId)
        setOpenConfirmationModal(true)
    }

    const handleConfirm = async () => {
        if (tempRecordId === 1) {
            alert("Only Admin can Delete Human Resouce Department, You can Delete Any Other Department")
        } else {
            try {
                const response = await fetch(`${currentDomain}api/hr/delete-department/${tempRecordId}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + localStorage.getItem('accessToken'),
                    }
                })

                if (!response.ok) {
                    dispatch(showSnackbar({
                        message: "Failed to Delete Department",
                        alertType: "error"
                    }))
                }

                setOpenConfirmationModal(false)
                setTempRecordId(null)
                rowsFetcher()
                dispatch(showSnackbar({
                    message: "Department Deleted Successfully",
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

    const handleCancel = () => {
        setOpenConfirmationModal(false)
        setTempRecordId(null)
    }

    return (
        <>
            <RecordUpdate
                open={openUpdateModal}
                setOpen={setOpenUpdateModal}
                refreshData={rowsFetcher}
                recordId={tempRecordId}
                recordName={tempRecordName}
            />
            <RecordDelete
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

export default DepartmentsGrid