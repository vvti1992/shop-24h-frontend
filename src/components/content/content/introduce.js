import { Col, Breadcrumb, BreadcrumbItem } from "reactstrap";
import Carousel from 'react-bootstrap/Carousel';
function Introduce() {
    return (
        <Col sm='12'>
            <Breadcrumb>
                <BreadcrumbItem>
                    <a >
                        Home
                    </a>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <a href="/">
                    Product
                    </a>
                </BreadcrumbItem>
            </Breadcrumb>
            <Carousel className="carousel">
                <Carousel.Item>
                    <img className="d-block img-fluid" src='	https://cdn.tgdd.vn/2022/01/banner/830-300-830x300-21.png' alt="First slide" width="100%" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block img-fluid" src='https://cdn.tgdd.vn/2022/02/banner/830-300-830x300-4.png' alt="Second slide" width="100%" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block img-fluid" src='https://cdn.tgdd.vn/2022/01/banner/khaixuan-reno6-830-300-830x300.png' alt="Third slide" width="100%" />
                </Carousel.Item>
                <Carousel.Item>
                    <img className="d-block img-fluid" src='https://cdn.tgdd.vn/2022/02/banner/830-300-830x300-2.png' alt="fourth slide" width="100%" />
                </Carousel.Item>
            </Carousel>
        </Col>
    )
}
export default Introduce;