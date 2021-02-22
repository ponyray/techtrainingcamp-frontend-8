import React, { Component, Fragment} from 'react';

import './style.css';

class VideoInstruction extends Component {

    constructor(props){
        super(props);
        this.state = {
            // Id:1,
            author: "",
            description: "",
            tagList: [""],
            likes: 5868,
            comments: 2456,
            date: "",
        }
    }

    getDate() {
        var d = new Date(),
            str = '';
        str += d.getFullYear() + '年'; //获取当前年份 
        str += d.getMonth() + 1 + '月'; //获取当前月份（0——11） 
        str += d.getDate() + '日';
        this.setState({
            date: str
        })
    }

    

    showTags(){
        return this.props.tagList.map( (value, index) => {
            return <p style={{marginRight: 7}}>#{value + ' '}</p>
        })
    }

    componentDidMount() {
        // console.log("VideoInstruction componentDidMount");
        this.getDate();
        this.props.setSign(this.props.sign);
    }

    componentWillMount() {
        // console.log("VideoInstruction componentWillMount");
    }

    render() {
        return (
            <Fragment>
                <div>
                    <div className='brief' id='firstBrief'>
                        <div id='author'>
                            {'@' + this.props.author}
                        </div>
                        <div id='date'>
                            {'  · ' + this.state.date}
                        </div>
                    </div>
                    <div className='brief' id='description'>
                        <p class="animate">
                            {this.props.description}
                         </p>
                    </div>
                    <div className='brief' id='tagList'>
                        {this.showTags()}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default VideoInstruction;