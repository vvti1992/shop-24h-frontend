import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import { Menu, MenuItem } from '@mui/material';
import { auth } from '../../../firebase';
import Login from '../../login/Login';

function IconNavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [user, setUser] = useState(null);
    const [modalLogin, setModalLogin] = useState(false)
    const open = Boolean(anchorEl);
    const showUserInfo = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOut = () => {
        auth.signOut().then(() => {
            setUser(null);
            setAnchorEl(null);

        }).catch((error) => {
            console.log(error);
        });
    };
    const login = () => {
        setModalLogin(true);
    };
    return (
        <div>
            {user ?
                <Row  >
                    <Col xs='10'>
                        <ul className='user-info'>
                            <li onClick={showUserInfo}><a >Tài khoản</a></li>
                            <li onClick={showUserInfo}>{user.displayName}</li>
                        </ul>
                    </Col>
                    <Col xs='2' className='pt-4'>
                        <img className='avatar' src={user.photoURL} />
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
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={logOut}>Log Out</MenuItem>
            </Menu>
            <Login openModal={modalLogin} setOpenModal={setModalLogin} setUser={setUser} />
        </div>
    )
}
export default IconNavBar;