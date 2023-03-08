import GoogleButton from 'react-google-button';
import { UserAuth } from '../../../context/AuthContext';
import Home from '../../Home';
import { Footer } from '../../../components/Footer/Footer';
import './Login.css';

function Login() {
    const { currentUser, googleSignIn } = UserAuth();
    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            // await googleSignInWithRedirect();
        } catch(error){
            console.log("Sign In Error: ",error);
        }
    }
    return (
        <>
            {(currentUser && currentUser.accessToken) ? <div>
                    <Home/>
                </div>:
                <div className="app-min-width overlay shadow">
                    <div className="con">
                        <div className="header">
                            <div className="app-logo">
                                <img src="https://cultureofyes.files.wordpress.com/2020/04/chit-chat.png" height="125px" alt="Logo"/>
                            </div>
                            <p className="my-3">login on ChitChat using your google account</p>
                        </div>
                        <div className="field-set">
                            <GoogleButton onClick={handleGoogleSignIn}/>
                        </div>
                        <div className="footer"><Footer/></div>
                    </div>
                </div>
            }
        </>
    )
}
export default Login;