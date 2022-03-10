import { useState, useEffect } from "react";
import { Container, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Row, Col } from "reactstrap";
import NavigationComponent from "./NavigationComponent";

function ProductListComponent({listProduct}) {
    // console.log(listProduct);
    const LIMIT_PRODUCT_PER_PAGE = 9;
    const NO_PAGE = Math.ceil(listProduct.length / LIMIT_PRODUCT_PER_PAGE);
    const [seletePage, setSelectPage] = useState(1);
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        setPosts(listProduct.slice(seletePage*LIMIT_PRODUCT_PER_PAGE - LIMIT_PRODUCT_PER_PAGE,seletePage*LIMIT_PRODUCT_PER_PAGE));
    },[seletePage,listProduct ]);
    return (
        <Container>
            <Row>
                <Col xs='12'>
                <h4 className="text-center py-4">PRODUCTS LIST</h4> <hr />
            {
                posts.map((element, index) => (
                    <Card key={index}>
                        <CardImg
                            alt="Image.jpg"
                            src={element.URLImage}
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
                                {element.price} VNĐ
                            </CardSubtitle>
                            <CardText>
                                {element.discountPrice} VNĐ
                            </CardText>
                        </CardBody>
                    </Card>
                ))
            }
                </Col>
            </Row>
            <NavigationComponent count={NO_PAGE} page={seletePage} setPage = {setSelectPage}/>
        </Container>
    )
}
export default ProductListComponent;
