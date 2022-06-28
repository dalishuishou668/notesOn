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
                <div className='subtitle'>Schedule your tasks and manage everything in one place.</div>
                <button className='signupBtn'>SIGN UP</button>
                <NavLink to='/login' className='link'> Already have an account? Log in.</NavLink>
                <div className='imgContainer'>
                    <img className="img" src={img} alt="loading..." />
                    <div className='landingText'>
                        <h3>WORK ANYWHERE !</h3>
                        <p>Keep important notes handy.</p>
                        <h3>REMEMBER EVERYTHING !</h3>
                        <p>Make notes more useful.</p>
                        <h3>EASY TO USE !</h3>
                        <p>Get what you need when you needed.</p>
                    </div>
                </div>
            </div>

            {/* <Notebook /> */}
        </div>
    )
}

export default LandingPage;
