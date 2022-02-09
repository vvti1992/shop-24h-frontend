import { Container, Row } from "reactstrap";
import Introduce from "./content/introduce";
import LastestProduct from "./content/lastest-product";
import ViewAll from "./content/view-all";
function Content() {
    return (
        <Container className="bg-light content">
            <Row>
                <Introduce/>
            </Row>
            <Row>
                <LastestProduct />
            </Row>
            <Row>
                <ViewAll />
            </Row>
        </Container>
    )
}
export default Content;