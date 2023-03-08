import React,{useRef,useEffect} from 'react';
import './ChatLayout.css';
import { UserAuth } from '../../context/AuthContext';
import Moment from 'react-moment';

export default function ChatLayout(props) {
    const {currentUserData} = UserAuth();
    const {groupName,groupPhotoUrl,lastUpdatedAt,recipientName} = props;
    const groupMessages = props.messages;
    const messageEl = useRef(null);

    useEffect(() => {
    if (messageEl) {
        messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
        });
    }
    }, [])

    return (
        <div class="chat bg-light">
            <div class="bg-success-subtle chat-header clearfix">
                <div class="col-lg-12">
                    <a href="/" data-toggle="modal" data-target="#view_info">
                        <img src={groupPhotoUrl} alt="Recipient pic"/>
                    </a>
                    <div class="chat-about">
                        <div className="chat-name">{recipientName} ({groupName})</div>
                        <div className="chat-time">Last msg: <Moment format="MMMM Do YYYY, h:mm A" className="text-muted">{new Date(lastUpdatedAt)}</Moment></div>
                    </div>
                </div>
            </div>
            <div class="chat-history" ref={messageEl}>
                {groupMessages? <div> {groupMessages.map((iMessage)=>
                    <ul class="m-b-0">
                        {(currentUserData.id === iMessage.userId)?
                            <li class="clearfix">
                                <div class="message-data text-end">
                                    <span class="message-data-time">
                                        <Moment format="hh:mm A" className="fw-lighter">{new Date(iMessage.createdAt)}</Moment>
                                    </span>
                                </div>
                                <div class="message shadow my-message float-right">{iMessage.content}</div>
                                {/* {(iMessage.status === "sent")?
                                  <span><i className="bi bi-check"></i></span>:
                                  <i className="bi bi-sign-stop-lights-fill"></i>} */}
                            </li>:
                            <li class="clearfix">
                                <div class="message-data">
                                    <span class="message-data-time">
                                        <Moment format="hh:mm A" className="fw-lighter">{new Date(iMessage.createdAt)}</Moment>
                                    </span>
                                </div>
                                <div class="message shadow other-message">{iMessage.content}</div>
                            </li>
                        }
                    </ul>)}</div>:
                    <div></div>
                }
            </div>
        </div>
    )
}