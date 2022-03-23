import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import AddCustomerModal from '../alert-dialog/addCustomerModal';
import EditCustomerModal from '../alert-dialog/editCustomerModal';
import { Stack, Pagination } from '@mui/material';

function CustomerLte() {
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
    const [data, setData] = useState([]);
    const [user, setUser] = useState({
        fullName: null,
        phoneNumber: null,
        email: null,
        address: null,
        password: null,
    });
    const limitRow = 10; //10 dòng cho mỗi trang
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [noPage, setNoPage] = useState(1);
    const changePage = (event, value) => {
        setPage(value);
        window.scrollTo(0,0);
    }
    const [state, setState] = useState(false);
    //set open modal
    const [openAddModalInfo, setAddOpenModalInfo] = useState(false);
    const [openEditModalInfo, setEditOpenModalInfo] = useState(false);
    useEffect(() => {
        fetchApi('http://localhost:8000/customers')
        .then((data) => {
            setNoPage(Math.ceil(data.Customers.length / limitRow));
            setPosts(data.Customers.slice(page * limitRow - limitRow, page * limitRow));
        }).catch((error) => {
            console.log(error);
        });
}, [page, state]);
// console.log(posts);
    //Add new user
    const AddUser = () => {
        setAddOpenModalInfo(true);
    }
    //Edit user
    const EditUser = (e) => {
        setUser(e);
        setEditOpenModalInfo(true);
    };

    return (
        <div>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Danh sách thông tin khách hàng</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <Table hover className='text-center'>
                                <thead className='bg-primary'>
                                    <tr>
                                        <th>
                                            STT
                                        </th>
                                        <th>
                                            Họ và tên
                                        </th>
                                        <th>
                                            Số điện thoại
                                        </th>
                                        <th>
                                            Email
                                        </th>
                                        <th>
                                            Địa chỉ
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
                                                {element.fullName}
                                            </td>
                                            <td>
                                                {element.phoneNumber}
                                            </td>
                                            <td>
                                                {element.email}
                                            </td>
                                            <td>
                                                {element.address}
                                            </td>
                                            <td>
                                                <button onClick={AddUser} className="btn btn-info mr-2">Thêm</button>
                                                <button onClick={() => EditUser(element)} className="btn btn-warning">Sửa</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Pagination count={noPage} color="primary" defaultPage={page} onChange={changePage} />
                        </div>
                    </div>
                </section>
            </div>
            <AddCustomerModal openModal={openAddModalInfo} setOpenModal={setAddOpenModalInfo} state={state} setState = {setState}/>
            <EditCustomerModal openModal={openEditModalInfo} setOpenModal={setEditOpenModalInfo} user={user} state={state} setState = {setState}/>
        </div>

    )
}
export default CustomerLte;