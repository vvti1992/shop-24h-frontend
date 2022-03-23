import { Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import IconNavBar from "./icon/icon";
import Logo from "./logo/logo";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectNumber } from "../../Redux/userslice";
import {} from '@mui/material';
import { useState } from "react";
function Header({setKeySearch}) {
    //get state redux
    const state = useSelector(selectNumber);
    const navigate = useNavigate();
    const handleOrder = () => {
        navigate("/buyorder");
    }

    const [search, setSearch] = useState("");
    //Sự kiện tìm kiếm khi nút enter được ấn
    const handleSearch = (event) => {
        if(event.key === 'Enter') {
            setKeySearch(search);
        }
    }
    return (
        <div className="fixed-top header">
            <Container>
                <Row className="row-header">
                    <Col xs='3'>
                        <Logo />
                    </Col>
                    <Col xs='5'>
                        <div className="form-inline my-2 my-lg-0 form-group">
                            <input className="form-control mr-sm-4 w-50" type="text" placeholder="Nhập tên sản phẩm cần tìm" 
                                onChange={(e)=>setSearch(e.target.value)}
                                onKeyPress={handleSearch}
                            />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </Col>
                    <Col xs='2' className="icon-bar">
                        <ul className='buy-card'>
                            <li>
                                <i className="fa-solid fa-bell fa-xl px-2"></i>
                            </li>
                            <li onClick={handleOrder}>
                                <i className="fa-solid fa-cart-shopping fa-xl px-2" href="#"
                                    id="UncontrolledTooltipExample">
                                    <UncontrolledTooltip
                                        placement="right"
                                        target="UncontrolledTooltipExample"
                                    >
                                        Xem giỏ hàng
                                    </UncontrolledTooltip>
                                </i>
                                <span className='shopping-notify'>{state}</span>
                            </li>

                        </ul>
                    </Col>
                    <Col xs='2' className="icon-bar">
                        <IconNavBar />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Header;