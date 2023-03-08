import { useState, useEffect } from "react";
import { UserAuth } from "../../context/AuthContext"
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../store/firebase';
import { useNavigate } from "react-router-dom";

export default function Folders() {
    const [folderList, setFolderList] = useState([]);
    const [newFolderName, setNewFolderName] = useState("");
    const { currentUserData } = UserAuth();
    const collectionTasksRef = collection(db,'folders');
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getUserFolders = () => {
        const Query = query(collectionTasksRef, where("userId", "==", currentUserData.id));
        onSnapshot(Query, (folderData) => {
            let tempFolders = [];
            folderData.docs.forEach((doc)=>{
                tempFolders.push({...doc.data(), id: doc.id});
            })
            console.log("Folder data refined: ",tempFolders);
            setFolderList(tempFolders);
        });
    }

    const addFolderHandler = (event) => {
        event.preventDefault();
        console.log(event);
        // const folderName = event.target.elements['exampleInputFolder'].value;
        if(newFolderName && newFolderName.length){
            const addFolderObj = {
                createdAt: new Date(),
                metaData: {
                    noOfFiles: 0,
                },
                name:newFolderName,
                noOfFiles: 0,
                userId:currentUserData.id,
            }
            addDoc(collectionTasksRef,addFolderObj).then((response)=>{
                console.log("Folder created: ",response);
                setNewFolderName("");
            }).catch((error)=>{
                console.log("Folder creation error: ",error);
            })
        }
        else{
            alert("Enter folder name");
        }
    }

    // const deleteFolderHandler = (event) => {
    //     const taskId = event.target.value;
    //     const docFolderRef = doc(db,'folders',taskId)
    //     deleteDoc(docFolderRef).then((response)=>{
    //         console.log("Folder delete: ",response);
    //     }).catch((error)=>{
    //         console.log("Folder deletion error: ",error);
    //     })
    // };

    useEffect(() => {
        getUserFolders();
    }, []);

    return (
        <div className="app-min-width">
            <div className="py-3" onClick={()=> navigate(`/home`)}>
                <button type="button" class="btn btn-link text-dark"><i className="bi bi-arrow-left"></i> Back</button>
            </div>
            <div>
                <div>
                    {currentUserData ? <div>
                        {folderList.map((iFolder) =>
                            <ul key={iFolder.id} className="list-group list-group-numbered px-1">
                                <li role="button" className="mb-2 py-2 list-group-item d-flex align-items-start"
                                    style={{fontSize:'12px'}}
                                    onClick={()=> navigate(`/folder/${iFolder.id}/${encodeURI(iFolder.name)}`)}>
                                    <div className="ms-2 me-auto">
                                        <div className="">{iFolder.name}</div>
                                    </div>
                                    <span className="badge bg-primary rounded-pill">{iFolder.noOfFiles}</span>
                                </li>
                            </ul>)}
                    </div>:
                    <div>Folder Not Fround</div>}
                </div><hr/>
                <form id="addFolderForm" onSubmit={addFolderHandler} className="row gy-2 gx-3 px-1">
                    <div className="d-flex">
                        <div className="col-9">
                            <input type="text" className="form-control"
                                placeholder="Add folder name"
                                value={newFolderName}
                                onChange={(e)=>setNewFolderName(e.target.value)}
                            />
                        </div>
                        <div className="col-3 text-end">
                            <button type="submit" className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}