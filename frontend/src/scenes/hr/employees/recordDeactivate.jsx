import ConfirmationModal from "../../../components/ConfirmationModal"

const RecordDeactivate = ({ open, setOpen, handleConfirm, handleCancel }) => {
    const title = "Confirm Deactivation"
    const message = "Deactivation Meaning: Employee is leaving the company, his/her record will still be visible in the records but status will be updated to Inactive. Employee will no longer able to sign-in. Are you sure you want to proceed ?"

    return (
        <>
            <ConfirmationModal
                title={title}
                message={message}
                open={open}
                setOpen={setOpen}
                handleConfirm={handleConfirm}
                handleCancel={handleCancel}
            />
        </>
    )
}

export default RecordDeactivate
