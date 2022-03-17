import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

function OrderLte() {
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchApi('http://localhost:8000/customers')
            .then((data) => {
                setData(data.Customers);
            })
            .catch(console.error());
    }, [])
    //Add new user
    const AddUser = () => {

    }
    //Edit user
    const EditUser = (user) => {
        console.log(user);
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
                            <Table hover>
                                <thead>
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
                                    {data.map((element, index) => (
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
                                                <button onClick={AddUser}>Thêm</button>
                                                <button onClick={() => EditUser(element)}>Sửa</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                </section>
            </div>

        </div>

    )
}
export default OrderLte;