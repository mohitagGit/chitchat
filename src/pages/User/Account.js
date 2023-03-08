import { UserAuth } from '../../context/AuthContext';

function Account() {
    const {currentUser, googleSignOut} = UserAuth();
    const handleLogOut = async () => {
        try {
            await googleSignOut()
        } catch (error){
            console.log(error);
        }
    }
    return (
        <div>
            {(currentUser && currentUser.accessToken) && (
                <div>
                    <div><img src={currentUser.photoURL} height="50px" alt="User profile pic"/></div>
                    <div>Name: {currentUser.displayName}</div>
                    <div>Email: {currentUser.email}</div>
                    <div>Verified: {currentUser.emailVerified ? 'Yes': 'No'}</div>
                    <div>Last login at: {currentUser.metadata?.lastSignInTime}</div>
                    <div>Account created at: {currentUser.metadata?.creationTime}</div>
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            )}
        </div>
    )
}
export default Account;