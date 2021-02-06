import React, { Component, Fragment} from 'react';

// import './style.css';

class PlayWindow extends Component {

    render() {
        return (
            <Fragment>
                {console.log('视频加载开始')}
                {/* <Player sources={this.state.sources} /> */}
                {console.log('视频加载结束')}                      
            </Fragment>
        )
    }
}

export default PlayWindow;