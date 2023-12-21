import { Row,Col, Form , Container,Card, Button, Stack,InputGroup, FormControl} from "react-bootstrap";
import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { useSelector } from "react-redux";
import { Table, Pagination } from 'rsuite';
import { format, parseISO } from 'date-fns';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

ChartJS.register(ArcElement, Tooltip, Legend);
const { Column, HeaderCell, Cell } = Table;

export default function Summary({data}){
    const [startDate, setStartDate]=useState([]);
    const [endDate, setEndDate]=useState([]);
    const session = useSelector(state=>state.user.session)
    // const allData =[...data.idle,...data.progress, ...data.done]; // Define filteredData state
    const [loading, setLoading]= useState(false)
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = React.useState();
    const [sortType, setSortType] = React.useState();
    const history = useHistory();

    const dataChart = {
        labels: Object.keys(data).map(nama => nama),
        datasets: [
          {
            label: 'Jumlah',
            data: Object.values(data).map(nama=>nama.length),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    
    const handleSearchDate=async(event)=>{
        event.preventDefault();
        await axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_JOBCARD}/task/all`,
            headers: {
              Authorization: 'Bearer ' + session
            },
            data:{
                start_date:startDate,
                end_date: endDate
            }
          })
            .then((response) => {
              const res = response.data.data;
              allData=res
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
    }
    let allData =[...data.idle,...data.progress, ...data.done]; // Define filteredData state

    const filteredData = allData.filter(item=>{
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
    })
    const getData = () => {
      let sortedData = filteredData;
      if (sortColumn && sortType) {
        sortedData = filteredData.sort((a, b) => {
          let x = a[sortColumn];
          let y = b[sortColumn];
          if (typeof x === 'string') {
            x = new Date(x);
          }
          if (typeof y === 'string') {
            y = new Date(y);
          }
          if (sortType === 'asc') {
            return x - y;
          } else {
            return y - x;
          }
        });
      }
      return sortedData.slice((page - 1) * limit, page * limit);
    };
  
    const handleSortColumn = (sortColumn, sortType) => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setSortColumn(sortColumn);
        setSortType(sortType);
        setPage(1); // Reset page to 1 when sorting
      }, 500);
    };
  
  
    const handleSearch = (e) => {
      const searchTerm = e.target.value;
      setSearchTerm(searchTerm);
      setPage(1); // Reset halaman ketika melakukan pencarian
    };
  
    const handleChangeLimit = (dataKey) => {
      setPage(1);
      setLimit(dataKey);
    };
    const handleRowClick = (rowData) => {
      history.push({
        pathname: '/timeline',
        state: { data: rowData },
      });
    };
  
    return(
    <>
    <Row className="mb-3">
        <Col>
        <Card>
            
            <Card.Body>
                <Row>
                <Col className="m-2" sm={4}>
                    <Container style={{width:"35vh"}}>
                <Doughnut data={dataChart} /></Container>
                </Col>
                <Col className="m-2">
                <div className="d-flex flex-row">
                <Stack>
                    <p className="m-1">Total Project</p>
                    <p className="m-1">Project Idle</p>
                    <p className="m-1">Project On Progress</p>
                    <p className="m-1">Project Done</p>
                </Stack>
                <Stack>
                    <p className="m-1">{
                    Object.values(data).map(nama=>nama.length).reduce((a, b) => a + b, 0)
                    }</p>
                    {
                        Object.values(data).map(nama=>{
                            return <p className="m-1">{nama.length}</p>
                        })
                    }
                </Stack>
                </div>
                </Col>
                
                <Col className="m-2">
                <Form onSubmit={handleSearchDate}>
                    <Form.Group>
                    <Form.Label>Start date</Form.Label>
                    <Form.Control type='date' value={startDate} onChange={(event)=>setStartDate(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>End date</Form.Label>
                        <Form.Control type='date' value={endDate} onChange={(event)=>setEndDate(event.target.value)}/>
                    </Form.Group>
                    
                    <Button type="submit">Search</Button>
                </Form>
                </Col>

                </Row>
                    
                {/* </Container> */}
            </Card.Body>
        </Card>
        </Col>

    </Row>
    <Row>
            <Col>
              <Form className='d-flex'>
                <InputGroup>
                  <InputGroup.Text className='bg-white'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-search' viewBox='0 0 16 16'>
                      <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                    </svg>
                  </InputGroup.Text>
                  <FormControl type='search' placeholder='Search' onChange={handleSearch} value={searchTerm} />
                </InputGroup>
              </Form>
            </Col>
            <Col>
            <Button className='btn btn-danger mb-3 btn-sm'
          onClick={()=>history.push("/buat-task")}>Buat Task Baru</Button>
          </Col>
          </Row>
{       !filteredData ?    <Spinner animation="border" /> :
  <>
            <Table
            virtualized 
            autoHeight="true"
            bordered
            loading={loading}
            data={getData()}
            onRowClick={(rowData) => handleRowClick(rowData)}
            sortColumn={sortColumn}
            sortType={sortType}
            onSortColumn={handleSortColumn}
            >
                <Column align="center" width={80}>
                    <HeaderCell>No</HeaderCell>
                    <Cell>{(rowData, rowIndex) => <div>{rowIndex + 1}</div>}</Cell>
                </Column>
                <Column align="center" flexGrow={3} minWidth={200}>
                    <HeaderCell>Nama Proyek</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                <Column align="center" >
                    <HeaderCell>Tipe</HeaderCell>
                    <Cell dataKey="type">
                    {(rowData) => {
                      if (rowData.type ==="1"){
                          return ("Project") 
                      }
                      else{
                        return "Task"
                      }
                    }}
                    </Cell>
                </Column>

                <Column align="center" >
                    <HeaderCell>Progress (%)</HeaderCell>
                    <Cell dataKey="progress" />
                </Column>

                <Column align="center" flexGrow={1} minWidth={100}>
                    <HeaderCell>Status</HeaderCell>
                    <Cell dataKey="status" />
                </Column>

                <Column align="center" flexGrow={2} minWidth={100} sortable>
                    <HeaderCell >Dibuat Tanggal</HeaderCell>
                    <Cell dataKey="created_at">
                    {(rowData) => {
                    const createdAt = parseISO(rowData.created_at);
                    return format(createdAt, 'dd MMMM yyyy HH:mm:ss');
                    }}
                </Cell>
                </Column>

            </Table>
          <div style={{ padding: 20 }}>
            <Pagination
              prev
              next
              first
              last
              ellipsis
              boundaryLinks
              maxButtons={5}
              size='xs'
              layout={['total', '-', 'limit', '|', 'pager', 'skip']}
              total={filteredData.length}
              limitOptions={[10, 30, 50]}
              limit={limit}
              activePage={page}
              onChangePage={setPage}
              onChangeLimit={handleChangeLimit}
            />
            
          </div>
          </>
            }
    </>
    )
}