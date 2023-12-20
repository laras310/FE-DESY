import AdminMenu from "../includes/MenuAdmin";
import { useEffect, useState } from "react";
import ZeroList from "../includes/ZeroList";
import axios from "axios";
import MyBurgerMenu from "../includes/MyBurgerMenu";
import { Container, Button, Row, Col, Form, InputGroup, FormControl, Tab} from "react-bootstrap";
import { Table, Pagination } from 'rsuite';
import { FilePdf, FileWord,  FileImage,Plus, CloudArrowDownFill, PencilFill, TrashFill } from "react-bootstrap-icons";
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { CustomTabs } from "../includes/Atom/StyledComponents";
import swal from 'sweetalert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

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
  const history = useHistory()

  const handleTabChange = (key) => {
    setContentLoading(true);
    setTimeout(() => {
      setActiveTab(key);
      setContentLoading(false);
    }, 500); // 1 detik penundaan
  };

  const filteredData = data?.filter(item=>{
    return (
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  })

  const filteredDataKms = dataKms?.filter(item=>{
    return (
      item.file_name.toLowerCase().includes(searchTerm.toLowerCase())
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
    setPage(1); // Reset halaman ketika melakukan pencarian
  };

  const handleChangeLimit = (dataKey) => {
    setPage(1);
    setLimit(dataKey);
  };

  const handleDelete = (path) =>{
    swal({
      title:"Hapus Dokumen?",
      text:"Dokumen yang terhapus tidak dapat dikembalikan.",
      icon:"warning",
      buttons:true,
      dangerMode:true,
    })
    .then((willDelete)=>{
      if(willDelete){
        axios.delete(`${process.env.REACT_APP_API_JOBCARD}/kms/${path}` , {
          })
          .then(responses=>{
            swal("Dokumen berhasil dihapus.", {
              icon: "success",
            }
           ) ;history.go(0)
          });
      }
    })
    
  }
  
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
              {
                    userRole === "admin" ?
                    
                    <Button className=' mb-3 btn-sm'
                      onClick={()=>history.push("/tambah-kms")}
                      ><Plus/>
                      Tambah KMS</Button>
                    :
                    null

                  }

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
                          <Cell>{(rowData, rowIndex) => <div>{rowIndex + 1} </div>}</Cell>
                      </Column>
                      
                      <Column align="center" width={80} >
                          <HeaderCell>Tipe</HeaderCell>
                          <Cell >
                          {rowData =>
                            {
                              const fileExtensionMatch = rowData.path && rowData.path.match(/\.([a-zA-Z0-9]+)$/);

                              if (fileExtensionMatch && fileExtensionMatch[1]) {
                                  const fileExtension = fileExtensionMatch[1].toLowerCase();
                                  if (fileExtension === "pdf") {
                                    return <FilePdf size={30} color="red" />;
                                } else if (fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "png") {
                                    return <FileImage size={30}  />;
                                } else {
                                    return <FileWord size={30} color="blue" />;
                                }
                              } else {
                                  return null
                              }
                            }
                        }

                          </Cell>
                      </Column>
                      <Column align="center" flexGrow={2} minWidth={200}>
                          <HeaderCell>Nama Project</HeaderCell>
                          <Cell dataKey="project_name" />
                      </Column>
                      <Column align="center" flexGrow={2} minWidth={200}>
                          <HeaderCell>Nama file</HeaderCell>
                          <Cell dataKey="file_name" />
                      </Column>

                      <Column align="center" flexGrow={2} minWidth={200}>
                          <HeaderCell></HeaderCell>
                          <Cell>
                          
                              {rowData =>
                            
                            <>
                            
                            {/* Download button */}
                            <a class="link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                            href={`https://jobcard-api.pins.co.id/`+ rowData.path} download="tes.pdf"
                            target="_blank" rel="noopener noreferrer"
                            >
                          
                          <Button className="btn-success "
                          ><CloudArrowDownFill className='fs-4'/> </Button></a>
                          {
                            userRole === "admin" ?
                            <>

                            {/* Edit button */}
                            <Link class="link-dark link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover mx-2"
                            to={{pathname: "/edit-kms", state:rowData}} 
                            >
                          <Button className="btn-warning"
                          ><PencilFill className='fs-4'/> </Button></Link>
                          

                          {/* delete button */}
                          <Button className="btn-danger" onClick={()=>handleDelete(rowData.id)}
                          ><TrashFill className='fs-4'/> </Button>
                            </>
                            :
                            null
                          }
                          
                          </>
                            
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
                    // size='xs'
                    // layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                    total={filteredDataKms.length}
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
              {
                userRole === "admin" ?
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
                  autoHeight
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
                              href={'https://jobcard-api.pins.co.id/evidence/'+ rowData.name}  
                            target="_blank" rel="noopener noreferrer"
                            >
                              
                          <Button className="btn-success "
                          ><CloudArrowDownFill className='fs-4'/> </Button></a>
                            
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
                    // size='xs'
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
              :
              null
              }
              
            </CustomTabs>


      </Container>
      }
 
    </div>
    )
} 