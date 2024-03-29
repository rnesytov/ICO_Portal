import {createStore, applyMiddleware} from 'redux'
import Immutable from 'immutable'
import createSagaMiddleware from 'redux-saga'
import rootSaga from 'js/sagas'
import {createLogger} from 'redux-logger'

import reducer from 'js/reducers'


const sagaMiddleware = createSagaMiddleware()
const logger = createLogger({

    stateTransformer: (state) => {
        let newState = {};

        for (var i of Object.keys(state)) {
            if (Immutable.Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS();
            } else {
                newState[i] = state[i];
            }
        };

        return newState;
    }
});




export const store = process.env.NODE_ENV === 'development' ? createStore(reducer, applyMiddleware(sagaMiddleware, logger)) : createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga)

export default store;
