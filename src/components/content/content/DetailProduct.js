import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Container, Row, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from "reactstrap";
import image1 from '../../../assets/images/galaxy s8/Blue_1.jpg';
import image2 from '../../../assets/images/galaxy s8/Blue_2.jpg';
import image3 from '../../../assets/images/galaxy s8/Blue_3.jpg';
import image4 from '../../../assets/images/galaxy s8/Blue_4.jpg';
import image5 from '../../../assets/images/galaxy s8/Blue_5.jpg';
import { useNavigate } from "react-router-dom";
import { updateNumber, addProduct } from "../../../Redux/userslice";
import AlertSuccess from "../../alert-dialog/alert-success";

function DetailProduct({ id }) {
    const dispatch = useDispatch();
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
    const [openModelNotify, setOpenModelNotify] = useState(false);
    const [messageModel, setMessageModal] = useState("");
    const [number, setNumber] = useState(1);
    const [relativeProduct, setRelativeProduct] = useState([]);
    const [bigImage, setBigImage] = useState("");
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
    useEffect(() => {
        fetchApi('http://localhost:8000/products/' + id)
            .then((data) => {
                setProduct(data.product);
                setBigImage(data.product.imageUrl);
            })
            .catch(console.error());
    }, [id]);
    useEffect(() => {
        fetchApi('http://localhost:8000/products?limit=10')
            .then((data) => {
                setRelativeProduct(data.products);
            })
            .catch(console.error());
        window.scrollTo(0, 0);
    }, []);
    // console.log(bigImage);

    const [orderArr, setOrderArr] = useState([]);
    const decreaseBtn = () => {
        if (number > 1) {
            setNumber(number - 1);
        }
    };
    const increaseBtn = () => {
        if (number < 100) {
            setNumber(number + 1);
        }
    };
    const onImage1Click = () => {
        setBigImage(image1);
    };
    const onImage2Click = () => {
        setBigImage(image2);
    };
    const onImage3Click = () => {
        setBigImage(image3);
    };
    const onImage4Click = () => {
        setBigImage(image4);
    };
    const onImage5Click = () => {
        setBigImage(image5);
    }
    var productObject = {
        number: 0,
        product: null
    };
    const buyProduct = () =>{
        productObject = {
            number: number,
            product: product
        }
        dispatch(updateNumber(productObject));
        dispatch(addProduct(productObject));
        setOpenModelNotify(true);
        setMessageModal("Sản phẩm đã được thêm vào giỏ hàng thành công!");
    }
    const buyMoreProduct = (value) =>{
        productObject = {
            number: 1,
            product: value
        }
        dispatch(updateNumber(productObject));
        dispatch(addProduct(productObject));
        setOpenModelNotify(true);
        setMessageModal("Sản phẩm đã được thêm vào giỏ hàng thành công!");
    }
  
    const navigate = useNavigate();
    const HandleDetailClick = (data) => {
        navigate("/products/" + data._id);
        setNumber(1);
    }
    return (
        <Container className="bg-light">
            <Row>
                <Col xs='5'>
                    <div className="pt-1">
                        <img alt={product.name ? product.name : "img.jpg"} src={bigImage} className='w-100' />
                    </div>
                    <div className="hinhnho">
                        <img src={image1} onClick={onImage1Click}/>
                        <img src={image2} onClick={onImage2Click}/>
                        <img src={image3} onClick={onImage3Click}/>
                        <img src={image4} onClick={onImage4Click}/>
                        <img src={image5} onClick={onImage5Click}/>
                    </div>
                </Col>
                <Col xs='7'>
                    <h3 className="detail-name">{product.name}</h3>
                    <p className="detail-brand">Brand: {product.brand}</p>
                    <p className="detail-type">Type: {product.type}</p>
                    <h5 className="detail-price">{product.buyPrice ? product.buyPrice.toLocaleString() : ""} VNĐ</h5>
                    <h5 className="detail-promotion-price">{product.promotionPrice ? product.promotionPrice.toLocaleString() : ""} VNĐ</h5>
                    <div>
                        <button className="btn-detail" onClick={decreaseBtn}>-</button> <span className="px-2">{number}</span>
                        <button className="btn-detail" onClick={increaseBtn}>+</button>
                    </div>
                    <div className="pt-3">
                        <button className="btn-add-to-card" onClick={buyProduct}>THÊM VÀO GIỎ HÀNG</button>
                    </div>
                </Col>
                <p className="detail-description">{product.description}</p> <hr />
            </Row>
            <Row>
                <Col xs='12'>
                    <h5 className="text-center text-bold">THAM KHẢO SẢN PHẨM KHÁC</h5>
                    {
                        relativeProduct.map((element, index) => (
                            <div key={index} className="box-product-detail col-sm-6 col-md-3 col-6 col-lg-3">
                                <Card onClick={() =>HandleDetailClick(element)}>
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
                                <div className="overlay-detail">
                                    <div style={{ float: "left" }} className="product-item" onClick={()=>buyMoreProduct(element)}>
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
            <hr />
            <AlertSuccess open = {openModelNotify} setOpen = {setOpenModelNotify} message= {messageModel}/>
        </Container>
        
    )
};
export default DetailProduct;
