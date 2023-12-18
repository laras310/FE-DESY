import { Timeline } from 'rsuite';
import { format, parseISO } from 'date-fns'; 
import { FileArrowDown } from 'react-bootstrap-icons';
import { Row, Col } from 'react-bootstrap';

export default function TimelineOnly({data}){

    return(
    <Row>
      <Col >
        <Timeline align="left" endless>
          {
            data.created_at != null ?
            <Timeline.Item 
            time= {format(parseISO(data.created_at), 'dd MMMM yyyy HH:mm:ss')}
            >
              {/* <Container className='border'> */}
                {/* <p>{format(parseISO(data.created_at), 'dd MMMM yyyy HH:mm:ss')}</p> */}
                <p className='fw-bold'>Task Created</p>
              {/* </Container> */}
            </Timeline.Item>
            : null
          }

            {
              data.activities != null ?
              (data.activities.map((task)=>(
                
                <Timeline.Item 
                >
                
                <Row >
                  <Col >
                  <p style={{textAlign:"end"}} className=' px-3'>{format(parseISO(task.updated_at), 'dd MMMM yyyy HH:mm:ss')}</p>
                <p style={{textAlign:"end"}} className=' px-3'>created by {task.user.name}</p>
                
                  </Col>
                  <Col >
                  {/* <Card>
                    <Card.Body> */}
                  <p className='fw-bold'>{task.description}</p>
                {task.files != null ? (
                    task.files.map((file, index) => (
                      <a href={'https://jobcard-api.pins.co.id/evidence/'+ file.name}>
                        <p key={index} 
                        ><FileArrowDown className='fs-4'/>  Download Evidence </p></a>
                    ))
                  ) : (
                    null
                  )}
                  {/* </Card.Body>
                  </Card> */}
                  </Col>
                  </Row>
                </Timeline.Item>
                
              )))
              :
              null
            }
        </Timeline>
        </Col>
      </Row>
    )
    
}