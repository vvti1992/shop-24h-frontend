import { Modal, Box, TextField } from '@mui/material';
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
function EditCustomerModal({ openModal, setOpenModal, user, state, setState}) {
    //Đóng modal
    const handleClose = () => {
        setOpenModal(false);
        setState(!state);
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
    
    useEffect(()=>{
        setName(user.fullName);
        setPhone(user.phoneNumber);
        setEmail(user.email);
        setAddress(user.address);
        setPassword(user.password);
        setConfirmPassword(user.password);
    },[user])
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("");
    //hàm kiểm tra dữ liệu người dùng nhập
    const validateData = () => {
        console.log(typeof password);
        console.log(name);
        if ( name === undefined || name.trim() === "") {
            setModal(true);
            setMessage("Nhập họ tên khách hàng!");
            return false;
        }
        if (  email === undefined ||email.trim() === "") {
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
        if( address === undefined || address.trim() === "") {
            setModal(true);
            setMessage("Nhập địa chỉ khách hàng!");
            return false;
        }
        if(phone === undefined || phone.trim() === "") {
            setModal(true);
            setMessage("Nhập số điện thoại khách hàng!");
            return false;
        }
        if(password === undefined || password.trim() === "" ) {
            setModal(true);
            setMessage("Nhập mật khẩu đăng nhập!");
            return false;
        }
        if( confirmPassword === undefined || confirmPassword.trim() === "") {
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
            createOrder('http://localhost:8000/customers/' + user._id, {
                method: 'PUT',
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
                        Thông tin khách hàng
                    </ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                <TextField className='my-2'
                                    error
                                    id="outlined-error-helper-text"
                                    label="Họ và tên"
                                    helperText={name !== "" ? "" : "Nhập họ tên"}
                                    fullWidth
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    defaultValue={user.fullName}
                                />
                            </Col>
                            <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                <TextField className='my-2'
                                    error
                                    id="outlined-error-helper-text"
                                    label="Số điện thoại"
                                    helperText={phone !== "" ? "" : "Nhập số điện thoại"}
                                    fullWidth
                                    required
                                    type="number"
                                    onChange={(e) => setPhone(e.target.value)}
                                    defaultValue={user.phoneNumber}
                                />
                            </Col>
                            <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                <TextField className='my-2'
                                    error
                                    id="outlined-error-helper-text"
                                    label="Email"
                                    helperText={email !== "" ? "" : "Nhập địa chỉ Email"}
                                    fullWidth
                                    required
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    defaultValue={user.email}
                                />
                            </Col>
                            <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                <TextField className='my-2'
                                    error
                                    id="outlined-error-helper-text"
                                    label="Địa chỉ"
                                    helperText={address !== "" ? "" : "Nhập địa chỉ"}
                                    fullWidth
                                    required
                                    onChange={(e) => setAddress(e.target.value)}
                                    defaultValue={user.address}
                                />
                            </Col>
                            <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                <TextField className='my-2'
                                    error
                                    id="outlined-error-helper-text"
                                    label="Mật khẩu"
                                    helperText={password !== "" ? "" : "Nhập mật khẩu đăng nhập"}
                                    fullWidth
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    defaultValue={user.password}
                                />
                            </Col>
                            <Col className='col-12 col-sm-12 col-md-6 col-lg-6'>
                                <TextField className='my-2'
                                    error
                                    id="outlined-error-helper-text"
                                    label="Xác nhận mật khẩu"
                                    helperText={confirmPassword !== "" ? "" : "Nhập mật khẩu xác nhận"}
                                    fullWidth
                                    required
                                    type="password"
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    defaultValue={user.password}
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
export default EditCustomerModal;