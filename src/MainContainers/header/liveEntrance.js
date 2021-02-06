import React, { Component, Fragment} from 'react';
// import { EyeOutlined } from '@ant-design/icons';

import icon from './img/favicon2.png';
import { Link } from 'react-router-dom';


import './style.css';

class LiveEntrance extends Component {

    render() {
        return (
            <Fragment>
                <Link to='/live'>
                    <img src={icon} alt='' className='icon'></img >
                </Link>
            </Fragment>
        )
    }
}

export default LiveEntrance;