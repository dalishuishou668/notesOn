import { useEffect, useState, useContext } from "react";
import { useSelector, useDispatch } from 'react-redux';
import img from '../../images/panda.png';
import './Sidenavbar.css';

const Sidenavbar = ({ name, notebooks }) => {

    // const sessionUser = useSelector((state) => state.session.user);
    // const [view, setView] = useState(false)

    return (
        <div className='navContainer'>

            <div className='navContainer1'>
                <div className='profile'>
                    <img className="navImg" src={img} alt="loading..." />
                    <h4>Welcome, {name}</h4>
                </div>


                <div className='git'>
                    {/* <div className='spin'>
                        <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
                        <h4 className='text1'>Take notes now !</h4>
                    </div> */}
                    <a href='https://github.com/dalishuishou668' className='github' >
                        <i class="fa-brands fa-github"></i>

                    </a>
                    <a href='https://www.linkedin.com/in/qiaoyi-joyce-liu-623204241/' className='linkedIn'>
                        <i class="fa-brands fa-linkedin"></i>

                    </a>

                </div>

            </div>
        </div>
    )
}

export default Sidenavbar;
