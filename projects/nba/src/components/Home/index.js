import { Component } from "react";
import HomeSlider from "./slider";
import Subscriptions from "../utils/subscribe";
import HomeArticles from "./articles";
import Poll from "../utils/poll";

class Home extends Component {
    state = {
        home: ''
    }
    render() {
        return (
            <>
                <HomeSlider/>
                <Subscriptions/>
                <div className="container">
                    <HomeArticles/>
                    <Poll/>
                </div>
            </>
        )
    }
}
export default Home;