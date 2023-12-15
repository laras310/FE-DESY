import AdminMenu from "../includes/MenuAdmin";
import { useEffect, useState } from "react";
import ZeroList from "../includes/ZeroList";
import axios from "axios";
import MyBurgerMenu from "../includes/MyBurgerMenu";
import { Container, Card, Row, Col, Form, InputGroup, FormControl, Tab, Tabs, TabContent} from "react-bootstrap";
import { Table, Pagination } from 'rsuite';
import { FilePdf, FileWord,  FileImage, FileArrowDown} from "react-bootstrap-icons";
import Spinner from 'react-bootstrap/Spinner';
import styled from 'styled-components';
import { useSelector } from "react-redux";

export const CustomTabs = styled(Tabs)`
  .nav-link.active {
    background-color: red;
    color: white;
  }

  .nav-link {
    background-color: #f0f0f0;
    color: grey;
    font-weight:bold;
  }
`;


const { Column, HeaderCell, Cell } = Table;

export default function Dokumen(){
  const [data, setData] = useState([]);
  const [dataKms, setDataKms] = useState([]);
  const [loading, setLoading]= useState(false)
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState();
  const [sortType, setSortType] = useState();
  const [activeTab, setActiveTab] = useState('dokumen_kms');
  const [contentLoading, setContentLoading] = useState(false);
  const userRole = useSelector(state=>state.user.role)

  const handleTabChange = (key) => {
    setContentLoading(true);
    setTimeout(() => {
      setActiveTab(key);
      setContentLoading(false);
    }, 500); // 1 detik penundaan
  };

  const filteredData = data.filter(item=>{
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  })

  const filteredDataKms = dataKms.filter(item=>{
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

  const getDataKms = () => {
    let sortedData = filteredDataKms;
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
  
    useEffect(() => {
      const apiAllData = `${process.env.REACT_APP_API_JOBCARD}/task/all-document`;

      // URL untuk data kedua
      const apiKms = `${process.env.REACT_APP_API_JOBCARD}/kms/all`;
      Promise.all([
        axios.get(apiAllData),
        axios.get(apiKms)
    ])
        .then(responses => {
            // Response dari panggilan pertama
            const data1 = responses[0].data.data;
            setData(data1);
    
            // Response dari panggilan kedua
            const data2 = responses[1].data.data;
            setDataKms(data2)
    
            // Lakukan apapun yang diperlukan dengan kedua set data ini
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);
    return(
        <div>
      {
        userRole === "admin" ?
        <AdminMenu></AdminMenu>
        :
        <MyBurgerMenu/>

      }

      {data <1 ? <ZeroList/>
      : 
      <Container className='mt-5'>

            <CustomTabs
              id="uncontrolled-tab-example"
              className="mb-3"
              activeKey={activeTab}
              onSelect={handleTabChange}
              fill
            >
              <Tab eventKey="dokumen_kms" title="Dokumen KMS">
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
                {
                  contentLoading ? 
                  <Container className="d-flex justify-content-center align-self-center py-3">
                  <Spinner animation="border" className=""/>
                  </Container>
                  :
                  <>
                  {       
                !filteredDataKms ?    <Container className="d-flex justify-content-center align-self-center py-3">
                <Spinner animation="border" className=""/>
                </Container> :
                <>
                  <Table
                  // virtualized 
                  autoHeight="true"
                  bordered
                  loading={loading}
                  data={getDataKms()}
                  // onRowClick={(rowData) => handleRowClick(rowData)}
                  sortColumn={sortColumn}
                  sortType={sortType}
                  onSortColumn={handleSortColumn}
                  rowHeight={60}
                  >
                      <Column align="center" width={80}>
                          <HeaderCell>No</HeaderCell>
                          <Cell>{(rowData, rowIndex) => <div>{rowIndex + 1}</div>}</Cell>
                      </Column>
                      <Column align="center" width={80} >
                          <HeaderCell>Tipe</HeaderCell>
                          <Cell >
                          {rowData =>
                            {
                                const fileExtension = rowData.name.match(/\.([a-zA-Z0-9]+)$/)[1].toLowerCase();

                                if (fileExtension === "pdf") {
                                    return <FilePdf size={30} color="red" />;
                                } else if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png") {
                                    return <FileImage size={30}  />;
                                } else {
                                    return <FileWord size={30} color="blue" />;
                                }
                            }
                        }

                          </Cell>
                      </Column>
                      <Column align="center" flexGrow={2} minWidth={200}>
                          <HeaderCell>Nama Task/Project</HeaderCell>
                          <Cell dataKey="name" />
                      </Column>
                      <Column align="center" flexGrow={2} minWidth={200}>
                          <HeaderCell>Nama file</HeaderCell>
                          <Cell dataKey="name" />
                      </Column>

                      <Column align="center" flexGrow={2} minWidth={200}>
                          <HeaderCell></HeaderCell>
                          <Cell>
                          
                              {rowData =>
                            
                                <a class="link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                                href={'https://jobcard-api.pins.co.id/evidence/'+ rowData.name} >
                              <p 
                              ><FileArrowDown className='fs-4'/> Download </p></a>
                            
                        }
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
                    // layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                    total={filteredData.length}
                    limitOptions={[10, 30, 50]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                  />
                  
                </div>
                </>
                  }</>
                }
              
                
              </Tab>
              <Tab eventKey="seluruh_dokumen" title="Seluruh Dokumen">
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
                {
                  contentLoading ? 
                  <Container className="d-flex justify-content-center align-self-center py-3">
                  <Spinner animation="border" className=""/>
                  </Container>
                  :
                  <>
                  {       
                !filteredData ?    <Container className="d-flex justify-content-center align-self-center py-3">
                <Spinner animation="border" className=""/>
                </Container> :
                <>
                  <Table
                  // virtualized 
                  autoHeight="true"
                  bordered
                  loading={loading}
                  data={getData()}
                  // onRowClick={(rowData) => handleRowClick(rowData)}
                  sortColumn={sortColumn}
                  sortType={sortType}
                  onSortColumn={handleSortColumn}
                  rowHeight={60}
                  >
                      <Column align="center" width={80}>
                          <HeaderCell>No</HeaderCell>
                          <Cell>{(rowData, rowIndex) => <div>{rowIndex + 1}</div>}</Cell>
                      </Column>
                      <Column align="center" width={80} >
                          <HeaderCell>Tipe</HeaderCell>
                          <Cell >
                          {rowData =>
                            {
                                const fileExtension = rowData.name.match(/\.([a-zA-Z0-9]+)$/)[1].toLowerCase();

                                if (fileExtension === "pdf") {
                                    return <FilePdf size={30} color="red" />;
                                } else if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png") {
                                    return <FileImage size={30}  />;
                                } else {
                                    return <FileWord size={30} color="blue" />;
                                }
                            }
                        }

                          </Cell>
                      </Column>
                      <Column align="center" flexGrow={2} minWidth={200}>
                          <HeaderCell>Nama Proyek</HeaderCell>
                          <Cell dataKey="name" />
                      </Column>

                      <Column align="center" flexGrow={2} minWidth={200}>
                          <HeaderCell></HeaderCell>
                          <Cell>
                          
                              {rowData =>
                            
                                <a class="link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                                href={'https://jobcard-api.pins.co.id/evidence/'+ rowData.name} >
                              <p 
                              ><FileArrowDown className='fs-4'/> Download </p></a>
                            
                        }
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
                    // layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                    total={filteredData.length}
                    limitOptions={[10, 30, 50]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                  />
                  
                </div>
                </>
                  }</>
                }
              
                
              </Tab>
            </CustomTabs>


      </Container>
      }
 
    </div>
    )
} 