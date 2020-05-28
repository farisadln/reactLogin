import React from 'react';
import { observer } from "mobx-react";
import UserStore from "./stores/UserStore";
import LoginForm from "./LoginForm";
import SubmitButton from "./SubmitButton";
import './App.css';

class App extends React.Component {

    async componentDidMount() {
        try {
            let res = await fetch('/isLoggedIn',{
                method : 'post',
                headers : {
                    'Accept' : 'aplication/json',
                    'Content-Type' : 'application/json'
                }
            });
            let result = await res.json();

            if (result && result.success){
                UserStore.loading = false;
                UserStore.isloggedIn = true;
                UserStore.username = result.username;
            }else {
                UserStore.loading = false;
                UserStore.isloggedIn= false;

            }
        } catch (e) {
            UserStore.loading = false;
            UserStore.isloggedIn = false;
        }
    }


    async doLogout() {
        try {
            let res = await fetch('/logout',{
                method : 'post',
                headers : {
                    'Accept' : 'aplication/json',
                    'Content-Type' : 'application/json'
                }
            });
            let result = await res.json();

            if (result && result.success){
                UserStore.isloggedIn = false;
                UserStore.username = '';

            }
        } catch (e) {
           console.log(e)
        }
    }

  render() {

        if (UserStore.loading){
            return (
                <div className="app">
                    <div className="container">
                        loading, please wait..
                    </div>
                </div>
            )
        }else {
            if (UserStore.isloggedIn){
                return (
                    <div className="app">
                        <div className="container">
                            Welcome {UserStore.username}
                            <SubmitButton
                                text={'Log Out'}
                                disable={false}
                                onClick={()=> this.doLogout()}
                            />
                        </div>
                    </div>
                )
            }
        }


    return (
        <div className="app">
            <div className="container">

                <LoginForm />
            </div>
        </div>
    );

  }

}
export default observer(App);
