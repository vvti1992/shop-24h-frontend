import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Pagination } from '@mui/material';
import DeleteProductModal from '../alert-dialog/deleteProductModal';
import AddProductModal from '../alert-dialog/addProductModal';

function ProductLte() {
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
        window.scrollTo(0,0);
    }
    useEffect(() => {
        fetchApi("http://localhost:8000/products")
            .then((data) => {
                setNoPage(Math.ceil(data.products.length / limitRow));
                setPosts(data.products.slice(page * limitRow - limitRow, page * limitRow));
            }).catch((error) => {
                console.log(error);
            });
    }, [page]);
    //set state modal
    const [addProductModal, setAddProductModal] = useState(false);
    const [editProductModal, setEditProductModal] = useState(false);
    const [deleteProductModal, setDeleteProductModal] = useState(false);
    const [productId, setProductId] = useState("");
    //Add new product
    const AddProduct = () => {
        setAddProductModal(true);
    }
    //Edit product
    const EditProduct = (product) => {
        console.log(product);
    };
    //delete product
    const DeleteProduct = (product) => {
        setDeleteProductModal(true);
        setProductId(product._id);
    };
    return (
        <div>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Danh sách thông tin sản phẩm</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <Table hover className='text-center table-product'>
                                <thead className='bg-primary'>
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
                                            Giá gốc (VNĐ)
                                        </th>
                                        <th>
                                            Giá khuyến mãi (VNĐ)
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
                                                {element.name}
                                            </td>
                                            <td>
                                                <img src={element.imageUrl} width='100%' />
                                            </td>
                                            <td>
                                                {element.brand}
                                            </td>
                                            <td>
                                                {element.type}
                                            </td>
                                            <td>
                                                {element.buyPrice.toLocaleString()}
                                            </td>
                                            <td>
                                                {element.promotionPrice.toLocaleString()}
                                            </td>
                                            <td>
                                                <button onClick={AddProduct} className="btn btn-info">Thêm</button>
                                                <button onClick={() => EditProduct(element)} className="btn btn-warning ml-2">Sửa</button>
                                                <button onClick={() => DeleteProduct(element)} className="btn btn-danger ml-2">Xóa</button>
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
            <AddProductModal openModal={addProductModal} setOpenModal={setAddProductModal} />
            <DeleteProductModal openAlertModal={deleteProductModal} setOpenAlertModal= {setDeleteProductModal} productId = {productId}/>
        </div>

    )
}
export default ProductLte;