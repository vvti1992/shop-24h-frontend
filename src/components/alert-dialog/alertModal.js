import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { deleteAllProduct } from '../../Redux/userslice';

function AlertModal({openAlertModal, setOpenAlertModal, message}) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleClose = () => {
        setOpenAlertModal(false);
        navigate("/");
        dispatch(deleteAllProduct());
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
export default AlertModal;