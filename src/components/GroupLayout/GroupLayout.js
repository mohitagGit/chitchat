import React from 'react';
import './GroupLayout.css';
import { useNavigate } from 'react-router-dom';
import Moment from 'react-moment';

export default function GroupLayout(props) {
    const { groupsData } = props;
    const navigate = useNavigate();

    return (
        <div className="overflow-hidden">
            <div className="px-0">
                <div className="bg-white">
                    <div className="d-flex px-4 py-3 bg-light">
                        <div className="col-10 h5 mb-0 py-1">Chats</div>
                        <div className="col-2">
                            <button type="button" className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#createNewGroupModal">
                                <i className="bi bi-person-fill-add"></i>
                            </button>
                        </div>
                    </div>
                    <div className="messages-box">
                        <div className="list-group rounded-0">
                            {groupsData.map((iGroup)=>
                            <div key={iGroup.id} className="list-group-item list-group-item-action">
                                <div className="media d-flex py-2" onClick={()=> navigate(`/group/${iGroup.id}/${encodeURI(iGroup.name)}`)}>
                                    <img src="https://bootstrapious.com/i/snippets/sn-chat/avatar.svg" alt="user pic" width="50" className="rounded-circle"/>
                                    <div className="media-body ms-3">
                                        <div className="d-flex align-items-center justify-content-between mb-1">
                                            <h6 className="mb-0 text-truncate" style={{maxWidth:'225px'}}>{iGroup.name}</h6>
                                            <small className="small font-weight-bold">
                                                <Moment format="h:mm A" className="text-muted">{new Date(iGroup.updatedAt)}</Moment>
                                            </small>
                                        </div>
                                        <p className="font-italic mb-0 text-truncate text-small" style={{maxWidth:'275px'}}>Created with: {iGroup.recipientName}</p>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
