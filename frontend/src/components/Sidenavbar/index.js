import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Search from "./search";
import img from '../../images/panda.png';
import './Sidenavbar.css';

const Sidenavbar = ({ name, notebooks }) => {

    const sessionUser = useSelector((state) => state.session.user);
    const [view, setView] = useState(false)

    return (
        <div className='navContainer'>
            <h3></h3>
            <h4>Welcome!</h4>
            <div>
                <div className='profile'>
                    <img className="navImg" src={img} alt="loading..." />
                    <h4>{name}</h4>
                </div>
                <Search sessionUser={sessionUser} notebooks={notebooks} />
                <button onClick={() => setView(true)}
                    className='navCreate'
                >
                    Create A Note</button>
                <p>LinkedIn</p>
                <a href='https://github.com/dalishuishou668' className='github' >
                    <i className="fab fa-github-square"></i>
                    <p>Github</p>
                </a>
            </div>
        </div>
    )
}

export default Sidenavbar;
