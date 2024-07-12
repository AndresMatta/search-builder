import {useState} from 'react';

/**
 * @param {boolean?} initialValue
 * @returns [ state: Boolean , enable: Function , disable: Function , toggle: Function ]
 * @description gets an initial value and provides an api to manage that value by calling functions
 */
export function useToggler(initialValue) {

    if(typeof initialValue !== 'boolean'){
        throw Error(`Incorrect value provided to ${useToggler.name}, expected boolean, but was ${typeof initialValue}`);
    }

    const [state, setState] = useState(initialValue || false);

    const enable = () => setState(true);
    const disable = () => setState(false);
    const toggle = () => setState(!state);

    return [state, enable, disable, toggle];
}