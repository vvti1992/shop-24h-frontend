import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import { useState } from 'react';
import ModalAddNewUser from './alertModa-addNewUser';

function DeleteProductModal({openAlertModal, setOpenAlertModal, productId, state, setState}) {
    const handleClose = () => {
        setOpenAlertModal(false);
        setState(!state);
    };
    const API = async (paramUrl, paramOption = {}) => {
        const Fetch = await fetch(paramUrl, paramOption);
        const response = await Fetch.json();
        return response;
    }
    const [modal, setModal] = useState(false)
    const [message, setMessage] = useState("");
    const handleConfirm = () => {
        API('http://localhost:8000/products/' + productId, {
            method: 'DELETE'
          })
        .then(() => {
            setMessage("Xóa thành công");
            setModal(true);
            handleClose();
        })
        .catch((error) => {
            setMessage("Xóa dữ liệu bị lỗi, vui lòng thử lại!");
            setModal(true);
            handleClose();
        });
    }
    return (
        <>
        <Dialog
            open={openAlertModal}
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
        <ModalAddNewUser openAlertModal={modal} setOpenAlertModal={setModal} message={message} />
        </>
    )
}
export default DeleteProductModal;