import { useState, useEffect } from "react";
import { UserAuth } from "../../../context/AuthContext"
import { collection, addDoc, deleteDoc, doc, query, where, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../../store/firebase';

import { useParams, useNavigate } from "react-router-dom";
import "./Files.css";

export default function Files() {
    const [taskList, setTaskList] = useState([]);
    const [fileContent, setFileContent] = useState([]);
    const [taskStatus, setTaskStatus] = useState("");
    const {currentUserData} = UserAuth();
    const collectionTasksRef = collection(db,'files');
    const params = useParams();
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getUserFiles = () => {
        const Query = query(collectionTasksRef, where("userId", "==", currentUserData.id), where("folderId","==", params.folderId));
        onSnapshot(Query, (tasksData) => {
            let tasks = [];
            tasksData.docs.forEach((doc)=>{
                tasks.push({...doc.data(), id: doc.id});
            })
            console.log("Tasks data refined: ",tasks);
            setTaskList(tasks);

            // updating folders table
            const docFolderRef = doc(db,'folders',params.folderId);
            updateDoc(docFolderRef,{noOfFiles: tasks.length});
        });
    }

    const addFileHandler = (event) => {
        event.preventDefault();
        const taskPriority = taskList.length;

        if(fileContent && fileContent.length && taskStatus && taskStatus.length){
            const newTaskObj = {
                content: fileContent,
                createdAt: new Date(),
                fileId: 1,
                fileType: "text",
                folderId: params.folderId,
                metaData: {},
                priority: taskPriority,
                status: taskStatus,
                userId:currentUserData.id,
            }
            addDoc(collectionTasksRef, newTaskObj).then((response)=>{
                console.log("Task created: ",response);
                setFileContent("");
            }).catch((error)=>{
                console.log("Task creation error: ",error);
            })
        }else{
            alert("Please enter valid input");
        }
    }

    const deleteFileHandler = (pFileId) => {
        // const taskId = event.target.value;
        const docTaskRef = doc(db,'files',pFileId)
        deleteDoc(docTaskRef).then((response)=>{
            console.log("Task delete: ",response);
        }).catch((error)=>{
            console.log("Task deletion error: ",error);
        });
    }

    useEffect(()=>{
        getUserFiles();
    }, []);

    return (
        <div className="app-min-width">
            <div className="py-3" onClick={()=> navigate(`/folders`)}>
                <button type="button" class="btn btn-link text-dark"><i className="bi bi-arrow-left"></i> Back</button>
            </div>
            <div>
                <div className="folder-name">{params.folderName}</div>
                <div>
                    {currentUserData ? <div>
                        {taskList.map((iTask) =>
                            <ol key={iTask.id} className="list-group list-group-numbered px-1">
                                <li className="list-group-item d-flex align-items-start mb-2" style={{fontSize:'12px'}}>
                                    <div className="ms-2 me-auto">
                                        <div className="">{iTask.content}</div>
                                        <span style={{fontSize:'10px'}}>{iTask.status}</span>
                                    </div>
                                    <span><button type="button" className="btn btn-danger btn-sm" onClick={()=>deleteFileHandler(iTask.id)}>
                                        <i className="bi bi-trash"></i></button>
                                    </span>
                                </li>
                            </ol>)}
                    </div>:
                    <div>Users Not Fround</div>}
                </div><hr/>
                <form id="addFileForm" onSubmit={addFileHandler} className="row gy-2 gx-3 px-1">
                    <div className="">
                        <input type="text" className="form-control"
                            id="exampleInputTask"
                            value={fileContent}
                            placeholder="Enter your task"
                            onChange={(e)=>setFileContent(e.target.value)}
                        />
                    </div>
                    <div className="col-9">
                        <select id="autoSizingSelect" className="form-select" aria-label="Default select example"
                            onChange={(e)=>setTaskStatus(e.target.value)}>
                            <option>Select status</option>
                            <option defaultValue value="Pending">Pending</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="col-3 text-end">
                        <button type="submit" className="btn btn-primary">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}