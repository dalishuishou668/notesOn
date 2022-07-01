import { useSelector, useDispatch } from 'react-redux';
import Navigation from '../Navigation';
import { NavLink, useHistory } from 'react-router-dom';
import img from '../../images/homepage.jpg';
import Notebook from '../Notebook';
import './LandingPage.css'

function LandingPage() {

    // const sessionUser = useSelector(state => state.session.user);

    const history = useHistory();

    const signupSubmit = (e) => {
        e.preventDefault();
        history.push('/signup')
    }


    return (
        <div>
            <div className='landingPageContainer'>
                <h1>Save your thoughts wherever you are.</h1>
                <div className='subtitle'>Simplify your life. </div>
                <div className='subtitle2'>Schedule your tasks and organize everything in one place.</div>
                {/* <NavLink to='/signup' className='signupBtn'>SIGN UP</NavLink> */}
                <button className='signupBtn' onClick={signupSubmit}>SIGN UP</button>
                <NavLink to='/login' className='link'> Already have an account? Log in.</NavLink>
                <div className='imgContainer'>
                    <img className="img" src={img} alt="loading..." />
                    <div className='landingText'>
                        <h4>WORK ANYWHERE !</h4>
                        <p>All your work in one place. Keep important notes handy.</p>
                        <h4>REMEMBER EVERYTHING !</h4>
                        <p>Capture what's on your mind. Make notes more useful.</p>
                        <h4>EASY TO USE !</h4>
                        <p>Quickly search for note. Get what you need when you needed.</p>
                        <h3></h3>
                    </div>
                </div>
            </div>

            {/* <Notebook /> */}
        </div>
    )
}

export default LandingPage;
