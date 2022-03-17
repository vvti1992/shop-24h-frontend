import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

function ProductLte() {
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchApi('http://localhost:8000/products')
            .then((data) => {
                setData(data.products);
            })
            .catch(console.error());
    }, [])
    //Add new product
    const AddProduct = () => {

    }
    //Edit product
    const EditProduct = (product) => {
        console.log(product);
    };
    //delete product
    const DeleteProduct = (product) => {
        fetchApi('http://localhost:8000/products/' + product._id, {
            method: "DELETE"
        })
            .then((data) => {
                console.log(data);
            })
            .catch(console.error());
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
                                            Tên sản phẩm
                                        </th>
                                        <th>
                                            Hình ảnh
                                        </th>
                                        <th>
                                            Nhà sản xuất
                                        </th>
                                        <th>
                                            Hệ điều hành
                                        </th>
                                        <th>
                                            Giá gốc
                                        </th>
                                        <th>
                                            Giá khuyến mãi
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
                                                {element.name}
                                            </td>
                                            <td>
                                                <img src={element.imageUrl} width='15%'/>
                                            </td>
                                            <td>
                                                {element.brand}
                                            </td>
                                            <td>
                                                {element.type}
                                            </td>
                                            <td>
                                                {element.buyPrice}
                                            </td>
                                            <td>
                                                {element.promotionPrice}
                                            </td>
                                            <td>
                                                <button onClick={AddProduct}>Thêm</button>
                                                <button onClick={() => EditProduct(element)}>Sửa</button>
                                                <button onClick={() => DeleteProduct(element)}>Xóa</button>
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
export default ProductLte;