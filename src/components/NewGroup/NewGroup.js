import React,{useState} from 'react'
import { UserAuth } from '../../context/AuthContext';
import { collection, addDoc, getDocs, query, where, } from 'firebase/firestore';
import { db } from '../../store/firebase';

export default function NewGroup(props) {
    const [recipientUserId, setRecipientUserId] = useState("");
    const [groupName, setGroupName] = useState("");
    const [groupDesc, setGroupDesc] = useState("");
    const [recipientUserData, setRecipientUserData] = useState({});
    const {currentUserData} = UserAuth();
    const colGroupRef = collection(db,'chatGroups');

    const createGroupHandler = (event) => {
        event.preventDefault();
        if(groupName && groupName.length
        && recipientUserId && recipientUserId.length
        && recipientUserData && recipientUserData.id
        && recipientUserData.email === recipientUserId){
        const addGrpObj = {
          createdAt: Date.now(),
          createdBy: currentUserData.id,
          description: groupDesc,
          groupType: "OTO",
          groupTypeId: 1,
          metaData: {},
          name: groupName,
          photoUrl: "",
          recipientId: recipientUserData.id,
          recipientName: recipientUserData.name,
          settings: {},
          status: "active",
          users:[
            {id:currentUserData.id,name:currentUserData.name,addedAt:new Date()},
            {id:recipientUserData.id,name:recipientUserData.name,addedAt:new Date()}
          ],
          updatedAt: Date.now()
        }
        addDoc(colGroupRef,addGrpObj).then((response)=>{
            setGroupName("");
            setGroupDesc("");
            setRecipientUserId("");
            setRecipientUserData({});
            props.newGroupHandler();
        }).catch((error)=>{
            console.log("Group creation error: ",error);
        })
      }
      else{
          alert("Enter group name and recipient");
      }
    }

    const searchUserHandler = (event) => {
      event.preventDefault();
      if(recipientUserId && recipientUserId.length && (recipientUserId !== currentUserData.email)){
        const colUserRef = collection(db,'users');
        const Query = query(colUserRef, where("email", "==", recipientUserId));
        getDocs(Query).then((userData)=>{
            let tempUser = [];
            userData.docs.forEach((doc)=>{
              tempUser.push({...doc.data(), id: doc.id});
            });
            if(tempUser.length){
              setRecipientUserData(...tempUser);
            }
            else{
              alert(`Invalid recipient`);
            }
        })
        .catch((error)=>{
            console.log("Error while fetching users: ",error);
        });
      }
      else{
        alert("Enter valid recipient");
      }
    };

    return (
        <form id="addFolderForm">
            {/* added this button in GroupLayout */}
            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createNewGroupModal">
            <i className="bi bi-person-fill-add"></i>New
            </button> */}
            <div className="modal fade" id="createNewGroupModal" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-body">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Create Group</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="d-flex">
                        <div className="mb-3">
                            <input type="text" className="form-control"
                            id="inputGroupName"
                            value={groupName}
                            placeholder="Enter Group Name"
                            onChange={(e)=> setGroupName(e.target.value)}/>
                        </div>
                        </div>
                        {/* <div className="d-flex">
                        <div className="mb-3">
                            <input type="text" className="form-control"
                            id="inputGroupDesc"
                            value={groupDesc}
                            placeholder="Enter Group Desciption"
                            onChange={(e)=> setGroupDesc(e.target.value)}/>
                        </div>
                        </div> */}
                        <div className="d-flex">
                        <div className="mb-3">
                            <input type="text" className="form-control"
                            id="inputUserEmail"
                            value={recipientUserId}
                            placeholder="Enter participent email"
                            onChange={(e)=> setRecipientUserId(e.target.value)}/>
                            {(recipientUserId && recipientUserData && recipientUserData.id)?
                            <div>{recipientUserData.name} <i className="bi bi-check-circle-fill"></i></div>:
                            <div></div>
                            }
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary btn-sm" onClick={searchUserHandler}>Add</button>
                        </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="submit" className="btn btn-primary" onClick={createGroupHandler}>Create Group</button>
                    </div>
                    </div>
                </div>
            </div>
        </form>
    )
}