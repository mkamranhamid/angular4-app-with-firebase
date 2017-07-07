import { Action } from 'redux';
import { AuthActions } from '../actions/auth.actions';

export interface IAppState {
    count?: number;
    name?: string;
}

export const INITIAL_STATE: IAppState = {
    count: 0,
    name: ''
    
};

export function rootReducer(lastState: IAppState = INITIAL_STATE, action: { type: string, payload?: any }) {
    console.log('lastState :: ', lastState);
    console.log('action :: ', action);
    switch (action.type) {
        case AuthActions.INCREMENT: 
            return { count: lastState.count + 1 };
        case AuthActions.DECREMENT: 
            return { count: lastState.count - 1 };
        case AuthActions.CREATENAME: 
            return Object.assign({}, lastState, { name: action.payload });
        case AuthActions.GETCREATE: 
            return Object.assign({}, lastState, { name: action.payload });
    }

    // When we don't care about any other actions right now.
    return lastState;
}