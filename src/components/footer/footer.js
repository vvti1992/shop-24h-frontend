import Product from "./footer/footer-product";
import Service from "./footer/footer-service";
import Social from "./footer/footer-social";
import Support from "./footer/footer-support";
import {Container, Row } from "reactstrap";

function Footer() {
    return(
        <Container className="bg-light mt-5 pt-3">
        <Row>
                <Product/>
                <Service/>
                <Support/>
                <Social/>
        </Row>
        </Container>
    )
}
export default Footer;