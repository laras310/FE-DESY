import React, { useState } from 'react';
import { Table, Pagination } from 'rsuite';
import Button from 'react-bootstrap/Button';
import { Container, Card, Row, Col, Form, InputGroup, FormControl } from 'react-bootstrap';
import { format, parseISO } from 'date-fns';
import { useHistory } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const { Column, HeaderCell, Cell } = Table;

export default function TableAdmin({ data }) {
  const [loading, setLoading]= useState(false)
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const history = useHistory();
  
  const allData =[...data.idle,...data.progress, ...data.done]; // Define filteredData state

  const filteredData = allData.filter(item=>{
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      // || item.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // item.email.toLowerCase().includes(searchTerm.toLowerCase())
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
    // Lakukan sesuatu dengan nilai pencarian, misalnya filter data
    // const filteredData = filteredData.filter((item) =>
    //   item.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    // setFilteredData(filteredData);
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

  return (
    <Container className='mt-5'>
      <Card style={{  marginBottom:'4rem' }}>
        <Card.Body>
          <h2>All Task</h2>
          <Button className='btn btn-danger mb-3 btn-sm'
          onClick={()=>history.push("/buat-task")}>Buat Task Baru</Button>
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
        </Card.Body>
      </Card>
    </Container>
  );
}
