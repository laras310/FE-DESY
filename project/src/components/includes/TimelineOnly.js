import { Timeline } from 'rsuite';
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import axios from 'axios';
import { FileArrowDown } from 'react-bootstrap-icons';

export default function TimelineOnly({data}){
    // function axiosDownloadFile(url, fileName) {
    //   return axios({
    //     url,
    //     headers:{         'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Headers': '*',},
    //     method: 'GET',
    //     responseType: 'blob',
    //   })
    //     .then(response => {
    //       const href = window.URL.createObjectURL(response.data);
    
    //       const anchorElement = document.createElement('a');
    
    //       anchorElement.href = href;
    //       anchorElement.download = fileName;
    
    //       document.body.appendChild(anchorElement);
    //       anchorElement.click();
    
    //       document.body.removeChild(anchorElement);
    //       window.URL.revokeObjectURL(href);
    //     })
    //     .catch(error => {
    //       console.log('error: ', error);
    //     });
    // }
    return(
        <Timeline align="left">
            <Timeline.Item>
                    <p>Task Created</p>
            </Timeline.Item>
            {
              data.activities != null ?
              (data.activities.map((task)=>(
                <Timeline.Item>
                <p>{format(parseISO(task.updated_at), 'dd MMMM yyyy HH:mm:ss')}</p>
                <p>{task.description}</p>

                {task.files != null ? (
                    task.files.map((file, index) => (
                      <a href={'https://jobcard-api.pins.co.id/evidence/'+ file.name}>
                        <p key={index} 
                        // onClick={()=>axiosDownloadFile('https://jobcard-api.pins.co.id/evidence/CxDU9vyadbKpvJXZ8P9l3h0i69lVmkYDLAerT9lB.png', 'CxDU9vyadbKpvJXZ8P9l3h0i69lVmkYDLAerT9lB.png')}
                        ><FileArrowDown className='fs-4'/>  Download Evidence</p></a>
                    ))
                  ) : (
                    null
                  )}
                </Timeline.Item>
              )))
              :
              console.log(data.activities)
            }
{/* 
            {
              activity != null ?
              {activity.map((task)=>(
                <Timeline.Item>
                    <p>{format(parseISO(task.updated_at), 'dd MMMM yyyy HH:mm:ss')}</p>
                    <p>{task.description}</p>

                  {task.files != null ? (
                    task.files.map((file, index) => (
                      <a href={'https://jobcard-api.pins.co.id/evidence/'+ file.name}>
                        <p key={index} 
                        // onClick={()=>axiosDownloadFile('https://jobcard-api.pins.co.id/evidence/CxDU9vyadbKpvJXZ8P9l3h0i69lVmkYDLAerT9lB.png', 'CxDU9vyadbKpvJXZ8P9l3h0i69lVmkYDLAerT9lB.png')}
                        ><FileArrowDown className='fs-4'/>  {file.name}</p></a>
                    ))
                  ) : (
                    null
                  )}
                </Timeline.Item>
            ))}
              :
              null
            }
             */}
        </Timeline>
    )
}