import { UserAuth } from '../context/AuthContext';
import Login from './User/Login/Login';
import { useNavigate } from 'react-router-dom';

function Home() {
    const {currentUserData,currentUser,googleSignOut} = UserAuth();
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await googleSignOut()
        } catch (error){
            console.log(error);
        }
    };

    return (
        <>
            {currentUser ?
                <div className="app-min-width py-5 my-5 text-center shadow">
                    <div><img src={currentUser.photoURL} height="75px" alt="Profile Pic"/></div>
                    <h3 className="py-2">Welcome, {currentUserData.name}</h3>
                    <div className="d-grid gap-2 col-6 mx-auto my-5">
                        <button className="btn btn-outline-dark" type="button" onClick={()=> navigate(`/groups`)}>
                            Your Messages <i className="bi bi-chat-dots-fill"></i>
                        </button>
                        <button className="btn btn-outline-dark" type="button" onClick={()=> navigate(`/folders`)}>
                            Your Tasks <i className="bi bi-card-checklist"></i>
                        </button>
                        <button className="btn btn-outline-danger" type="button" onClick={handleLogOut}>
                            Log Out <i className="bi bi-box-arrow-in-left"></i>
                        </button>
                    </div>
                </div>:<Login/>
            }
        </>
    )
}
export default Home;