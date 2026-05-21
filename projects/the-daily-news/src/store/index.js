import { applyMiddleware, compose, createStore } from "redux";
import appReducers from './reducers';
import promiseMiddleware from 'redux-promise';

const ReduxStore = () => {
    const composedEnhancers = window.__REDUX_DEVTOOLS_ENTENSION_COMPOSE__ || compose;
    const store = createStore(
        appReducers,
        composedEnhancers(applyMiddleware(promiseMiddleware))
    );
    return store;
}
export default ReduxStore;