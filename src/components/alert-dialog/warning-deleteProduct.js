import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../Redux/userslice';
import AlertSuccess from './alert-success';

function WarningDeleteProductModal(props) {
    const handleClose = () => {
        props.setOpenModal(false);
    };
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const handleConfirm = () => {
        dispatch(deleteProduct(props.product));
        setModal(true);
        setMessage("Sản phẩm đã được xóa khỏi giỏ hàng!");
        props.setOpenModal(false);
    }
    return (
        <>
        <Dialog
            open={props.openModal}
            onClose={handleClose}
        >
            <DialogTitle>
                Thông báo
            </DialogTitle>
            <DialogContent>
                <DialogContentText className='model-alert-success-value'>
                    Bạn có chắn chắc muốn xóa sản phẩm này?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='success' onClick={handleConfirm}>Đồng ý</Button>
                <Button color= 'warning' onClick={handleClose}>Hủy</Button>
            </DialogActions>
        </Dialog>
        <AlertSuccess open = {modal} setOpen = {setModal} message = {message} />
        </>
    )
}
export default WarningDeleteProductModal;