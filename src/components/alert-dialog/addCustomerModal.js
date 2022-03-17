import { Modal, Box, TextField } from '@mui/material';
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
function AddCustomerModal({ openModal, setOpenModal }) {
    //Đóng modal
    const handleClose = () => {
        setOpenModal(false);
        window.location.reload();
    }
    //Hàm gọi API tạo đơn hàng
    const createOrder = async (paramUrl, paramOption = {}) => {
        const Fetch = await fetch(paramUrl, paramOption);
        const response = await Fetch.json();
        return response;
    }
    //Khai báo biến lưu thông tin
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("");
    //hàm kiểm tra dữ liệu người dùng nhập
    const validateData = () => {
        if (name.trim() === "") {
            setModal(true);
            setMessage("Nhập họ tên khách hàng!");
            return false;
        }
        if (email.trim() === "") {
            setModal(true);
            setMessage("Nhập địa chỉ email khách hàng!");
            return false;
        }
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var checkEmail = re.test(email.trim());
        if(!checkEmail) {
            setModal(true);
            setMessage("Địa chỉ email không hợp lệ!");
            return false;
        }
        if(address.trim() === "") {
            setModal(true);
            setMessage("Nhập địa chỉ khách hàng!");
            return false;
        }
        if(phone.trim() === "") {
            setModal(true);
            setMessage("Nhập số điện thoại khách hàng!");
            return false;
        }
        if(password.trim() === "") {
            setModal(true);
            setMessage("Nhập mật khẩu đăng nhập!");
            return false;
        }
        if(confirmPassword.trim() === "") {
            setModal(true);
            setMessage("Nhập mật khẩu xác nhận!");
            return false;
        }
        if(password !== confirmPassword) {
            setModal(true);
            setMessage("Mật khẩu xác thực không khớp!");
            return false;
        }
        return true;
    }
    //Khi nhấn nút xác nhận
    const onBtnConfirmClk = () => {
        //Nếu đúng thì tạo người dùng mới
        if (validateData()) {
            createOrder('http://localhost:8000/customers', {
                method: 'POST',
                body: JSON.stringify({
                    fullName: name,
                    phoneNumber: phone,
                    email: email,
                    address: address,
                    password: password,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((data) => {
                    setModal(true);
                    setMessage("Thêm thành công!");
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
                        Thông tin khách hàng
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col xs='6'>
                                <TextField className='my-2'
                                    error
                                    id="outlined-error-helper-text"
                                    label="Họ và tên"
                                    helperText={name !== "" ? "" : "Nhập họ tên"}
                                    fullWidth
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Col>
                            <Col xs='6'>
                                <TextField className='my-2'
                                    error
                                    id="outlined-error-helper-text"
                                    label="Số điện thoại"
                                    helperText={phone !== "" ? "" : "Nhập số điện thoại"}
                                    fullWidth
                                    required
                                    type="number"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Col>
                            <Col xs='6'>
                                <TextField className='my-2'
                                    error
                                    id="outlined-error-helper-text"
                                    label="Email"
                                    helperText={email !== "" ? "" : "Nhập địa chỉ Email"}
                                    fullWidth
                                    required
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Col>
                            <Col xs='6'>
                                <TextField className='my-2'
                                    error
                                    id="outlined-error-helper-text"
                                    label="Địa chỉ"
                                    helperText={address !== "" ? "" : "Nhập địa chỉ"}
                                    fullWidth
                                    required
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Col>
                            <Col xs='6'>
                                <TextField className='my-2'
                                    error
                                    id="outlined-error-helper-text"
                                    label="Mật khẩu"
                                    helperText={password !== "" ? "" : "Nhập mật khẩu đăng nhập"}
                                    fullWidth
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Col>
                            <Col xs='6'>
                                <TextField className='my-2'
                                    error
                                    id="outlined-error-helper-text"
                                    label="Xác nhận mật khẩu"
                                    helperText={confirmPassword !== "" ? "" : "Nhập mật khẩu xác nhận"}
                                    fullWidth
                                    required
                                    type="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
export default AddCustomerModal;