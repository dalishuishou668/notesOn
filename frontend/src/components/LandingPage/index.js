import { useSelector, useDispatch } from 'react-redux';
import Navigation from '../Navigation';
import img from '../../images/homepage.jpg';
import Notebook from '../Notebook';

function LandingPage() {

    // const sessionUser = useSelector(state => state.session.user);


    return (
        <div>
            <Navigation />
            <h1>Welcome</h1>
            <div>insert animation image
                <img className="img" src={img} alt="loading..." />
            </div>
            <div>some side text</div>
            {/* <Notebook /> */}
        </div>
    )
}

export default LandingPage;
