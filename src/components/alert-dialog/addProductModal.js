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
function AddProductModal({ openModal, setOpenModal }) {
    //Đóng modal
    const handleClose = () => {
        setOpenModal(false);
    }
    //Hàm gọi API tạo đơn hàng
    const createOrder = async (paramUrl, paramOption = {}) => {
        const Fetch = await fetch(paramUrl, paramOption);
        const response = await Fetch.json();
        return response;
    }
    //Khai báo biến lưu thông tin
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");
    const [picture, setPicture] = useState({
        image1: "",
        image2: "",
        image3: "",
        image4: "",
        image5: ""
    });
    const [buyPrice, setBuyPrice] = useState(0);
    const [promotionPrice, setPromotionPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    //hàm kiểm tra dữ liệu người dùng nhập
    // const validateData = () => {
    //     if (name.trim() === "") {
    //         setModal(true);
    //         setMessage("Nhập họ tên khách hàng!");
    //         return false;
    //     }
    //     if (email.trim() === "") {
    //         setModal(true);
    //         setMessage("Nhập địa chỉ email khách hàng!");
    //         return false;
    //     }
    //     var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //     var checkEmail = re.test(email.trim());
    //     if (!checkEmail) {
    //         setModal(true);
    //         setMessage("Địa chỉ email không hợp lệ!");
    //         return false;
    //     }
    //     if (address.trim() === "") {
    //         setModal(true);
    //         setMessage("Nhập địa chỉ khách hàng!");
    //         return false;
    //     }
    //     if (phone.trim() === "") {
    //         setModal(true);
    //         setMessage("Nhập số điện thoại khách hàng!");
    //         return false;
    //     }
    //     if (password.trim() === "") {
    //         setModal(true);
    //         setMessage("Nhập mật khẩu đăng nhập!");
    //         return false;
    //     }
    //     if (confirmPassword.trim() === "") {
    //         setModal(true);
    //         setMessage("Nhập mật khẩu xác nhận!");
    //         return false;
    //     }
    //     if (password !== confirmPassword) {
    //         setModal(true);
    //         setMessage("Mật khẩu xác thực không khớp!");
    //         return false;
    //     }
    //     return true;
    // }
    //Khi nhấn nút xác nhận
    const onBtnConfirmClk = () => {
        //Nếu đúng thì tạo người dùng mới
        // if (validateData()) {
        //     createOrder('http://localhost:8000/customers', {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             fullName: name,
        //             phoneNumber: phone,
        //             email: email,
        //             address: address,
        //             password: password,
        //         }),
        //         headers: {
        //             'Content-type': 'application/json; charset=UTF-8',
        //         },
        //     })
        //         .then((data) => {
        //             setModal(true);
        //             setMessage("Thêm thành công!");
        //         })
        //         .catch((error) => {
        //             setModal(true);
        //             setMessage("Thêm dữ liệu bị lỗi. Vui lòng thử lại!");
        //         });
        // }
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
                        Thông tin sản phẩm
                    </ModalHeader>
                    <ModalBody>
                        <Row className='my-2'>
                            <Col xs='6'>
                                <TextField id="standard-basic" label="Tên sản phẩm" variant="standard" fullWidth required/>
                            </Col>
                            <Col xs='6'>
                                <TextField id="standard-basic" label="Nhà sản xuất" variant="standard" fullWidth required/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col xs='6'>
                                <TextField id="standard-basic" label="Hệ điều hành" variant="standard" fullWidth required/>
                            </Col>
                            <Col xs='6'>
                                <TextField id="standard-basic" label="Năm sản xuất" variant="standard" fullWidth required/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col xs='6'>
                                <TextField id="standard-basic" label="Giá gốc" variant="standard" fullWidth required/>
                            </Col>
                            <Col xs='6'>
                                <TextField id="standard-basic" label="Giá khuyến mãi" variant="standard" fullWidth required/>
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col xs='12'>
                                <TextField
                                    id="standard-textarea"
                                    label="Mô tả sản phẩm"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col xs='12'>
                                <TextField
                                    id="standard-textarea"
                                    label="Url hình ảnh 1"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                    required
                                />
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col xs='12'>
                                <TextField
                                    id="standard-textarea"
                                    label="Url hình ảnh 2"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                />
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col xs='12'>
                                <TextField
                                    id="standard-textarea"
                                    label="Url hình ảnh 3"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                />
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col xs='12'>
                                <TextField
                                    id="standard-textarea"
                                    label="Url hình ảnh 4"
                                    multiline
                                    variant="standard"
                                    fullWidth
                                />
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col xs='12'>
                                <TextField
                                    id="standard-textarea"
                                    label="Url hình ảnh 5"
                                    multiline
                                    variant="standard"
                                    fullWidth
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
            {/* <ModalAddNewUser openAlertModal={modal} setOpenAlertModal={setModal} message={message} /> */}
        </div>
    )
}
export default AddProductModal;