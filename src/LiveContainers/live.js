import axios from 'axios';
import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';

class Live extends Component {
    constructor(props) {
        super(props);

        this.state = {
                // sign : 'a82d0d5e-9c55-4186-b443-c891f1221995114135149123114135149123'
        }
    }

    getVideoJson () {
        
        var url = 'http://bytedancecamp.rooftopj.cn:8080/video/getNewVideo/' + this.props.sign
        axios.get(url)
            .then( (res) => {
                console.log(res)
                // console.log(res.data.data.video.id)
            })
    }

    componentWillMount() {
        var url = 'http://bytedancecamp.rooftopj.cn:8080/video/getNewVideo/' + this.state.sign
        axios.get(url)
            .then( (res) => {
                console.log(res)
                if(res.data.code === 203) {
                    // alert("请登录")
                    this.props.history.push('/login');
                }
            })
    }

    render() {
        return (
            <Fragment>
                <div>
                    Live
                    {this.getVideoJson()}
                    <br></br>
                    <Link to='/'>
                        <button >返回点播</button>
                    </Link>
                </div>
            </Fragment>
        )
    }
}

export default Live;
