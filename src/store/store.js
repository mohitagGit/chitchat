import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export const UsersData = () => {
    const collectionRef = collection(db,'users');
    getDocs(collectionRef).then((userData)=>{
        let users = [];
        userData.docs.forEach((doc)=>{
            users.push({...doc.data(), id: doc.id});
        })
        console.log("Users data refined: ",users);
        return users;
    })
    .catch((error)=>{
        console.log("Error while fetching users: ",error);
        return [error];
    });
}