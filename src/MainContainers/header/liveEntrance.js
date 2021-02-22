import React, { Component, Fragment } from 'react';
// import { EyeOutlined } from '@ant-design/icons';

import icon from './img/favicon2.png';
import { Link } from 'react-router-dom';


import './style.css';

class LiveEntrance extends Component {

    render() {
        const {username,sign} = this.props
       
        return (
            <Fragment>
                {/* <Link to={`/live/?userName=${userName}&sign=${sign}`}> */}
                <Link to={{ pathname: '/live', state: {userName: username, sign:sign}}}>
                    <img src={icon} alt='' className='icon'></img >
                </Link>
            </Fragment>
        )
    }
}

export default LiveEntrance;