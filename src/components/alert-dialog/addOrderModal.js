import { Modal, Box, TextField, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { ModalHeader, ModalBody, ModalFooter, Button, Input, Col, Row, Label } from 'reactstrap'
import ModalAddNewUser from './alertModa-addNewUser';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
function AddOrderModal({ openModal, setOpenModal, state, setState }) {
    //Đóng modal
    const handleClose = () => {
        setOpenModal(false);
        setState(!state);
        setMode(!mode);
    }
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
    //Khai báo biến lưu thông tin
    const [status, setStatus] = useState("");
    const [note, setNote] = useState("");
    const [customerId, setCustomerId] = useState("");
    const [shipDate, setShipDate] = useState("");
    
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("");
    const [mode, setMode] = useState(false);
    const [customer, setCustomer] = useState([]);
    
    useEffect(()=>{
        fetchApi('http://localhost:8000/customers')
        .then((data) =>{
            setCustomer(data.Customers);
        })
        .catch(console.error())
    },[])
    //Hàm gọi API tạo đơn hàng
    const createOrder = async (paramUrl, paramOption = {}) => {
        const Fetch = await fetch(paramUrl, paramOption);
        const response = await Fetch.json();
        return response;
    }
    
    //clear du lieu khi dong modal
    useEffect(()=>{
        setStatus("");
        setNote("");
        setCustomerId("");
        setShipDate("");
    },[mode]);
    //hàm kiểm tra dữ liệu người dùng nhập
    const validateData = () => {
        if (status.trim() === "") {
            setModal(true);
            setMessage("Chọn trạng thái đơn hàng!");
            return false;
        }
        if (customerId.trim() === "") {
            setModal(true);
            setMessage("Chọn địa chỉ email khách hàng cần tạo!");
            return false;
        }
        if (shipDate.trim() === "") {
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
            createOrder('http://localhost:8000/customers/' + customerId +'/orders', {
                method: 'POST',
                body: JSON.stringify({
                    status: status,
                    shippedDate: shipDate,
                    note: note
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((data) => {
                    setModal(true);
                    setMessage("Thêm đơn hàng mới thành công! Mã đơn hàng là: " + data.Order._id);
                })
                .catch((error) => {
                    setModal(true);
                    setMessage("Thêm dữ liệu bị lỗi. Vui lòng thử lại!");
                });
        }
    }

    return (
        <div>
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
                            <Col xs='6'>
                                <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Trạng thái đơn hàng"
                                    onChange={(e) => setStatus(e.target.value)}
                                    fullWidth
                                    required
                                >
                                    <MenuItem value='0'>Xác nhận</MenuItem>
                                    <MenuItem value='1'>Hủy</MenuItem>

                                </TextField>

                            </Col>
                            <Col xs='6'>
                                <TextField
                                    id="filled-search"
                                    label="Ghi chú"
                                    type="text"
                                    variant="filled"
                                    fullWidth
                                    onChange={(e) => setNote(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row className='my-3'>
                            <Col xs='6'>
                            <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Email khách hàng"
                                    onChange={(e) => setCustomerId(e.target.value)}
                                    fullWidth
                                    required
                                >
                                    {customer.map((element,index)=>(
                                        <MenuItem key={index} value={element._id}>{element.email}</MenuItem>
                                    ))}

                        </TextField>
                            </Col>
                            <Col xs='6'>
                                <TextField
                                    id="filled-search"
                                    type="date"
                                    variant="filled"
                                    fullWidth
                                    required
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
                            Thêm
                        </Button>
                        {' '}
                        <Button onClick={handleClose} color='warning'>
                            Đóng
                        </Button>
                    </ModalFooter>
                </Box>
            </Modal>
            <ModalAddNewUser openAlertModal={modal} setOpenAlertModal={setModal} message={message} />
        </div>
    )
}
export default AddOrderModal;