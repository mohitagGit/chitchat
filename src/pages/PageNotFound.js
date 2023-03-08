import { Link } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';

function PageNotFound() {
  return (
    <>
      <Header/>
      <div>
          <h1>404</h1>
          <p>Page Not Found!</p>
          <p>Go back to <Link to="/">Home Page</Link></p>
      </div>
      <Footer/>
    </>
  )
}
export default PageNotFound;