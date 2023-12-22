import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button, Stack, Card, Container, InputGroup } from 'react-bootstrap';
import { Table, Pagination } from 'rsuite';
import axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Plus } from 'react-bootstrap-icons';
import { format, parseISO } from 'date-fns';

ChartJS.register(ArcElement, Tooltip, Legend);
const { Column, HeaderCell, Cell } = Table;

const DataTable = () => {
    const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchName, setSearchName] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState({ idle: [], progress: [], done: [] });
  const [filteredData, setFilteredData] = useState([]);
  const [chartData, setChartData] = useState( {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data initially
        const response = await axios.get(`${process.env.REACT_APP_API_JOBCARD}/task/all`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Update filteredData whenever search criteria change
    const updateFilteredData = () => {
        
      const allItems = Object.values(data).flat();
      const filtered = allItems.filter((item) => (
        item.name.toLowerCase().includes(searchName.toLowerCase())
      ));
      setFilteredData(filtered);
    };
    const updateChartData = () => {
        const doneCount = data && data.done ? data.done.length : 0;
        const progressCount = data && data.progress ? data.progress.length : 0;
        const idleCount = data && data.idle ? data.idle.length : 0;
      
        setChartData({
          labels: ['Done', 'Progress', 'Idle'],
          datasets: [
            {
              data: [doneCount, progressCount, idleCount],
              backgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
              hoverBackgroundColor: ['#36A2EB', '#FFCE56', '#FF6384'],
            },
          ],
        });
      };
      updateFilteredData();
      updateChartData();
  }, [data, searchName, startDate, endDate]);

  const handleDateButtonClick = async () => {
    try {
      // Fetch data from the API based on date criteria
      const response = await axios.get(`${process.env.REACT_APP_API_JOBCARD}/task/all?start_date=${startDate}&end_date=${endDate}`);
      setData(response.data.data);
      console.log(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleRowClick = (rowData) => {
    history.push({
      pathname: '/timeline',
      state: { data: rowData },
    });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
          <Row className="mb-3">
        <Col>
        <Card>
            
            <Card.Body>
                <Row className="justify-content-md-center">
                    
                <Col s lg="4">
                    <Container 
                    // style={{width:"35vh"}}
                    >
                        <Doughnut data={chartData} />
                    </Container>
                </Col>
                <Col lg="4">
                
                <Form>
                    
                    <Form.Label>Start Date</Form.Label>
                        <Form.Control
                        type='date'
                        value={startDate}
                        onChange={(event) => setStartDate(event.target.value)}
                        />
                        
                    <Form.Label>End Date</Form.Label>
                        <Form.Control
                        type='date'
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                        />
                    <Button onClick={handleDateButtonClick} className='my-2'>Fetch Data</Button>

                </Form>
                <Card className="d-flex flex-row my-2">
                    <Stack>
                        <p className="m-1 fw-bold">Total Project : {data.done.length+data.progress.length+data.idle.length}</p>
                        <p className="m-1">Project Idle : {data.idle.length}</p>
                        <p className="m-1">Project On Progress : {data.progress.length}</p>
                        <p className="m-1">Project Done : {data.done.length}</p>
                    </Stack>
                </Card>
                
                </Col>
                </Row>
                    
            </Card.Body>
        </Card>
        </Col>

    </Row>
    
    
      <Form>
      <Stack direction="horizontal" gap={3}>
      {/* <div className="py-2 me-auto"> */}
      <Form className="py-2 me-auto">
                <InputGroup>
                  <InputGroup.Text className='bg-white'>
                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-search' viewBox='0 0 16 16'>
                      <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                    </svg>
                  </InputGroup.Text>
                  <Form.Control type='search' placeholder='Search' onChange={(e) => setSearchName(e.target.value)} value={searchName}/>
                </InputGroup>
              </Form>
        {/* </div> */}
        <div className="py-2">
      <Button className='btn btn-danger text-truncate'
          onClick={()=>history.push("/buat-task")}><Plus/>Task Baru</Button>
      </div>
      
    </Stack>
      </Form>

      <Table
      virtualized 
      autoHeight="true"
      bordered
    //   loading={loading}
      data={currentItems}
      onRowClick={(rowData) => handleRowClick(rowData)}
    //   sortColumn={sortColumn}
    //   sortType={sortType}
    //   onSortColumn={handleSortColumn}
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
      <Pagination
  prev
  last
  next
  first
  size="md"
  pages={Math.ceil(filteredData.length / itemsPerPage)}
  activePage={currentPage}
  onSelect={(page) => paginate(page)}
  total={filteredData.length}
  layout={['total', '-',  '|', 'pager', 'skip']}
/>
    </div>
  );
};

export default DataTable;
