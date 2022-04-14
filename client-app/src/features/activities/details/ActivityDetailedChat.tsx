import { observer } from 'mobx-react-lite'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faEdit);

export default observer(function ActivityDetailedChat() {
    return (
        <div className='chat-container flex-column'>
            <div className='chat-header'><div className='chat-header-text'>Chat about this event</div></div>
            <div >
                <div>
                    <div className='flex-row chat'>
                        <img className="avatar" src='/assets/user.png'/>
                        <div className="content">
                            <div className="flex-row">
                                <div className="author"><strong>Matt</strong>&nbsp;&nbsp;</div>
                                <div className="meta small-grey">Today at 5:42PM</div>
                            </div>
                            <div className='plain-text'>How artistic!</div>
                            <div className="action small-grey">Reply</div>
                        </div>
                    </div>

                    <div className='flex-row chat'>
                        <img className="avatar" src='/assets/user.png'/>
                        <div className="content">
                            <div className="flex-row">
                                <div className="author"><strong>Joe Henderson</strong>&nbsp;&nbsp;</div>
                                <div className="meta small-grey">5 days ago</div>
                            </div>
                            <div className='plain-text'>Dude, this is awesome. Thanks so much</div>
                            <div className="action small-grey">Reply</div>
                        </div>
                    </div>

                    <div className='flex-column'>
                        <textarea className='chat-area'></textarea>
                        <button className='edit-btn'><FontAwesomeIcon icon={faEdit} /><span className="pad-left-1">Add Reply</span></button>
                    </div>
                </div>
            </div>
        </div>

    )
})
