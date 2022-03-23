import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Row, Table } from "reactstrap";
import { decreaseQuatity, increaseQuatity, selectProduct, selectUserLogin } from "../../../Redux/userslice";
import WarningDeleteProductModal from "../../alert-dialog/warning-deleteProduct";
import Login from "../../login/Login";


function OrderDetail() {
    const dispatch = useDispatch();
    const userLogin = useSelector(selectUserLogin);
    const product = useSelector(selectProduct);
    const [modalLogin, setModalLogin] = useState(false);
    const [modalWarning, setOpenModalWarning] = useState(false);
    const [index, setIndex] = useState(null);
    // console.log(product);
    const navigate = useNavigate();
    const backHomePage = () => {
        navigate("/");
    }
    const sumMoney = () => {
        var sum = 0;
        product.forEach(element => {
            sum += element.product.promotionPrice * element.number;
        });
        return sum;
    }
    //Khi nhấn nút +
    const onBtnIncClk = (data, index) =>{
        dispatch(increaseQuatity(index));
        // console.log(index);
    }
    //Khi nhấn nút -
    const onBtnDecClk = (data, index) =>{
        dispatch(decreaseQuatity(index));
    }
    //Khi nhấn nút delete
    const onBtnDelClk = (data, index) =>{
        // console.log(data);
        setOpenModalWarning(true);
        setIndex(index);
    }
    const createNewOrder = () => {
        if(userLogin.email !== "") {
            //Chuyển sang trang hiển thị thông tin người mua
            navigate("/confirm_order");
            window.scrollTo(0, 0);
        }
        else {
            //chuyển sang trang đăng nhập
            setModalLogin(true);
        }
    }
    const buyMoreProduct = () => {
        navigate("/");
        window.scrollTo(0, 0);
    }
    return (
        <Container>
            {product.length === 0 ?
                <div style={{ minHeight: '300px', textAlign: "center", paddingTop: '20px' }}>
                    <p>Bạn chưa thêm sản phẩm vào giỏ hàng. Vui lòng chọn sản phẩm cẩn mua trước!</p>
                    <Button className='btn btn-primary' onClick={backHomePage}>Quay về trang chủ</Button>
                </div> :
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
                                                    <button onClick={()=>onBtnDecClk(element, index)}>-</button>{element.number}<button onClick={()=>onBtnIncClk(element, index)}>+</button>
                                                </div>
                                            </td>
                                            <td>{element.product.promotionPrice.toLocaleString()} VNĐ</td>
                                            <td>{(element.product.promotionPrice * element.number).toLocaleString()} VNĐ</td>
                                            <td>


                                                <button onClick={()=>onBtnDelClk(element, index)}><i className="fas fa-trash"></i></button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>

                    </Col>
                    <Col xs='4'>
                        <div className= 'sum-money'>
                            <p>Tổng tiền tạm tính: <span> {sumMoney().toLocaleString()}</span> VNĐ</p>
                            <button className = 'btn-buy-order' onClick={createNewOrder}>
                                TIẾN HÀNH ĐẶT HÀNG
                            </button>
                            <button className = 'btn-more-product' onClick={buyMoreProduct}>
                                CHỌN THÊM CÁC SẢN PHẨM KHÁC
                            </button>
                            </div>
                    </Col>
                </Row>
            }
            <Login openModal={modalLogin} setOpenModal={setModalLogin}/>
            <WarningDeleteProductModal openModal={modalWarning} setOpenModal= {setOpenModalWarning} product={index} />
        </Container>
    )
}
export default OrderDetail;