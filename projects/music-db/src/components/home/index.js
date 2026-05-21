import { Component } from "react";
import ArtistsList from "./artistsList";
import Banner from "./banner";
import axios from "axios";

const URL_ARTISTS = `${process.env.REACT_APP_DB_URL}/artists`

class Home extends Component {
    state = {
        artists: []
    }
    componentDidMount() {
        axios.get(URL_ARTISTS)
            .then(response => {
                this.setState({ artists: response.data })
            })
    }
    render() {
        console.log(this.state);
        return (
            <>
                <Banner/>
                <ArtistsList allArtists={this.state.artists}/>
            </>
        )
    }
}
export default Home;