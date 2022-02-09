import { Container, Row, Col } from "reactstrap";
import LIST_PRODUCE_JSON from "../../list-products";

function LastestProduct() {
    const LIST_PRODUCE = JSON.parse(LIST_PRODUCE_JSON);
    return (
        <Container>
            <h4 className="text-center py-4">LASTEST PRODUCTS</h4> <hr/>
            <Row className="pb-3">
                <Col sm='3'>
                    <div className="card">
                        <img className="card-img-top" src={LIST_PRODUCE[0].URLImage} alt="Galaxy_S20_FE_(8GB/256GB).jpg" />
                        <div className="card-body">
                            <h4 className="card-title">{LIST_PRODUCE[0].name}</h4>
                            <p className="card-text"><span>{LIST_PRODUCE[0].price} VNĐ</span></p>
                            <Row>
                                <Col sm='7'>
                                    <p className="card-text">{LIST_PRODUCE[0].discountPrice} VNĐ</p>
                                </Col>
                                <Col sm='5' className="text-info">
                                    <i class="fa-solid fa-circle-info px-2"></i>
                                    <i class="fa-solid fa-cart-shopping px-2"></i>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col sm='3'>
                    <div className="card">
                        <img className="card-img-top" src={LIST_PRODUCE[1].URLImage} alt="Galaxy_S20_FE_(8GB/256GB).jpg" />
                        <div className="card-body">
                            <h4 className="card-title">{LIST_PRODUCE[1].name}</h4>
                            <p className="card-text"><span>{LIST_PRODUCE[1].price} VNĐ</span></p>
                            <Row>
                                <Col sm='7'>
                                    <p className="card-text">{LIST_PRODUCE[1].discountPrice} VNĐ</p>
                                </Col>
                                <Col sm='5' className="text-info">
                                    <i class="fa-solid fa-circle-info px-2"></i>
                                    <i class="fa-solid fa-cart-shopping px-2"></i>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col sm='3'>
                    <div className="card">
                        <img className="card-img-top" src={LIST_PRODUCE[2].URLImage} alt="Galaxy_S20_FE_(8GB/256GB).jpg" />
                        <div className="card-body">
                            <h4 className="card-title">{LIST_PRODUCE[2].name}</h4>
                            <p className="card-text"><span>{LIST_PRODUCE[2].price} VNĐ</span></p>
                            <Row>
                                <Col sm='7'>
                                    <p className="card-text">{LIST_PRODUCE[2].discountPrice} VNĐ</p>
                                </Col>
                                <Col sm='5' className="text-info">
                                    <i class="fa-solid fa-circle-info px-2"></i>
                                    <i class="fa-solid fa-cart-shopping px-2"></i>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col sm='3'>
                    <div className="card">
                        <img className="card-img-top" src={LIST_PRODUCE[3].URLImage} alt="Galaxy_S20_FE_(8GB/256GB).jpg" />
                        <div className="card-body">
                            <h4 className="card-title">{LIST_PRODUCE[3].name}</h4>
                            <p className="card-text"><span>{LIST_PRODUCE[3].price} VNĐ</span></p>
                            <Row>
                                <Col sm='7'>
                                    <p className="card-text">{LIST_PRODUCE[3].discountPrice} VNĐ</p>
                                </Col>
                                <Col sm='5' className="text-info">
                                    <i class="fa-solid fa-circle-info px-2"></i>
                                    <i class="fa-solid fa-cart-shopping px-2"></i>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="pb-3">
                <Col sm='3'>
                    <div className="card">
                        <img className="card-img-top" src={LIST_PRODUCE[4].URLImage} alt="Galaxy_S20_FE_(8GB/256GB).jpg" />
                        <div className="card-body">
                            <h4 className="card-title">{LIST_PRODUCE[4].name}</h4>
                            <p className="card-text"><span>{LIST_PRODUCE[4].price} VNĐ</span></p>
                            <Row>
                                <Col sm='7'>
                                    <p className="card-text">{LIST_PRODUCE[4].discountPrice} VNĐ</p>
                                </Col>
                                <Col sm='5' className="text-info">
                                    <i class="fa-solid fa-circle-info px-2"></i>
                                    <i class="fa-solid fa-cart-shopping px-2"></i>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col sm='3'>
                    <div className="card">
                        <img className="card-img-top" src={LIST_PRODUCE[5].URLImage} alt="Galaxy_S20_FE_(8GB/256GB).jpg" />
                        <div className="card-body">
                            <h4 className="card-title">{LIST_PRODUCE[5].name}</h4>
                            <p className="card-text"><span>{LIST_PRODUCE[5].price} VNĐ</span></p>
                            <Row>
                                <Col sm='7'>
                                    <p className="card-text">{LIST_PRODUCE[5].discountPrice} VNĐ</p>
                                </Col>
                                <Col sm='5' className="text-info">
                                    <i class="fa-solid fa-circle-info px-2"></i>
                                    <i class="fa-solid fa-cart-shopping px-2"></i>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col sm='3'>
                    <div className="card">
                        <img className="card-img-top" src={LIST_PRODUCE[6].URLImage} alt="Galaxy_S20_FE_(8GB/256GB).jpg" />
                        <div className="card-body">
                            <h4 className="card-title">{LIST_PRODUCE[6].name}</h4>
                            <p className="card-text"><span>{LIST_PRODUCE[6].price} VNĐ</span></p>
                            <Row>
                                <Col sm='7'>
                                    <p className="card-text">{LIST_PRODUCE[6].discountPrice} VNĐ</p>
                                </Col>
                                <Col sm='5' className="text-info">
                                    <i class="fa-solid fa-circle-info px-2"></i>
                                    <i class="fa-solid fa-cart-shopping px-2"></i>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
                <Col sm='3'>
                    <div className="card">
                        <img className="card-img-top" src={LIST_PRODUCE[7].URLImage} alt="Galaxy_S20_FE_(8GB/256GB).jpg" />
                        <div className="card-body">
                            <h4 className="card-title">{LIST_PRODUCE[7].name}</h4>
                            <p className="card-text"><span>{LIST_PRODUCE[7].price} VNĐ</span></p>
                            <Row>
                                <Col sm='7'>
                                    <p className="card-text">{LIST_PRODUCE[7].discountPrice} VNĐ</p>
                                </Col>
                                <Col sm='5' className="text-info">
                                    <i class="fa-solid fa-circle-info px-2"></i>
                                    <i class="fa-solid fa-cart-shopping px-2"></i>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </Col>
            </Row>

        </Container>
    )
}
export default LastestProduct;