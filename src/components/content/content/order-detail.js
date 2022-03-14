import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Table, Row, Col, Button } from "reactstrap";
import { selectUserName, selectProduct } from "../../../Redux/userslice";
import { useNavigate } from 'react-router-dom';
import { deleteProduct, increaseQuatity, decreaseQuatity } from "../../../Redux/userslice";


function OrderDetail() {
    const dispatch = useDispatch();
    const product = useSelector(selectProduct);
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
        dispatch(deleteProduct(index));
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
                            <button className = 'btn-buy-order'>
                                TIẾN HÀNH ĐẶT HÀNG
                            </button>
                            <button className = 'btn-more-product'>
                                CHỌN THÊM CÁC SẢN PHẨM KHÁC
                            </button>
                            </div>
                    </Col>
                </Row>
            }
        </Container>
    )
}
export default OrderDetail;