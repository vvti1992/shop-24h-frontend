import { Container, Row } from "reactstrap";
import IconNavBar from "./icon/icon";
import Logo from "./logo/logo";

function Header() {
    return(
        <Container className="bg-light fixed-top">
        <Row>
                <Logo/>
                <IconNavBar/>
        </Row>
        </Container>
    )
}
export default Header;