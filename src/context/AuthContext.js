import { useContext, createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from "firebase/auth";
// import { auth } from "../store/firebase";
import { auth } from "../store/firebase";
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from "../store/firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});
    const [currentUserData, setCurrentUserData] = useState({});

    const googleSignInWithRedirect = () => {
        const provider = new GoogleAuthProvider();
        signInWithRedirect(auth, provider);
    }

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider);
    }

    const googleSignOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        const subscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log("Logged In User: ",user);

            if(user && user.accessToken){

                const collectionUserRef = collection(db,'users');
                const Query = query(collectionUserRef, where("providerId", "==", user.uid));
                onSnapshot(Query, (userData) => {
                    let tempUser = [];
                    userData.docs.forEach((doc)=>{
                        tempUser.push({...doc.data(), id: doc.id});
                    })
                    if(tempUser.length === 1){
                        console.log("User data refined: ",...tempUser);
                        setCurrentUserData(...tempUser);
                    }
                    else if(tempUser.length === 0){
                        const create_user_data = {
                            createdAt: user.metadata?.creationTime,
                            lastLoginAt: user.metadata?.lastSignInTime,
                            email: user.email,
                            metaData: null,
                            name: user.displayName,
                            phoneNumber: user.providerData[0]?.phoneNumber,
                            photoUrl: user.photoURL,
                            provider: user.providerId,
                            providerId: user.uid,
                            status:"active",
                        };
                        const collectionRef = collection(db,'users');
                        addDoc(collectionRef,create_user_data).then((response)=>{
                            console.log("User created: ",response);
                        }).catch((error)=>{
                            console.log("User creation error: ",error);
                        })
                    }
                    else{
                        alert("Invalid user, please try again");
                    }
                });
            }
            else{
                // do something if user in not logged in
            }
        });
        return () => subscribe();
    },[])
    return(
        <AuthContext.Provider value={{googleSignIn, googleSignOut, googleSignInWithRedirect, currentUser, currentUserData}}>
            {children}
        </AuthContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(AuthContext);
}