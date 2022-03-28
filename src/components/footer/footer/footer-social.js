import { Col } from "reactstrap";
import logo from '../../../assets/images/800px-Youtube.png'
function Social() {
    return (
        <Col className="col-6 col-md-3 col-sm-6 col-lg-3">
            <div className="footer-logo">
            <img className='pb-3' src={logo} alt="logo.png" width='50%'/>
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