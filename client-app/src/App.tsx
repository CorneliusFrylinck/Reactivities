import React, { useEffect, useState } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faUsers);

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      var data = response.data;
      setActivities(data);
    });
  }, []) //empty arr of dependencies, ensures that rendering happens once instead of an infinate loop
  
  return (
    <div >
      <header>
        <h2 id="icon-container"><FontAwesomeIcon icon={["fas", "users"]} />Reactivities</h2>
        <ul>
          {activities.map((activity: any) => (
              <li key={activity.id}>
                {activity.title}
              </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
