import { useState, useEffect } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { collection, addDoc, query, where, orderBy, onSnapshot, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../../store/firebase";
import { useNavigate } from "react-router-dom";

import { useParams } from "react-router-dom";
import ChatLayout from "../../../components/ChatLayout/ChatLayout";

export default function Messages() {
    // const [recipientUserId, setRecipientUserId] = useState("");
    const [recipientUserData, setRecipientUserData] = useState({});
    const [messages, setMessages] = useState([]);
    const [fileContent, setFileContent] = useState([]);
    const [groupData, setGroupData] = useState({});
    const { currentUserData } = UserAuth();
    const collectionTasksRef = collection(db,'messages');
    const params = useParams();
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getUserFiles = () => {
        const Query = query(collectionTasksRef, where("chatGroupId", "==", params.groupId), orderBy('createdAt'));
        onSnapshot(Query, (messagesData) => {
          let groupMessages = [];
          messagesData.docs.forEach((doc)=>{
            groupMessages.push({...doc.data(), id: doc.id});
          })
          console.log("Messages data refined: ",groupMessages);
          setMessages(groupMessages);

          // updating folders table
          const docFolderRef = doc(db,'chatGroups',params.groupId);
          updateDoc(docFolderRef,{metaData:{noOfMessages: groupMessages.length}});
        });
    }

    // fetching current group information
    const getGroupData = () => {
      const docGroupRef = doc(db, "chatGroups", params.groupId);
      getDoc(docGroupRef).then((response)=>{
        console.log("Group response: ",response);
        const groupInfo = {...response.data(), id:response.id}
        setGroupData(groupInfo);
        if(groupInfo.groupTypeId === 1){
          if(groupInfo.users && groupInfo.users.length){
            groupInfo.users.forEach((iUser)=>{
              if(iUser.id !== currentUserData.id){
                // setRecipientUserId(iUser.id);
                getRecipientUserData(iUser.id);
              }
            });
          }
        }
        else{
          // do something for OTM groups (more than 2 people)
        }
      }).catch((error)=>{
          console.log("Group failed: ",error);
      })
    }

    const getRecipientUserData = (pRecipientUserId) => {
      const colUserRef = doc(db, "users", pRecipientUserId);
      getDoc(colUserRef).then((response)=>{
        console.log("User response: ",response);
        const userInfo = {...response.data(), id:response.id}
        setRecipientUserData(userInfo);
      })
    }

    const addMsgHandler = (event) => {
        event.preventDefault();
        if(fileContent && fileContent.length){
            const newTaskObj = {
                attachement: null,
                chatGroupId: params.groupId,
                content: fileContent,
                createdAt: Date.now(),
                messageType: 1,
                status: "sent",
                metaData: {},
                userId:currentUserData.id,
                userName:currentUserData.name,
            }
            addDoc(collectionTasksRef, newTaskObj).then((response)=>{
                console.log("Message sent: ",response);
                setFileContent("");

                // updating group updated at data
                const docGroupRef = doc(db,'chatGroups',params.groupId);
                updateDoc(docGroupRef,{updatedAt: Date.now()}).then(()=>{
                  getGroupData();
                });
            }).catch((error)=>{
                console.log("Message failed: ",error);
            })
        }else{
            console.log("Please enter valid message");
        }
    }

    useEffect(()=>{
      getUserFiles();
      getGroupData();
    }, []);

    return (
        <div className="app-min-width">
          <div className="py-3" onClick={()=> navigate(`/groups`)}>
            <button type="button" class="btn btn-link text-dark"><i className="bi bi-arrow-left"></i> Back</button>
          </div>
          {currentUserData ? <div>
            <ChatLayout
              messages={messages}
              groupName={groupData.name}
              recipientName={recipientUserData.name}
              groupPhotoUrl={recipientUserData.photoUrl}
              lastUpdatedAt={groupData.updatedAt}
            />
            <form className="p-3 shadow bg-success-subtle" id="addFileForm" onSubmit={addMsgHandler}>
              <div className="input-group">
                <input type="text" className="form-control"
                  id="inputMessage"
                  value={fileContent}
                  placeholder="Type your message..."
                  onChange={(e)=>setFileContent(e.target.value)}
                />
                <div className="input-group-prepend" onClick={addMsgHandler}>
                  <span className="input-group-text text-bg-dark"><i className="bi bi-send-fill"></i></span>
                </div>                                   
              </div>
            </form>
          </div>:
          <div>Invalid Data!</div>}
        </div>
    )
}