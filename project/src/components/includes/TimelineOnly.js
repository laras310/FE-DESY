import { Timeline } from 'rsuite';
import { format, parseISO } from 'date-fns'; 
import { FileArrowDown } from 'react-bootstrap-icons';

export default function TimelineOnly({data}){
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
                        ><FileArrowDown className='fs-4'/>  Download Evidence </p></a>
                    ))
                  ) : (
                    null
                  )}
                </Timeline.Item>
              )))
              :
              null
            }
        </Timeline>
    )
}