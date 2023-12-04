import { Link } from 'react-router-dom';
import { Container, Image, Button } from 'react-bootstrap';

export default function NotFound() {
  return (
    <Container fluid className='d-flex justify-content-center align-items-center flex-column text-center'>
        <>
        {/* <Container className = "h-25"> */}
            <Image src='https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?w=900&t=st=1701397157~exp=1701397757~hmac=e06ea4293ebd5bff973ef0fde0ba535daeb865d5757e259ab6b84d3aed26268a'
             fluid
            style={{height:'50vh'}}/>
        {/* </Container> */}
        <h1>Uh oh, I think you are lost</h1>
        <p>It looks like the page you’re looking for doesn't exist.</p>
        <Button className='btn-danger'>
        <Link to="/" className="text-white ">
        Go Back Home
        </Link></Button>

        </>

    </Container>
    // <main
    //   className="min-h-screen bg-cover bg-top sm:bg-top"
    //   style={{
    //     backgroundImage:
    //       'url("https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?w=900&t=st=1701397157~exp=1701397757~hmac=e06ea4293ebd5bff973ef0fde0ba535daeb865d5757e259ab6b84d3aed26268a")',
    //   }}>
    //   <div className="max-w-7xl mx-auto px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8 lg:py-48">
    //     <p className="text-sm font-semibold text-black text-opacity-50 uppercase tracking-wide">
    //       404 error
    //     </p>
    //     <h1 className="mt-2 text-4xl font-extrabold text-white tracking-tight sm:text-5xl">
    //       Uh oh! I think you’re lost.
    //     </h1>
    //     <p className="mt-2 text-lg font-medium text-black text-opacity-50">
    //       It looks like the page you’re looking for doesn't exist.
    //     </p>
    //     <div className="mt-6">
    //       <Link
    //         to="/"
    //         className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black text-opacity-75 bg-white bg-opacity-75 sm:bg-opacity-25 sm:hover:bg-opacity-50">
    //         Go back home
    //       </Link>
    //     </div>
    //   </div>
    // </main>
  );
}
