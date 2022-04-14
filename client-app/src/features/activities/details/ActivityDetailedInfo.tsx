import { observer } from 'mobx-react-lite';
import React from 'react'
import {Activity} from "../../../app/models/activity";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faCalendar, faMapMarker } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faInfo);
library.add(faCalendar);
library.add(faMapMarker);

interface Props {
    activity: Activity
}

export default observer(function ActivityDetailedInfo({activity}: Props) {
    return (
        <div className='info-container'>
            <div className='ico-container'>
                <FontAwesomeIcon style={{width: "2rem"}} color="turquoise" size="lg" className="" icon="info" />
                {activity.description}
            </div>
            <div className='ico-container'>
                <FontAwesomeIcon style={{width: "2rem"}} color="turquoise" size="lg" className="" icon="calendar" />
                {activity.date}
            </div>
            <div className='ico-container'>
                <FontAwesomeIcon style={{width: "2rem"}} color="turquoise" size="lg" className="" icon={faMapMarker} />
                {activity.venue}, {activity.city}
            </div>
        </div>
    )
})