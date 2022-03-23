import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { useSelector, useDispatch } from "react-redux";
import { selectUserLogin } from '../../../Redux/userslice'
import { Menu, MenuItem, Divider, alpha, styled } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../../../firebase';
import Login from '../../login/Login';
import { setUserLogin } from "../../../Redux/userslice";
import { useNavigate } from 'react-router-dom';
import avatar from '../../../assets/images/avatar/unnamed.png'

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

function IconNavBar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const user = useSelector(selectUserLogin);
    const navigate = useNavigate();
    //open component view Order
    const [viewOrder, setViewOrder] = useState(false);
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
    const showUserInfo = (event) => {
        setAnchorEl(event.currentTarget);
    }
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
    const closeMenu = () => {
        setAnchorEl(null);
    }
    //Chức năng xem đơn hàng của tôi
    const handleMyOrder = () => {
        navigate("/my-order");
    }
    return (
        <div>
            {user.email !== "" ?
                <Row  >
                    <Col xs='8'>
                        <ul className='user-info'
                            id="demo-customized-button"
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onMouseEnter={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            <li><a >Tài khoản</a></li>
                            <li>{user.fullName}</li>
                        </ul>
                    </Col>
                    <Col xs='2' className='pt-4' onPointerMove={showUserInfo}>
                        {user.photoURL !== "" ? <img className='avatar' src={avatar} /> : <img className='avatar' src={avatar} />}
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
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onMouseDown={handleClose}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} disableRipple>
                    <InfoIcon />
                    Thông tin tài khoản
                </MenuItem>
                <MenuItem onClick={handleMyOrder} disableRipple>
                    <ShoppingBagIcon/>
                    Đơn hàng của tôi
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={logOut} disableRipple>
                    <LogoutIcon />
                    Đăng xuất
                </MenuItem>
            </StyledMenu>
            <Login openModal={modalLogin} setOpenModal={setModalLogin} />
        </div>
    )
}
export default IconNavBar;