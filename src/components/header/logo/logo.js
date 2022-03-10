import { Col } from 'reactstrap';
import logo from '../../../assets/images/800px-Youtube.png'
function Logo() {
    return (
        <Col sm='6'>
            <img className='logo' src={logo} alt="logo.png" width='130px'/>
        </Col>
    )
}
export default Logo;