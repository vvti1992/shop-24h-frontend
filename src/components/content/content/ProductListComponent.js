import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateNumber, addProduct } from "../../../Redux/userslice";
import { Container, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Row, Col } from "reactstrap";
import NavigationComponent from "./NavigationComponent";
import { useDispatch } from "react-redux";
import AlertSuccess from "../../alert-dialog/alert-success";

function ProductListComponent({ displayProduct }) {
    // console.log(displayProduct);
    const LIMIT_PRODUCT_PER_PAGE = 12;
    const NO_PAGE = Math.ceil(displayProduct.length / LIMIT_PRODUCT_PER_PAGE);
    const [seletePage, setSelectPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [number, setNumber] = useState(1);
    const dispatch = useDispatch();
    const [openModelNotify, setOpenModelNotify] = useState(false);
    const [messageModel, setMessageModal] = useState("");
    const [product, setProduct] = useState({
        _id: null,
        name: null,
        type: null,
        imageUrl: null,
        buyPrice: null,
        promotionPrice: null,
        description: null,
        brand: null,
        timeCreated: null,
        timeUpdate: null
    });
    useEffect(() => {
        if (displayProduct.length > 12)
            setPosts(displayProduct.slice(seletePage * LIMIT_PRODUCT_PER_PAGE - LIMIT_PRODUCT_PER_PAGE, seletePage * LIMIT_PRODUCT_PER_PAGE));
        else
            setPosts(displayProduct);
    }, [seletePage, displayProduct]);
    const navigate = useNavigate();
    const HandleDetailClick = (data) => {
        navigate("/products/" + data._id);
    }
    //Thêm sản phẩm vào giỏ hàng
    var productObject = {
        number: 0,
        product: null
    };
    const buyProduct = (product) =>{
        productObject = {
            number: number,
            product: product
        }
        dispatch(updateNumber(productObject));
        dispatch(addProduct(productObject));
        setOpenModelNotify(true);
        setMessageModal("Sản phẩm đã được thêm vào giỏ hàng thành công!");
    }
    return (
        <Container>
            <Row>
                <Col xs='12'>
                    <h4 className="text-center py-4">DANH SÁCH SẢN PHẨM</h4> <hr />
                    {
                        posts.map((element, index) => (
                            <div key={index} className="box-product" >
                                <Card onClick={() => HandleDetailClick(element)}>
                                    <CardImg
                                        alt="Image.jpg"
                                        src={element.imageUrl}
                                        top
                                        width="50%"
                                    />
                                    <CardBody>
                                        <CardTitle tag="h5">
                                            {element.name}
                                        </CardTitle>
                                        <CardSubtitle
                                            className="mb-2 text-muted"
                                            tag="h6"
                                        >
                                            {element.buyPrice.toLocaleString()} VNĐ
                                        </CardSubtitle>
                                        <CardText>
                                            {element.promotionPrice.toLocaleString()} VNĐ
                                        </CardText>
                                    </CardBody>

                                </Card>
                                <div className="overlay">
                                    <div style={{ float: "left" }} className="product-item" onClick={()=>buyProduct(element)}>
                                        <i class="fa-solid fa-cart-shopping" ></i>
                                    </div>
                                    <div style={{ float: "right" }} className="product-item" onClick={() => HandleDetailClick(element)}>
                                        <i class="fas fa-info-circle"></i>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Col>
            </Row>
            <NavigationComponent count={NO_PAGE} page={seletePage} setPage={setSelectPage} />
            <AlertSuccess open = {openModelNotify} setOpen = {setOpenModelNotify} message= {messageModel}/>
        </Container>
    )

}
export default ProductListComponent;
