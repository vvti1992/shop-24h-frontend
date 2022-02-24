import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react';
import { Col } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from '@mui/material';
import { auth } from '../../../firebase';
import Login from '../../login/Login';
function IconNavBar() {
    const navigate = useNavigate();
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
        <>
            <Col sm='6' className='text-right pt-2 text-primary'>
                <div>

                    {user ?
                        <ul  className='user-info'>
                            <li onClick={showUserInfo}>{localStorage.getItem("username")}</li>
                            <li onClick={showUserInfo}><img className='avatar' src={localStorage.getItem("userimage")}></img></li>
                        </ul>
                        :
                        <ul  className='user-info'>
                            <li><a onClick={login}>Đăng nhập/Đăng ký</a></li>
                        </ul>
                    }

                </div>
                <ul className='icon'>
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
        </>
    )
}
export default IconNavBar;