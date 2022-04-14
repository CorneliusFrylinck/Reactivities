import { observer } from 'mobx-react-lite';
import React from 'react'
import {Activity} from "../../../app/models/activity";

const activityImageStyle = {
    filter: 'brightness(30%)'
};

interface Props {
    activity: Activity
}

export default observer (function ActivityDetailedHeader({activity}: Props) {
    return (
        <div id="activity-details">
            <div className='img-container' style={{padding: '0'}}>
                <img className='image' src={`/assets/categoryImages/${activity.category}.jpg`} style={activityImageStyle}/>
                <div style={{position: 'absolute',
                            bottom: '5%',
                            left: '5%',
                            width: '50%',
                            height: 'auto',
                            color: 'white',
                            paddingLeft: "2rem"}}>
                    <p style={{color: 'white', fontSize: "2rem", margin: "0", marginBottom: "0.2rem"}}>{activity.title}</p>
                    <p style={{color: 'white', margin: "0"}}>{activity.date}</p>
                    <p style={{color: 'white', marginBottom: "0.6rem", marginTop: "0.6rem"}}>
                        Hosted by <strong>Bob</strong>
                    </p>
                </div>
            </div>
            <div className='btns'>
                <a className='join btn' color='teal'>Join Activity</a>
                <a className='cancel btn'>Cancel attendance</a>
                <div className="manage-parent">
                    <a className='manage btn'>
                        Manage Event
                    </a>
                </div>
            </div>
        </div>
    )
})
/*<div id="activity-details">
    <img src={`/assets/categoryImages/${activity.category}.jpg`} />
    <h2 style={{marginLeft: "1rem"}} id="activity-title">{activity.title}</h2>
    <h4 style={{marginLeft: "1rem"}} id="activity-date">{activity.date}</h4>
    <div  style={{marginLeft: "1rem"}}id="activity-description">{activity.description}</div>
    <div id="activity-detail-buttons">
        <Link to={`/manage/${activity.id}`} className="btn" id="edit-activity-btn">Edit</Link>
        <Link to="/activities" className="btn" id="cancel-activity-btn">Cancel</Link>
    </div>
</div>
)*/