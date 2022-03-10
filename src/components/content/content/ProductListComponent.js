import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Row, Col } from "reactstrap";
import NavigationComponent from "./NavigationComponent";


function ProductListComponent({ displayProduct }) {
    // console.log(displayProduct);
    const LIMIT_PRODUCT_PER_PAGE = 12;
    const NO_PAGE = Math.ceil(displayProduct.length / LIMIT_PRODUCT_PER_PAGE);
    const [seletePage, setSelectPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
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
    return (
        <Container>
            <Row>
                <Col xs='12'>
                    <h4 className="text-center py-4">PRODUCTS LIST</h4> <hr />
                    {
                        posts.map((element, index) => (
                            <div key={index} className="box-product" onClick={() =>HandleDetailClick(element)}>
                                <Card>
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
                            </div>
                        ))
                    }
                </Col>
            </Row>
            <NavigationComponent count={NO_PAGE} page={seletePage} setPage={setSelectPage} />
        </Container>
    )

}
export default ProductListComponent;
