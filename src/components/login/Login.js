import { googleProvider, auth } from '../../firebase';
import {Modal, Box} from '@mui/material';
import { useEffect } from 'react';
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
function Login({openModal, setOpenModal, setUser}) {
    const signInGoogle = () => {
        auth.signInWithPopup(googleProvider)
            .then((response) => {
                setUser(response);
                setOpenModal(false);
            }).catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        auth.onAuthStateChanged((response)=>{
          setUser(response);
        })
      }, []);
    const handleClose = () => setOpenModal(false);
    return (
        <Modal
            open={openModal}
            onClose={handleClose}
        >
            <Box sx={style}>
                <div className="form-login">
                    <button className="sign-google " onClick={signInGoogle}><i className="fa-brands fa-google" ></i> Sign in with Google</button>
                    <hr />
                    <div className="break-line">
                        <label> Or</label>
                    </div>
                    <input className="input-login" placeholder="Username"></input>
                    <input className="input-login" placeholder="Password"></input>
                    <button className="sign-google signin" onClick={signInGoogle}>Sign In</button>
                </div>
                <div className="message">
                    <p>
                        Don't have an account? <a href="/#">Sign up here</a>
                    </p>
                </div>
            </Box>
        </Modal>
    )
}
export default Login;