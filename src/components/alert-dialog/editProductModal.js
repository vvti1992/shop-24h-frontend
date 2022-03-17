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
function EditProductModal({ openModal, setOpenModal, product }) {
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

    useEffect(() => {
        setName(product.name);
        setType(product.type);
        setBrand(product.brand);
        setPicture({...picture,image1: product.imageUrl});
        setBuyPrice(product.buyPrice);
        setPromotionPrice(product.promotionPrice);
        setDescription(product.description);
    }, [product])
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("");
    //hàm kiểm tra dữ liệu người dùng nhập
    const validateData = () => {
        if (name === undefined || name.trim() === "") {
            setModal(true);
            setMessage("Nhập tên sản phẩm!");
            return false;
        }
        if (type === undefined || type.trim() === "") {
            setModal(true);
            setMessage("Nhập hệ điều hành của sản phẩm!");
            return false;
        }
        if (brand === undefined || brand.trim() === "") {
            setModal(true);
            setMessage("Nhập tên nhà sản xuất!");
            return false;
        }
        if (picture.image1 === undefined || picture.image1.trim() === "") {
            setModal(true);
            setMessage("Nhập URL hình ảnh sản phẩm!");
            return false;
        }
        if (buyPrice === undefined || buyPrice === "") {
            setModal(true);
            setMessage("Nhập giá gốc của sản phẩm!");
            return false;
        }
        if (promotionPrice === undefined || promotionPrice === "") {
            setModal(true);
            setMessage("Nhập giá khuyến mãi của sản phẩm!");
            return false;
        }
        if (description === undefined || description.trim() === "") {
            setModal(true);
            setMessage("Nhập mô tả thông tin sản phẩm!");
            return false;
        }
        return true;
    }
    //Khi nhấn nút xác nhận
    const onBtnConfirmClk = () => {
        //Nếu đúng thì tạo người dùng mới
        if (validateData()) {
            createOrder('http://localhost:8000/products/' + product._id, {
                method: 'PUT',
                body: JSON.stringify({
                    name: name,
                    type: type,
                    imageUrl: picture.image1,
                    buyPrice: buyPrice,
                    promotionPrice: promotionPrice,
                    description: description,
                    brand: brand
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
                                <TextField id="standard-basic" label="Tên sản phẩm" variant="standard" fullWidth required
                                    onChange={(e) => setName(e.target.value)} defaultValue={product.name}
                                />
                            </Col>
                            <Col xs='6'>
                                <TextField id="standard-basic" label="Nhà sản xuất" variant="standard" fullWidth required
                                    onChange={(e) => setBrand(e.target.value)} defaultValue={product.brand}
                                />
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col xs='6'>
                                <TextField id="standard-basic" label="Hệ điều hành" variant="standard" fullWidth
                                    onChange={(e) => setType(e.target.value)} required defaultValue={product.type}/> 
                            </Col>
                            <Col xs='6'>
                                <TextField id="standard-basic" label="Năm sản xuất" variant="standard"
                                    fullWidth required />
                            </Col>
                        </Row>
                        <Row className='my-2'>
                            <Col xs='6'>
                                <TextField id="standard-basic" label="Giá gốc" variant="standard" type='number'
                                    onChange={(e) => setBuyPrice(e.target.value)} fullWidth required defaultValue={product.buyPrice}/>
                            </Col>
                            <Col xs='6'>
                                <TextField id="standard-basic" label="Giá khuyến mãi" variant="standard" type='number'
                                    onChange={(e) => setPromotionPrice(e.target.value)} fullWidth required defaultValue={product.promotionPrice}/>
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
                                    onChange={(e) => setDescription(e.target.value)}
                                    defaultValue={product.description}
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
                                    onChange={(e) => setPicture({ ...picture, image1: e.target.value })}
                                    defaultValue={product.imageUrl}
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
                                    onChange={(e) => setPicture({ ...picture, image2: e.target.value })}
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
                                    onChange={(e) => setPicture({ ...picture, image3: e.target.value })}
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
                                    onChange={(e) => setPicture({ ...picture, image4: e.target.value })}
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
                                    onChange={(e) => setPicture({ ...picture, image5: e.target.value })}
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
export default EditProductModal;