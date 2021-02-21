import React, { Component, Fragment } from 'react';
import axios from 'axios';

import './style.css'

class LoginPage extends Component {
    constructor(props) {

        super(props);

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.confirmeRegister = this.confirmeRegister.bind(this);

        this.state = {
            inputValue: "测试",
            sign: ''
        }
    }

    handleInputChange (e){
        this.setState({
            inputValue: e.target.value
        })
    }

    handleKeyUp(e){
        if (e.keyCode === 13 && e.target.value !== '') {
            this.setState({
                inputValue: ''
            })
            this.confirmeRegister()
        }
    }

    confirmeRegister(){
        var url = 'http://bytedancecamp.rooftopj.cn:8080/video/getSign/' + this.state.inputValue
        axios.get(url)
            .then( (res) => {
                // console.log(res)
                if (res.data.code === 200) {
                    this.setState({
                        sign: res.data.data.sign
                        //改一下要更新main的用户名和sign
                    })
                    alert("注册成功")
                    console.log(res.data.data.sign)
                    this.props.history.push('/');
                }
            })
    }

    render() {
        return (
            <Fragment>
                <div className="input">
                    <label htmlFor='myinput' id="sidetext">请输入用户名注册</label>                          
                    <input
                        id='myinput'
                        className='input'
                        value={this.state.inputValue} 
                        onChange={this.handleInputChange}
                        onKeyUp={this.handleKeyUp}
                    />
                </div>
                <div className="btn">
                    <button onClick={this.confirmeRegister} id="confirm" >确认</button>
                </div>
            </Fragment>
        );
    }
}

export default LoginPage;