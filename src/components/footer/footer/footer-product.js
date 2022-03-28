import { Col } from "reactstrap";

function Product () {
    return (
        <Col className="col-6 col-md-3 col-sm-6 col-lg-3" >
            <h5 className="footer-title">PRODUCTS</h5>
            <ul className="footer-content">
                <li>Help center</li>
                <li>Contact Us</li>
                <li>Product help</li>
                <li>Warranty</li>
                <li>Order status</li>
            </ul>
        </Col>
    )
}
export default Product;