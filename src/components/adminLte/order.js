import { Pagination, Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Label, Row, Col } from 'reactstrap';
import AddOrderModal from '../alert-dialog/addOrderModal';
import ModalAddNewUser from '../alert-dialog/alertModa-addNewUser';
import EditOrderModal from '../alert-dialog/editOrderModal';

function OrderLte({ search, reset, setReset }) {
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
    const limitRow = 10; //10 dòng cho mỗi trang
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [noPage, setNoPage] = useState(1);
    const changePage = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    }
    const [state, setState] = useState(false);
    //set state modal
    const [addOrderModal, setAddOrderModal] = useState(false);
    const [editOrderModal, setEditOrderModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("");
    const [order, setOrder] = useState({
        requiredDate: null,
        shippedDate: null,
        note: null,
        status: null,
        createDate: null,
        customer: null
    });
    //Khai báo biến tạm lưu giá trị ngày cần lọc
    const [startDateTemp, setStartDateTemp] = useState("");
    const [endDateTemp, setEndDateTemp] = useState("");
    //Khai báo biến chính lưu giá trị ngày cần lọc
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalOrder, setTotalOrder] = useState([]);
    var status = -1;
    if (search.value.toLowerCase() === "xác nhận") {
        status = 0
    }
    if (search.value.toLowerCase() === "hủy") {
        status = 1;
    }
    useEffect(() => {
        fetchApi('http://localhost:8000/orders?startdate=' + startDate + "&enddate=" + endDate + '&keysearch=' + search.key + "&valuesearch=" + status)
            .then((data) => {
                setTotalOrder(data.Order);
                setNoPage(Math.ceil(data.Order.length / limitRow));
                setPosts(data.Order.slice(page * limitRow - limitRow, page * limitRow));
            }).catch((error) => {
                console.log(error);
            });
    }, [page]);
    useEffect(() => {
        setPage(1);
        setNoPage(1);
        fetchApi('http://localhost:8000/orders?startdate=' + startDate + "&enddate=" + endDate + '&keysearch=' + search.key + "&valuesearch=" + status)
            .then((data) => {
                setTotalOrder(data.Order);
                setNoPage(Math.ceil(data.Order.length / limitRow));
                setPosts(data.Order.slice(page * limitRow - limitRow, page * limitRow));
            }).catch((error) => {
                console.log(error);
            });
    }, [search, state]);
    //reset value search
    useEffect(() => {
        if (reset) {
            fetchApi("http://localhost:8000/orders?startdate=" + startDate + "&enddate=" + endDate)
                .then((data) => {
                    setNoPage(Math.ceil(data.Order.length / limitRow));
                    setPosts(data.Order.slice(page * limitRow - limitRow, page * limitRow));
                }).catch((error) => {
                    console.log(error);
                });
            setReset(false);
        }
    }, [reset]);
    //Add new order
    const AddOrder = () => {
        setAddOrderModal(true);
    }
    //Edit order
    const EditOrder = (order) => {
        setEditOrderModal(true);
        setOrder(order);
    };
    //Hàm xử lý lọc dữ liệu
    const handleFilter = () => {
        setStartDate(startDateTemp);
        setEndDate(endDateTemp);
        setState(!state);
        setPage(1);
    }

    return (
        <div>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-12">
                                <Row>
                                    <Col className='col-12 col-sm-12 col-md-10 col-lg-10'>
                                        <Row>
                                            <div className=' col-10 col-sm-10 col-md-6 col-lg-6'>
                                                <Box
                                                    component="form"
                                                    sx={{
                                                        '& .MuiTextField-root': { m: 1, width: '25ch' },
                                                    }}
                                                    noValidate
                                                    autoComplete="off"
                                                >
                                                    <div>
                                                        <TextField
                                                            id="outlined-number"
                                                            label="Từ ngày"
                                                            type="date"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                        <TextField
                                                            id="outlined-number"
                                                            label="Đến ngày"
                                                            type="date"
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    </div>
                                                    
                                                </Box>
                                            </div>
                                            <div className='col-2 col-sm-2 col-md-2 col-lg-2 py-3'>
                                                        <button className='btn btn-primary' onClick={handleFilter}>Truy vấn</button>
                                                    </div>
                                        </Row>
                                    </Col>
                                    <Col className='col-12 col-sm-12 col-md-2 col-lg-2 py-3'>
                                        <button onClick={AddOrder} className="btn btn-info w-100"><i class="fa-solid fa-plus"></i>Thêm đơn hàng</button>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            {posts.length > 0 ?
                                <>
                                    {search.key !== 0 ? <p>{`Tìm thấy ${totalOrder.length} đơn hàng tương ứng.`}</p> : ""}
                                    <div className='table-responsive'>
                                        <Table hover className='text-center table-order'>
                                            <thead className='bg-primary'>
                                                <tr>
                                                    <th>
                                                        STT
                                                    </th>
                                                    <th>
                                                        Mã đơn hàng
                                                    </th>
                                                    <th>
                                                        Trạng thái
                                                    </th>
                                                    <th>
                                                        Ghi chú
                                                    </th>
                                                    <th>
                                                        Ngày tạo đơn
                                                    </th>
                                                    <th>
                                                        Ngày cập nhật
                                                    </th>
                                                    <th>
                                                        Ngày giao hàng
                                                    </th>
                                                    <th>
                                                        Mã khách hàng
                                                    </th>
                                                    <th>
                                                        Cập nhật
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {posts.map((element, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td>
                                                            {element._id}
                                                        </td>
                                                        <td>
                                                            {element.status === 0 ? "Xác nhận" : "Hủy"}
                                                        </td>
                                                        <td>
                                                            {element.note}
                                                        </td>
                                                        <td>
                                                            {element.createDate.slice(0, 10)}
                                                        </td>
                                                        <td>
                                                            {element.updateDate.slice(0, 10)}
                                                        </td>
                                                        <td>
                                                            {element.shippedDate.slice(0, 10)}
                                                        </td>
                                                        <td>
                                                            {element.customer}
                                                        </td>
                                                        <td>

                                                            <button onClick={() => EditOrder(element)} className="btn btn-warning w-75 ml-2">Sửa</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        <Pagination count={noPage} color="primary" page={page} onChange={changePage} />
                                    </div>
                                </> :
                                <div className='col-12 col-sm-12 col-md-12 col-lg-12'>
                                    <p className='text-center'>{`Không tìm thấy đơn hàng có ${search.key === "10" ? "mã đơn hàng" : search.key === "20" ?
                                        "trạng thái" : "mã khách hàng"} là: '${search.value}'`}</p>
                                </div>
                            }
                        </div>
                    </div>
                </section>
            </div>
            <AddOrderModal openModal={addOrderModal}
                setOpenModal={setAddOrderModal}
                state={state} setState={setState} />
            <EditOrderModal openModal={editOrderModal}
                setOpenModal={setEditOrderModal}
                order={order} state={state} setState={setState} />
            <ModalAddNewUser openAlertModal={modal} setOpenAlertModal={setModal} message={message} />
        </div>

    )
}
export default OrderLte;