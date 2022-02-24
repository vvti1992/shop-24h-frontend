import { Col } from "reactstrap";
import Logo from "../../header/logo/logo";
function Social() {
    return (
        <Col sm='3' className=''>
            <div className="footer-logo">
                <Logo />
            </div>
            <div>
                <ul className='footer-icon'>
                    <li>
                        <i className="fa-brands fa-facebook-square"></i>
                    </li>
                    <li>
                        <i className="fa-brands fa-instagram-square"></i>
                    </li>
                    <li>
                        <i className="fa-brands fa-youtube"></i>
                    </li>
                    <li>
                        <i className="fa-brands fa-twitter"></i>
                    </li>
                </ul>
            </div>
        </Col>
    )
}
export default Social;