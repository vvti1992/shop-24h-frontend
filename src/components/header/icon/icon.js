import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { alpha, Divider, Menu, MenuItem, styled } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';
import { auth } from '../../../firebase';
import { selectUserLogin, setUserLogin } from '../../../Redux/userslice';
import Login from '../../login/Login';

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
    //Ch???c n??ng xem ????n h??ng c???a t??i
    const handleMyOrder = () => {
        navigate("/my-order");
    }
    return (
        <div>
            {user.email !== "" ?
                <li onClick={showUserInfo} id='my-profile'>
                    <i class="fas fa-list fa-xl px-2"></i>
                    <UncontrolledTooltip
                        placement="left"
                        target="my-profile"
                    >
                        Th??ng tin kh??ch h??ng
                    </UncontrolledTooltip>
                </li>
                :
                <li xs='2' onClick={login}>
                    <FollowTheSignsIcon id='header-login' />
                    <UncontrolledTooltip
                        placement="right"
                        target="header-login"
                    >
                        ????ng nh???p
                    </UncontrolledTooltip>
                </li>

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
                    Th??ng tin t??i kho???n
                </MenuItem>
                <MenuItem onClick={handleMyOrder} disableRipple>
                    <ShoppingBagIcon />
                    ????n h??ng c???a t??i
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={logOut} disableRipple>
                    <LogoutIcon />
                    ????ng xu???t
                </MenuItem>

            </StyledMenu>
            <Login openModal={modalLogin} setOpenModal={setModalLogin} />
        </div>
    )
}
export default IconNavBar;