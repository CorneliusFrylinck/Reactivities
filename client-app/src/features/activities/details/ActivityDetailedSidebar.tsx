import React from 'react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'

export default observer(function ActivityDetailedSidebar () {
    return (
        <div className="sidebar">
            <div className='chat-sidebar-header'>
                3 People Going
            </div>
            <div>
                <ul>
                    <li className='flex-row person underline' style={{ position: 'relative' }}>
                        <div className='host'
                            style={{ position: 'absolute' }}
                        >
                            Host
                        </div>
                        <img className='profile' src={'/assets/user.png'} />
                        < div className="side-content flex-column">
                            < div className="side-header" >
                                <Link className='blue-link' to={`#`}>Bob</Link>
                            </div>
                            <div className='extra' style={{ color: 'orange' }}>Following</div>
                        </div>
                    </li>

                    <li className='flex-row person underline' style={{ position: 'relative' }}>
                        <img className='profile' src={'/assets/user.png'} />
                        < div className="side-content flex-column">
                            < div className="side-header" >
                                <Link className='blue-link' to={`#`}>Tom</Link>
                            </div>
                            <div className='extra' style={{ color: 'orange' }}>Following</div>
                        </div>
                    </li>

                    <li className='flex-row person' style={{ position: 'relative' }}>
                        <img className='profile' src={'/assets/user.png'} />
                        < div className="side-content flex-column" style={{verticalAlign:'middle'}}>
                            < div className="side-header" >
                                <Link className='blue-link' to={`#`}>Sally</Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </ div>
        </div>

    )
})