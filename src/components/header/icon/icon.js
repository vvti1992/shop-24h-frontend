import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { selectUserLogin} from '../../../Redux/userslice'
import { Menu, MenuItem } from '@mui/material';
import { auth } from '../../../firebase';
import Login from '../../login/Login';
import { setUserLogin } from "../../../Redux/userslice";
import { useNavigate } from 'react-router-dom';
import avatar from '../../../assets/images/avatar/unnamed.png'

function IconNavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const user = useSelector(selectUserLogin);
    const navigate = useNavigate();
    // console.log(user);
    const [modalLogin, setModalLogin] = useState(false);
    const dispatch = useDispatch();
    const userLogin = {
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        city: "",
        country: "",
    }
    const open = Boolean(anchorEl);
    const showUserInfo = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOut = () => {
        auth.signOut().then(() => {
            setAnchorEl(null);
            dispatch(setUserLogin(userLogin));
            navigate("/")

        }).catch((error) => {
            console.log(error);
        });
    };
    const login = () => {
        setModalLogin(true);
    };
    return (
        <div>
            {user.email !== "" ?
                <Row  >
                    <Col xs='10'>
                        <ul className='user-info'>
                            <li onPointerMove={showUserInfo}><a >Tài khoản</a></li>
                            <li onPointerMove={showUserInfo}>{user.fullName}</li>
                        </ul>
                    </Col>
                    <Col xs='2' className='pt-4' onPointerMove={showUserInfo}>
                    {user.photoURL !== "" ? <img className='avatar' src={avatar} /> : <img className='avatar' src={avatar}/>}
                    </Col>
                </Row>
                :
                <Row>
                    <Col xs='10'>
                        <ul className='user-info' onClick={login}>
                            <li><a >Đăng nhập/Đăng ký</a></li>
                            <li><a>Tài khoản</a></li>
                        </ul>
                    </Col>
                    <Col xs='2' className='pt-4'>
                        <i className="fa-solid fa-user fa-2xl text-white"></i>
                    </Col>
                </Row>
            }
            <Menu
                anchorEl={anchorEl}
                open={open}
                onPointerLeave={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={logOut}>Thông tin tài khoản</MenuItem>
                <MenuItem onClick={logOut}>Đơn hàng của tôi</MenuItem>
                <MenuItem onClick={logOut}>Đăng xuất</MenuItem>
            </Menu>
            <Login openModal={modalLogin} setOpenModal={setModalLogin}/>
        </div>
    )
}
export default IconNavBar;