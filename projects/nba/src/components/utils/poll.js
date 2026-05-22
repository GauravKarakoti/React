import { Component } from "react";
import { URL_TEAMS } from "./paths";
import cookie from 'react-cookies';
import axios from "axios";

class Poll extends Component {
    state = {
        pollTeams: [],
        error: false
    }
    getPoll() {
        axios.get(`${URL_TEAMS}?poll=true&_sort=count&_order=desc`)
            .then(response => {
                const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
                this.setState({
                    pollTeams: data
                });
            })
            .catch(error => {
                console.error("Failed to fetch poll teams:", error);
            });
    }
    componentDidMount() {
        this.getPoll();
    }
    addCount(count, id) {
        let getCookie = cookie.load('poll');
        if(getCookie === undefined) {
            axios(`${URL_TEAMS}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify({ count: count+1 })
            }).then(response => {
                cookie.save('poll', true);
                this.getPoll();
            });
        } else {
            this.setState({
                error: true
            });
        }
    }
    showPoll() {
        const position = ['1st', '2nd', '3rd'];
        return this.state.pollTeams.map((item, index) => (
            <div
                key={index}
                className="poll_item"
                onClick={() => this.addCount(item.count, item.id)}
            >
                <img alt={item.team} src={`${process.env.PUBLIC_URL}/images/teams/${item.logo}`}/>
                <h4>{position[index]}</h4>
                <div>
                    {item.count} votes
                </div>
            </div>
        ));
    }
    render() {
        return (
            <>
                <div className="home_poll">
                    <h3>Who will be the next champion?</h3>
                    <>
                        <div className="poll_container">
                            {this.showPoll()}
                        </div>
                        {
                            this.state.error ?
                                <div>
                                    <p>Sorry, you've already voted.</p>
                                </div> : null
                        }
                    </>
                </div>
            </>
        )
    }
}
export default Poll;