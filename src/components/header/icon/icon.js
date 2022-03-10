import 'bootstrap/dist/css/bootstrap.min.css'
import { Col } from 'reactstrap';

function IconNavBar() {
    return (
        <Col sm='6' className='text-right pt-4 text-primary'>
            <ul>
                <li>
                    <i className="fa-solid fa-bell p-2"></i>
                </li>
                <li>
                    <i className="fa-solid fa-user p-2"></i>
                </li>
                <li>
                    <i className="fa-solid fa-cart-shopping p-2"></i>
                </li>
            </ul>
        </Col>
    )
}
export default IconNavBar;