import { googleProvider, auth } from '../../firebase';
import { Modal, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../Redux/userslice';
import Signin from './Signin';
import { useNavigate } from 'react-router-dom';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: "5%"
};
function Login({ openModal, setOpenModal }) {
    const [modalSignIn, setModalSignIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [login, setLogin] = useState(false);
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    }
    const logInGoogle = () => {
        auth.signInWithPopup(googleProvider)
            .then((response) => {
                fetchApi('http://localhost:8000/customers/?email=' + response.user.email)
                    .then((data) => {
                        if (data.Customers.length > 0) {
                            //Email có tồn tại trong CSDL, chuyển sang trang hiển thị thông tin người dùng
                            setOpenModal(false);
                            dispatch(setUserLogin(data.Customers[0]));
                            if(response.user.email === "tivv@devcamp.edu.vn")
                            navigate("/admin");
                        }
                        else {
                            //Email không tồn tại trong CSDL, chuyển sang trang đăng nhập
                            setLogin(true);
                        }
                    })
                    .catch(console.error());

                // console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    }

    const handleClose = () => {
        setOpenModal(false);
        setLogin(false);

    }
    //get input email & password
    const inputEmail = (paramEmail) => {
        setEmail(paramEmail.target.value);
    }
    const inputPassword = (paramPassword) => {
        setPassword(paramPassword.target.value);
    }
    //validate input data
    const validate = () => {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var checkEmail = re.test(email.trim());
        if (!checkEmail) {
            alert("Email invalid!");
            return false
        }
        if (password.trim() === "") {
            alert("Input password!");
            return false
        }
        return true;
    }
    const signIn = () => {
        setModalSignIn(true);
        setOpenModal(false);
        setLogin(false);
        setEmail("");
        setPassword("");
    }
    const logIn = () => {
        var vValidate = validate();
        if (vValidate) {
            fetchApi('http://localhost:8000/customers')
                .then((data) => {
                    var isExist = false;
                    var user = null
                    data.Customers.forEach(element => {
                        if (element.email === email && element.password === password) {
                            //Email có tồn tại trong CSDL, chuyển sang trang hiển thị thông tin người dùng
                            isExist = true;
                            user = element;
                        }
                    });
                    if (isExist) {
                        dispatch(setUserLogin(user));
                        setOpenModal(false);
                        if(email === 'tivv@devcamp.edu.vn')
                        navigate("/admin");
                        setEmail("");
                        setPassword("");
                    }
                    else {
                        //Email không tồn tại trong CSDL, chuyển sang trang đăng nhập
                        setLogin(true);
                    }
                })
                .catch(console.error());

        };
    }
    return (
        <>
            <Modal
                open={openModal}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <div className="form-login">
                        <button className="sign-google " onClick={logInGoogle}><i className="fa-brands fa-google" ></i> Sign in with Google</button>
                        <hr />
                        <div className="break-line">
                            <label> Or</label>
                        </div>
                        <input className="input-login" placeholder="Email" onChange={inputEmail}></input>
                        <input type='password' className="input-login" placeholder="Password" onChange={inputPassword}></input>
                        <button className="sign-google signin" onClick={logIn}>Sign In</button>
                    </div>
                    <div className="message">
                        {login ? <div className='login-fail'>
                            <p>
                                Tài khoản này chưa tồn tại trong hệ thống, vui lòng thử lại hoặc nhấn nút đăng ký bên dưới!
                            </p>
                        </div> : ''}
                        <p>
                            Don't have an account? <a onClick={signIn}>Sign up here</a>
                        </p>
                    </div>
                </Box>
            </Modal>
            <Signin open={modalSignIn} setOpen={setModalSignIn} />
        </>
    )
}
export default Login;