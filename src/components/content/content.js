import { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import FilterComponent from "./content/FilterComponent";
import Introduce from "./content/introduce";
import ProductListComponent from "./content/ProductListComponent";
function Content() {
    const [listProduct, setListProduct] = useState([]);
    // console.log(listProduct);
    return (
        <Container className="bg-light content">
            <Row>
                <Introduce />
            </Row>
            <Row>
                <Col xs='3'>
                    <FilterComponent/>
                </Col>
                <Col xs='9'>
                    <ProductListComponent/>
                </Col>
            </Row>
        </Container>
    )
}
export default Content;