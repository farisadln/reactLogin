import React from 'react';
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import UserStore from "./stores/UserStore";
import {onReactionError} from "mobx";

class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: '',
            buttonDisable: false
        }
    }


    setInputValue(property, val){
        val = val.trim();
        if (val.length > 12){
            return;
        }
        this.setState({
            [property]:val
        })
    }

    resetFrom(){
        this.setState({
            username: '',
            password: '',
            buttonDisable: false
        })
    }

    async doLogin(){
        if (!this.state.username){
            return ;
        }
        if (!this.state.password){
            return;
        }
        this.setState({
            buttonDisable: true
        })
        try {
            let res = await fetch('/login',{
                method : 'post',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    username : this.state.username,
                    password: this.state.password
                })
            });

            let result = await res.json();
            if (result && result.success){
                UserStore.isLoggedIn = true;
                UserStore.username = result.use;
            }
            else if (result && result.success === false){
                this.resetFrom();
                alert(result.msg);
            }

        }catch (e) {
            console.log(e);
            this.resetFrom()
        }

    }

    render() {
        return (
            <div className="loginForm">
                Log In
                <InputField
                    type='text'
                    placeholder='Username'
                    value={this.state.username ? this.state.username:''}
                    onChange={(val) => this.setInputValue('username', val)}
                />
                <InputField
                    type='password'
                    placeholder='Password'
                    value={this.state.password ? this.state.password:''}
                    onChange={(val) => this.setInputValue('password', val)}
                />

                <SubmitButton
                    text='Login'
                    disable={this.state.buttonDisable}
                    onClick={()=> this.doLogin()}
                />

            </div>
        );

    }

}
export default LoginForm;