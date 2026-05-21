import { Component } from "react";
import { URL_SUBS } from "./paths";
import axios from "axios";

class Subscriptions extends Component {
    state = {
        email: '',
        error: false,
        success: false,
        alreadyIn: false
    }
    onChangeInput = (event) => {
        this.setState({
            email: event.target.value
        })
    }
    saveSubscription = (email) => {
        axios.get(`${URL_SUBS}?email=${email}`)
            .then(response => {
                if(!response.data.length) {
                    axios(URL_SUBS, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        data: JSON.stringify({ email: email })
                    }).then(response => {
                        this.setState({
                            email: '',
                            success: true
                        });
                        this.clearMessages();
                    })
                } else {
                    this.setState({
                        email: '',
                        alreadyIn: true
                    });
                    this.clearMessages();
                }
            })
    }
    clearMessages = () => {
        setTimeout(() => {
            this.setState({
                error: false,
                success: false,
                alreadyIn: false
            })
        }, 2000);
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let email = this.state.email;
        let regex = /\S+@\S+\.\S+/;
        if(regex.test(email)) {
            this.saveSubscription(email);
        } else {
            this.setState({ error: true });
            this.clearMessages();
        }

    }
    render() {
        const state = this.state;
        return (
            <div className="subscribe_panel">
                <h3>Subscribe to use</h3>
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            value={state.email}
                            placeholder="youremail@gmail.com"
                            onChange={this.onChangeInput}
                        />
                        <div className={state.error ? "error show" : "error"}>Check your email</div>
                        <div className={state.success ? "success show" : "success"}>Thank You</div>
                        <div className={state.alreadyIn ? "success show" : "success"}>You are already on the DB</div>
                    </form>
                </div>
                <small>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magma aliqua.
                </small>
            </div>
        )
    }
}
export default Subscriptions;