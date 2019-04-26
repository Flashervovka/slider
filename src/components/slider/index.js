import React, {useEffect, useReducer} from 'react';
import {reducer, ON_LOAD_DATA_ERROR,ON_LOAD_DATA_SUCCESS,ON_LOAD_DATA_START} from './reducer';
import SliderContent from './components/slidercontent';
import ThemeContext from './themecontext';



const initialState = {
    sliderData:[],
    error:'',
    loading:true
};


function Slider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        (async() => {
            try {
                dispatch({type:ON_LOAD_DATA_START});
                const response = await fetch(props.url);
                const json = await response.json();
                dispatch({type:ON_LOAD_DATA_SUCCESS,data:json});
            }catch (e) {
                dispatch({type:ON_LOAD_DATA_ERROR,error:e.message || 'Unexpected error'});
            }
        })();
    }, [props.url]);

    if (state.loading) {
        return <div>Loading</div>
    }

    if (state.error) {
        return <div style={{color: 'red'}}>ERROR: {state.error}</div>
    }

    return (
        <ThemeContext.Provider value={props.theme}>
            <div className={"sliderMainContainer "+props.theme}>
                <SliderContent sliderData={state.sliderData} {...props}/>
            </div>
        </ThemeContext.Provider>
    );
}

export default Slider;