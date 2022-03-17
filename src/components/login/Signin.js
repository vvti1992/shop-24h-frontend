import { Modal } from '@mui/material';
import { useState } from 'react';
import { Button, Col, Container, Input, Row } from "reactstrap";
import AlertSuccess from '../alert-dialog/alert-success';
function Signin({ open, setOpen }) {
    const [fullName, setFullName] = useState("");
    const [numberPhone, setNumberPhone] = useState(null);
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const fetchApi = async (paramUrl, paramOption = {}) => {
        const response = await fetch(paramUrl, paramOption);
        const responseData = await response.json();
        return responseData;
    };
    const [openModal, setOpenModal] = useState(false);
    const [message, setMessage] = useState("");
    const inputFullName = (paramFullName) => {
        setFullName(paramFullName.target.value);
    }
    const inputNumberPhone = (paramNumberPhone) => {
        setNumberPhone(paramNumberPhone.target.value);
    }
    const inputAddress = (paramAddress) => {
        setAddress(paramAddress.target.value);
    }

    const inputEmail = (paramEmail) => {
        setEmail(paramEmail.target.value);
    }
    const inputPassword = (paramPassword) => {
        setPassword(paramPassword.target.value);
    }
    const inputConfirmPassword = (paramConfirmPassword) => {
        setConfirmPassword(paramConfirmPassword.target.value);
    }

    const validate = () => {
        if (fullName.trim() === "") {
            alert("Input your name!");
            return false
        }
        if (numberPhone.trim() === "") {
            alert("Input your number phone!");
            return false
        }
        if (address.trim() === "") {
            alert("Input your address!");
            return false
        }
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        var checkEmail = re.test(email.trim());
        if (!checkEmail) {
            alert("Email invalid!");
            return false
        }
        if (confirmPassword !== password) {
            alert("Password is wrong!");
            return false
        }
        return true;
    }
    const onGetStartClick = () => {
        var vValidate = validate();
        if (vValidate) {
            fetchApi('http://localhost:8000/customers',{
            method: 'POST',
            body: JSON.stringify({
                fullName: fullName,
                phoneNumber: numberPhone,
                password: password,
                email: email,
                address: address
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
        .then((data) => {
            console.log(data);
            setOpenModal(true);
            setMessage("Đăng ký thành công!");
            setOpen(false);
        })
        .catch((error)=>{
            setOpenModal(true);
            setMessage("Đăng ký thất bại. Vui lòng thử lại!");
        })
    }
    }
    const handleClose = () => setOpen(false);
    return (
        <>
        <Modal
            open={open}
            onClose={handleClose}
        >
                <div className="form-signup">
                    <Container>
                        <p className="text-center text-white">Sign up for free!</p>
                        <Row>
                            <Col sm='12'>
                                <Input placeholder="Full name*" value={fullName} onChange={inputFullName} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12'>
                                <Input placeholder="Number phone*" value={numberPhone} onChange={inputNumberPhone} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12'>
                                <Input placeholder="Email address*" value={email} onChange={inputEmail} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12'>
                                <Input type='password' placeholder="Set a password*" value={password} onChange={inputPassword} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12'>
                                <Input type='password' placeholder="Confirm password*" value={confirmPassword} onChange={inputConfirmPassword} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12'>
                                <Input placeholder="Address" value={address} onChange={inputAddress} />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm='12'>
                                <Button onClick={onGetStartClick} className='sign-google signin' >SIGN IN</Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
        </Modal>
        <AlertSuccess open={openModal} setOpen = {setOpenModal} message= {message}/>
        </>
    )
}
export default Signin;