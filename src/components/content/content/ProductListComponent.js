import { useState, useEffect } from "react";
import { Container, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Row, Col } from "reactstrap";
import NavigationComponent from "./NavigationComponent";

function ProductListComponent() {
    const [listProduct, setListProduct] = useState([]);
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
    useEffect(() => {
        let mounted = true;
        fetchApi('http://localhost:8000/products')
            .then((data) => {
                if(mounted) {
                    setListProduct(data.products);
                    console.log(data.products);
                  }
            })
            .catch(console.error());
            return () => mounted = false;
    }, [])
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
                ))
            }
                </Col>
            </Row>
            <NavigationComponent count={NO_PAGE} page={seletePage} setPage = {setSelectPage}/>
        </Container>
    )

}
export default ProductListComponent;
