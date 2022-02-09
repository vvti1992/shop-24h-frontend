import { Col } from 'reactstrap';
import logo from '../../../assets/images/thegioididong.png'
function Logo() {
    return (
        <Col sm='6'>
            <img src={logo} alt="logo.png" width='200px'/>
        </Col>
    )
}
export default Logo;