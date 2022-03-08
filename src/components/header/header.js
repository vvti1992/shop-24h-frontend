import { Container, Row } from "reactstrap";
import IconNavBar from "./icon/icon";
import Logo from "./logo/logo";

function Header() {
    return (
        <div className="fixed-top header">
            <Container>
                <Row className="row-header">
                    <Logo />
                    <IconNavBar />
                </Row>
            </Container>
        </div>
    )
}
export default Header;