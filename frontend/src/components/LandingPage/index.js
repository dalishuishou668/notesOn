import { useSelector, useDispatch } from 'react-redux';
import Navigation from '../Navigation';
import { NavLink } from 'react-router-dom';
import img from '../../images/homepage.jpg';
import Notebook from '../Notebook';
import './LandingPage.css'

function LandingPage() {

    // const sessionUser = useSelector(state => state.session.user);


    return (
        <div>
            <Navigation />
            <div className='landingPageContainer'>
                <h1>Simplify your life !!!</h1>
                <div>Schedule your tasks and manage everything in one place.</div>
                <button>SIGN UP</button>
                <NavLink to='/login'> Already have an account? Log in.</NavLink>
                <div className='imgContainer'>insert animation image
                    <img className="img" src={img} alt="loading..." />
                </div>
            </div>

            {/* <Notebook /> */}
        </div>
    )
}

export default LandingPage;
