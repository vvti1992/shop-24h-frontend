import { Modal, Box, TextField, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Button, Input, Col, Row, Label } from 'reactstrap'
import ModalAddNewUser from './alertModa-addNewUser';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 800,
    minWidth: "60%",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function EditOrderModal({ openModal, setOpenModal, order, state, setState}) {
    //Đóng modal
    const handleClose = () => {
        setOpenModal(false);
        setState(!state);
    }
    //Hàm gọi API tạo đơn hàng
    const API = async (paramUrl, paramOption = {}) => {
        const Fetch = await fetch(paramUrl, paramOption);
        const response = await Fetch.json();
        return response;
    }
    //Khai báo biến lưu thông tin
    const [status, setStatus] = useState("");
    const [note, setNote] = useState("");
    const [shipDate, setShipDate] = useState("");

    useEffect(() => {
        setStatus(order.status);
        setNote(order.note);
        setShipDate(order.shippedDate);
    }, [order])
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("");
    //hàm kiểm tra dữ liệu người dùng nhập
    const validateData = () => {
        if (status === undefined || status === "") {
            setModal(true);
            setMessage("Chọn trạng thái!");
            return false;
        }
        if (shipDate === undefined || shipDate.trim() === "") {
            setModal(true);
            setMessage("Nhập ngày giao hàng dự kiến!");
            return false;
        }
        return true;
    }
    //Khi nhấn nút xác nhận
    const onBtnConfirmClk = () => {
        //Nếu đúng thì tạo người dùng mới
        if (validateData()) {
            API('http://localhost:8000/orders/' + order._id, {
                method: 'PUT',
                body: JSON.stringify({
                    status: status,
                    note: note,
                    shippedDate:shipDate
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((data) => {
                    setModal(true);
                    setMessage("Cập nhật dữ liệu thành công!");
                })
                .catch((error) => {
                    setModal(true);
                    setMessage("Cập nhật dữ liệu bị lỗi. Vui lòng thử lại!");
                });
        }
    }

    return (
        <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <ModalHeader className='pt-0'>
                        Thông tin đơn hàng
                    </ModalHeader>
                    <ModalBody>
                        <Row className='my-3'>
                            <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Trạng thái đơn hàng"
                                    onChange={(e) => setStatus(e.target.value)}
                                    fullWidth
                                    required
                                    defaultValue={order.status}
                                >
                                    <MenuItem value='0'>Xác nhận</MenuItem>
                                    <MenuItem value='1'>Hủy</MenuItem>

                                </TextField>

                            </Col>
                            <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                <TextField
                                    id="filled-search"
                                    label="Ghi chú"
                                    type="text"
                                    variant="filled"
                                    fullWidth
                                    defaultValue={order.note}
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row className='my-3'>
                            <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                            <TextField
                                    id="outlined-select-currency"
                                    label="Mã khách hàng"
                                    defaultValue={order.customer}
                                    fullWidth
                                    disabled
                                >
                        </TextField>
                            </Col>
                            <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                <TextField
                                    id="filled-search"
                                    type="text"
                                    variant="filled"
                                    fullWidth
                                    required
                                    defaultValue={order.shippedDate ? order.shippedDate.slice(0,10): order.shippedDate}
                                    helperText="Ngày giao hàng"
                                    onChange={(e) => setShipDate(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="success"
                            onClick={onBtnConfirmClk}
                        >
                            Cập nhật
                        </Button>
                        {' '}
                        <Button onClick={handleClose} color='warning'>
                            Hủy
                        </Button>
                    </ModalFooter>
                </Box>
            </Modal>
            <ModalAddNewUser openAlertModal={modal} setOpenAlertModal={setModal} message={message} />
        </div>
    )
}
export default EditOrderModal;