import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Input, Label, Row, Table } from "reactstrap";
import { decreaseQuatity, deleteProduct, increaseQuatity, selectProduct, selectUserLogin, setUserLogin, deleteAllProduct } from "../../../Redux/userslice";
import AlertModal from "../../alert-dialog/alertModal";
import WarningDeleteProductModal from "../../alert-dialog/warning-deleteProduct";


function OrderDetailConfirm() {
    const userLogin = useSelector(selectUserLogin);
    const product = useSelector(selectProduct);
    const dispatch = useDispatch();
    //Thông tin open modal và message hiển thị lên modal
    const [openAlertModal, setOpenAlertModal] = useState(false);
    const [content, setContent] = useState("");
    const [modalWarning, setOpenModalWarning] = useState(false);
    const [index, setIndex] = useState(null);
    // console.log(product);
    const navigate = useNavigate();
    const backHomePage = () => {
        navigate("/");
    };
    //Khai báo biến lưu giá trị các ô input
    const [name, setName] = useState(userLogin.fullName);
    const [email, setEmail] = useState(userLogin.email);
    const [phone, setPhone] = useState(userLogin.phoneNumber);
    const [address, setAddress] = useState(userLogin.address);
    const [message, setMessage] = useState("");
    //Lưu giá trị vào biến khi người dùng nhập thông tin
    const nameChange = (val) => {
        setName(val.target.value);
    }
    const emailChange = (val) => {
        setEmail(val.target.value);
    }
    const phoneChange = (val) => {
        setPhone(val.target.value);
    }
    const addressChange = (val) => {
        setAddress(val.target.value);
    }
    const messageChange = (val) => {
        setMessage(val.target.value);
    }

    //Khi nhấn nút +
    const onBtnIncClk = (data, index) => {
        dispatch(increaseQuatity(index));
        // console.log(product);
    }
    //Khi nhấn nút -
    const onBtnDecClk = (data, index) => {
        dispatch(decreaseQuatity(index));
    }
    //Khi nhấn nút delete
    const onBtnDelClk = (data, index) => {
        // console.log(data);
        setOpenModalWarning(true);
        setIndex(index);
    }
    const sumMoney = () => {
        var sum = 0;
        product.forEach(element => {
            sum += element.product.promotionPrice * element.number;
        });
        return sum;
    }
    //call API
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
    //validate dữ liệu người dùng nhập
    const validate = () => {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var checkEmail = re.test(email.trim());
        if (!checkEmail) {
            alert("Email sai định dạng!");
            return false
        }
        if (name.trim() === "") {
            alert("Vui lòng nhập tên người nhận!");
            return false
        }
        if (phone.trim() === "") {
            alert("Vui lòng nhập số điện thoại!");
            return false
        }
        if (address.trim() === "") {
            alert("Vui lòng nhập địa chỉ!");
            return false
        }
        return true;
    }
    //create new order
    const createNewOrder = () => {
        var vValidate = validate();
        //kiểm tra nếu người dùng sửa thông tin mới cập nhật lại CSDL
        if (userLogin.fullName !== name || userLogin.email !== email || userLogin.phoneNumber !== phone || userLogin.address !== address)
            if (vValidate) {
                //Update Customer info
                fetchApi('http://localhost:8000/customers/' + userLogin._id, {
                    method: 'PUT',
                    body: JSON.stringify({
                        fullName: name,
                        phoneNumber: phone,
                        email: email,
                        address: address
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                    .then((data) => {
                        // console.log(data);
                        dispatch(setUserLogin(data.updateObject));
                    })
                    .catch(console.error());
            }
        //Tạo order
        fetchApi('http://localhost:8000/customers/' + userLogin._id + "/orders", {
            method: 'POST',
            body: JSON.stringify({
                note: message,
                status: 1,
                customer: userLogin
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((data) => {
                product.map((element) =>
                    //Tạo order detail
                    fetchApi('http://localhost:8000/orders/' + data.Order._id + "/" + element.product._id + "/orderdetails", {
                        method: 'POST',
                        body: JSON.stringify({
                            quantity: element.number,
                            priceEach: element.product.promotionPrice
                        }),
                        headers: {
                            'Content-type': 'application/json; charset=UTF-8',
                        },
                    })
                        .then((res) => {
                            console.log(res);
                            setOpenAlertModal(true);
                            setContent(`Đơn hàng của bạn được tạo thành công. Mã đơn hàng là: ${data.Order._id}`);
                            
                            
                        })
                        .catch(console.error())
                )
            })
            .catch(console.error());
    }
    return (
        <>
            <Container>
                {product.length > 0 ?
                    <Row>
                        <Col xs='8'>

                            <Table className=" order-table table table-inverse table-bordered overflow-scroll table-hover"
                            >
                                <thead className='thead-inverse bg-primary text-white'>
                                    <tr>
                                        <th>
                                            STT
                                        </th>
                                        <th>
                                            Hình ảnh
                                        </th>
                                        <th>
                                            Tên sản phẩm
                                        </th>
                                        <th>
                                            Số lượng
                                        </th>
                                        <th>
                                            Đơn giá
                                        </th>
                                        <th>
                                            Thành tiền
                                        </th>
                                        <th>
                                            Cập nhật
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        product.map((element, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><img src={element.product.imageUrl} width='200px' /></td>
                                                <td>{element.product.name}</td>
                                                <td >
                                                    <div className="edit-number">
                                                        <button onClick={() => onBtnDecClk(element, index)}>-</button>{element.number}<button onClick={() => onBtnIncClk(element, index)}>+</button>
                                                    </div>
                                                </td>
                                                <td>{element.product.promotionPrice.toLocaleString()} VNĐ</td>
                                                <td>{(element.product.promotionPrice * element.number).toLocaleString()} VNĐ</td>
                                                <td>


                                                    <button onClick={() => onBtnDelClk(element, index)}><i className="fas fa-trash"></i></button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Col>
                        <Col xs='4'>
                            <div className='sum-money'>
                                <h6>Thông tin khách hàng:</h6>
                                <Row className="form-group py-1">
                                    <Col xs='4'>
                                        <Label>Họ tên: </Label>
                                    </Col>
                                    <Col xs='8'>
                                        <Input className="form-control" defaultValue={userLogin.fullName} onChange={nameChange}></Input>
                                    </Col>
                                </Row>
                                <Row className="form-group py-1">
                                    <Col xs='4'>
                                        <Label>Email: </Label>
                                    </Col>
                                    <Col xs='8'>
                                        <Input className="form-control" defaultValue={userLogin.email} onChange={emailChange}></Input>
                                    </Col>
                                </Row>
                                <Row className="form-group py-1">
                                    <Col xs='4'>
                                        <Label>Số điện thoại: </Label>
                                    </Col>
                                    <Col xs='8'>
                                        <Input type="number" className="form-control" defaultValue={userLogin.phoneNumber} onChange={phoneChange}></Input>
                                    </Col>
                                </Row>
                                <Row className="form-group py-1">
                                    <Col xs='4'>
                                        <Label>Địa chỉ nhận hàng: </Label>
                                    </Col>
                                    <Col xs='8'>
                                        <Input className="form-control" defaultValue={userLogin.address} onChange={addressChange}></Input>
                                    </Col>
                                </Row>
                                <Row className="form-group py-1">
                                    <Col xs='4'>
                                        <Label>Ghi chú: </Label>
                                    </Col>
                                    <Col xs='8'>
                                        <Input className="form-control" onChange={messageChange}></Input>
                                    </Col>
                                </Row>
                                <Row className="form-group py-1">
                                    <Col xs='4'>
                                        <Label>Tổng số tiền: </Label>
                                    </Col>
                                    <Col xs='8'>
                                        <p><span>{sumMoney().toLocaleString()}</span> VNĐ</p>
                                    </Col>
                                </Row>
                                <button className="form-control btn btn-primary" onClick={createNewOrder}>Xác nhận đơn hàng</button>
                            </div>
                        </Col>
                    </Row>
                    :
                    <div style={{ minHeight: '300px', textAlign: "center", paddingTop: '20px' }}>
                        <p>Bạn chưa thêm sản phẩm vào giỏ hàng. Vui lòng chọn sản phẩm cẩn mua trước!</p>
                        <Button className='btn btn-primary' onClick={backHomePage}>Quay về trang chủ</Button>
                    </div>
                }
            </Container>
            <AlertModal openAlertModal={openAlertModal} setOpenAlertModal={setOpenAlertModal} message={content} />
            <WarningDeleteProductModal openModal={modalWarning} setOpenModal= {setOpenModalWarning} product={index} />
        </>
    )
}
export default OrderDetailConfirm;