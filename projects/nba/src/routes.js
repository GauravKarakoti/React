import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/header";
import Footer from "./components/footer";
import Article from "./components/Articles";
import Teams from "./components/Teams";
const Routes = () => (
    <BrowserRouter basename="/nba">
        <Header/>
        <Switch>
            <Route path='/article/:id' component={Article}/>
            <Route path='/teams' component={Teams}/>
            <Route path='/' component={Home}/>
        </Switch>
        <Footer/>
    </BrowserRouter>
)
export default Routes;