import { Injectable } from '@angular/core';
import { Action } from 'redux';
import { NgRedux } from '@angular-redux/store';

import { IAppState } from '../reducers/reducer';
import { AF } from "../../providers/af";

@Injectable()
export class AuthActions {
    constructor(private afService: AF, private ngRedux: NgRedux<IAppState>) { }
    static INCREMENT = 'INCREMENT';
    static DECREMENT = 'DECREMENT';
    static CREATENAME = 'CREATENAME';
    static GETCREATE = 'GETCREATE';

    increment(): Action {
        return { type: AuthActions.INCREMENT };
    }

    decrement(): Action {
        return { type: AuthActions.DECREMENT };
    }

    create(name): void {
        this.ngRedux.dispatch({
            type: AuthActions.CREATENAME,
            payload: name
        })
        /*return { 
            type: CounterActions.CREATENAME
        };*/
    }

    getCreate(name): void {
        this.ngRedux.dispatch({
            type: AuthActions.GETCREATE,
            payload: name
        })
    }

}
