import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
function ModalAddNewUser({openAlertModal, setOpenAlertModal, message}) {

    const handleClose = () => {
        setOpenAlertModal(false);
    };
    return (
        <Dialog
            open={openAlertModal}
            onClose={handleClose}
        >
            <DialogTitle>
                Thông báo
            </DialogTitle>
            <DialogContent>
                <DialogContentText className='model-alert-success-value'>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>OK</Button>
            </DialogActions>
        </Dialog>
    )
}
export default ModalAddNewUser;