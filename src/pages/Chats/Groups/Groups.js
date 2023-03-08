import { useState, useEffect } from "react";
import { UserAuth } from "../../../context/AuthContext";
import { collection, getDocs } from 'firebase/firestore';
import { db } from "../../../store/firebase";
import { useNavigate } from "react-router-dom";

import NewGroup from "../../../components/NewGroup/NewGroup";
import GroupLayout from "../../../components/GroupLayout/GroupLayout";

export default function Groups() {
    const [groupList, setGroupList] = useState([]);
    const {currentUserData} = UserAuth();
    const colGroupRef = collection(db,'chatGroups');
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getUserGroups = () => {
      getDocs(colGroupRef).then((groupData)=>{
        let tempGroups = [];
        groupData.docs.forEach((doc)=>{
          tempGroups.push({...doc.data(), id: doc.id});
        });
        // filtering current user groups 
        const userGroups = tempGroups.filter((iGroup)=>{
          return iGroup.createdBy === currentUserData.id || iGroup.recipientId === currentUserData.id
        });
        const groupDescOrder = [...userGroups].sort((a, b) => b.updatedAt - a.updatedAt);
        setGroupList(groupDescOrder);
      });
    }

    useEffect(() => {
      getUserGroups();
    }, []);

    return (
      <div className="app-min-width">
        <div className="py-3" onClick={()=> navigate(`/home`)}>
          <button type="button" class="btn btn-link text-dark"><i className="bi bi-arrow-left"></i> Back</button>
        </div>
        {currentUserData ?  <GroupLayout groupsData={groupList}/>: <div>Folder Not Fround</div>}
        <NewGroup newGroupHandler={getUserGroups}/>
      </div>
    )
}