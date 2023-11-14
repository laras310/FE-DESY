import { Timeline } from 'rsuite';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { FileArrowDown } from 'react-bootstrap-icons';

export default function TimelineOnly({task_id}){
    const [activity, setActivity] = useState([]);
    useEffect(() => {
        axios({
            method: "GET",
            url: "https://jobcard-api.pins.co.id/api/task?task_id="+task_id,
            // url: "https://jobcard-api.pins.co.id/api/task/by-user?user_id=" + profil.id,
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
          })
        .then((response)=>{
            const res= response.data.data
            setActivity(res.activities)
            console.log(res.activities[0].files[0].name)
        })
        .catch((error) => {
            if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log(error.message);
            }
          });
    },[])

    return(
        <Timeline align="left">
            <Timeline.Item>
                    <p>Task Created</p>
            </Timeline.Item>
            {activity.map((task)=>(
                <Timeline.Item>
                    <p>{format(parseISO(task.updated_at), 'dd MMMM yyyy HH:mm:ss')}</p>
                    <p>{task.description}</p>

                  {task.files != null ? (
                    task.files.map((file, index) => (
                      <p key={index}><FileArrowDown className='fs-4'/>  {file.name}</p>
                    ))
                  ) : (
                    null
                  )}
                </Timeline.Item>
            ))}

            {/* <Timeline.Item>
            <p>2018-03-01</p>
            <p>{activity.description}</p>
            </Timeline.Item>
            <Timeline.Item>
            <p>2018-03-02</p>
            <p>Order out of stock</p>
            </Timeline.Item>
            <Timeline.Item>
            <p>2018-03-10</p>
            <p>Arrival</p>
            </Timeline.Item>
            <Timeline.Item>
            <p>2018-03-12</p>
            <p>Order out of the library</p>
            </Timeline.Item>
            <Timeline.Item>
            <p>2018-03-15</p>
            <p>Sending you a piece</p>
            </Timeline.Item> */}
        </Timeline>
    )
}