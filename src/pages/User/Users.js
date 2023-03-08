import { UserAuth } from "../../context/AuthContext";
import { db } from "../../store/firebase";
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Users(){
    const {currentUserData} = UserAuth();
    const collectionRef = collection(db,'users');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const getUsersData = () =>{
        getDocs(collectionRef).then((userData)=>{
            let users = [];
            userData.docs.forEach((doc)=>{
                users.push({...doc.data(), id: doc.id});
            })
            console.log("Users data refined: ",users);
            setUsers(users);
        })
        .catch((error)=>{
            console.log("Error while fetching users: ",error);
        });
    }

    useEffect(()=>{
        getUsersData();
    },[])

    return (
        <div>
            <div><h1>Users List</h1></div>
            <div>
                {currentUserData ? <div>
                    {users.map((user) => <div key={user.id}>
                            <div>Id: {user.id}</div>
                            <div>Name: {user.name}</div>
                            <div>Email: {user.email}</div>
                            <div>Phone: {user.phoneNumber}</div><hr/>
                        </div>)}
                    </div>:
                    navigate('/home')
                }
            </div>
        </div>
    )
}