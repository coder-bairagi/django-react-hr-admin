import ConfirmationModal from "../../../components/ConfirmationModal"

const RecordDelete = ({ open, setOpen, handleConfirm, handleCancel }) => {
    const title = "Confirm Delete"
    const message = "If you delete a job position, everything linked to it will also be deleted. This action cannot be undone. Are you sure you want to proceed ?"

    return (
        <>
            <ConfirmationModal
                title={title}
                message={message}
                open={open}
                setOpen={setOpen}
                handleConfirm={handleConfirm}
                handleCancel={handleCancel} />
        </>
    )
}

export default RecordDelete
