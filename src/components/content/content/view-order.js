import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Col, Container, Row, Table } from "reactstrap";
import { selectUserLogin } from "../../../Redux/userslice";



function ViewOrder() {
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
    var arrayOrder = [];
    var arrayProduct = [];
    var tempObj = {}
    const [product, setProduct] = useState([]);
    const userLogin = useSelector(selectUserLogin);
    useEffect(() => {
        //lấy order
        fetchApi('http://localhost:8000/orders')
            .then((responseOrder) => {
                responseOrder.Order.map((element) => {
                    if (element.customer === userLogin._id) {
                        arrayOrder.push(element);
                    }
                });
                arrayOrder.map((elementOrder) => {
                    fetchApi('http://localhost:8000/orders/' + elementOrder._id + "/orderdetails")
                        .then((responseOrderDetail) => {
                            if (responseOrderDetail) {
                                responseOrderDetail.Order_detail.map((elementOrderDetail, index) => {
                                    fetchApi('http://localhost:8000/products/' + elementOrderDetail.product)
                                        .then((responseProduct) => {
                                            elementOrderDetail = { ...elementOrderDetail, ...responseProduct.product };
                                        })
                                        .catch(console.error());

                                    fetchApi('http://localhost:8000/orders/' + elementOrderDetail.order)
                                        .then((responseOrder) => {
                                            elementOrderDetail = { ...elementOrderDetail, ...responseOrder.Order };
                                            tempObj = { ...tempObj, ...elementOrderDetail };
                                            arrayProduct = [...arrayProduct, tempObj];
                                            if (index === responseOrderDetail.Order_detail.length - 1) {
                                                setProduct(arrayProduct);
                                            }
                                        })
                                        .catch(console.error());
                                })
                            }
                        })
                        .catch(console.error())
                })
            })
            .catch(console.error());
    }, []);
    return (
        <Container>
            {product.length === 0 ?
                <div style={{ minHeight: '300px', textAlign: "center", paddingTop: '20px' }}>
                    <p>Bạn chưa có đơn hàng nào. Vui lòng chọn mua sản phẩm trước!</p>
                    <Button className='btn btn-primary' >Quay về trang chủ</Button>
                </div> :
                <Row>
                    <Col xs='12'>
                        <p className="h3">Thông tin đơn hàng của bạn: </p>
                        <div className="table-responsive">
                        <Table className="table-product table table-inverse table-bordered overflow-scroll table-hover text-center"
                        >
                            <thead className='thead-inverse bg-primary text-white'>
                                <tr>
                                    <th>
                                        STT
                                    </th>
                                    <th>
                                        Tên sản phẩm
                                    </th>
                                    <th>
                                        Hình ảnh
                                    </th>
                                    <th>
                                        Số lượng
                                    </th>
                                    <th>
                                        Đơn giá (VNĐ)
                                    </th>
                                    <th>
                                        Thành tiền (VNĐ)
                                    </th>
                                    <th>
                                        Trạng thái
                                    </th>
                                    <th>
                                        Ngày giao hàng
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    product.map((element, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{element.name}</td>
                                            <td><img src={element.imageUrl} width='100%' /></td>
                                            <td>{element.quantity}</td>
                                            <td>{element.priceEach.toLocaleString()}</td>
                                            <td>{(element.priceEach * element.quantity).toLocaleString()}</td>
                                            <td>{element.status = 0 ? "Xác nhận" : "Đã hủy"}</td>
                                            <td>{element.status = 0 ? element.shippedDate.slice(0, 10) : "--/--/--"}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        </div>

                    </Col>
                </Row>
            }

        </Container>
    )
}
export default ViewOrder;