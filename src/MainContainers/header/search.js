import React, { Component, Fragment} from 'react';

import icon from './img/search.png'

class Search extends Component {

    render() {
        return (
            <Fragment>
                <div>
                    <img src={icon} alt='' className='icon'></img>
                </div>
            </Fragment>
        )
    }
}

export default Search;