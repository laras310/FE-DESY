import { Card } from "react-bootstrap"

export default function ZeroList(){
    return(
        <div className="p-4">
            <Card className="p-5 d-flex justify-content-center align-item-center text-center" style={{minHeight:'80vh'}}>
                <Card.Title style={{fontSize:'2rem'}} className="fw-normal m-4">Hore! Tidak ada pekerjaan idle!</Card.Title>
                <Card.Subtitle className="fw-normal" >Pekerjaan idle merupakan pekerjaan atau tugas yang tidak memiliki update progress lebih dari 3 hari</Card.Subtitle>
            </Card>
        </div>
    )
}