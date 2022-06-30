import { useEffect, useState, useContext } from "react";
import img from '../../images/panda.png';
import './Sidenavbar.css';

const Sidenavbar = ({ name }) => {

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
                <p>Search</p>
                <button onClick={() => setView(true)}
                    className='navCreate'
                >
                    Create A Note</button>
                <p>LinkedIn</p>
                <p>Github</p>
            </div>
        </div>
    )
}

export default Sidenavbar;
