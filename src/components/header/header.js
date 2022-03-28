import { Container, Row, Col, UncontrolledTooltip } from "reactstrap";
import IconNavBar from "./icon/icon";
import logo from "../../assets/images/800px-Youtube.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectNumber } from "../../Redux/userslice";
import { } from '@mui/material';
import { useState } from "react";
function Header({ setKeySearch }) {
    //get state redux
    const state = useSelector(selectNumber);
    const navigate = useNavigate();
    const handleOrder = () => {
        navigate("/buyorder");
    }

    const [search, setSearch] = useState("");
    //Sự kiện tìm kiếm khi nút enter được ấn
    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            setKeySearch(search);
        }
    }
    return (
        <div className="fixed-top header">
            <Container>
                <Row className="row-header">
                    <Col className="logo col-3 col-sm-3 col-md-3">
                        <img src={logo} alt="logo.png" width='50%' />
                    </Col>
                    <Col className="col-5 col-sm-5 col-md-5 col-lg-5 search-customer">
                        <div className="form-inline my-2  form-group">
                            <input className="form-control" type="text" placeholder="Nhập tên sản phẩm cần tìm"
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyPress={handleSearch}
                            />
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </Col>
                    <Col className="icon-bar col-4 col-sm-4 col-md-4 col-lg-4">
                        <ul className='buy-card'>
                            <li id="header-notify">
                                <i className="fa-solid fa-bell fa-xl px-2"></i>
                                <UncontrolledTooltip
                                    placement="left"
                                    target="header-notify"
                                >
                                    Xem thông báo
                                </UncontrolledTooltip>
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
                                    <span className='shopping-notify'>{state}</span>
                                </i>
                                
                            </li>
                            <IconNavBar />
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default Header;