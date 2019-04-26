import React, {useEffect, useReducer} from 'react';
import {reducer, ON_LOAD_DATA_ERROR,ON_LOAD_DATA_SUCCESS,ON_LOAD_DATA_START,ON_CHANGE_SLIDE} from './reducer';
import SliderContent from './components/slidercontent';
import ThemeContext from './themecontext';



const initialState = {
    sliderData:[],
    error:'',
    loading:true,
    currentSlide:0
};


function Slider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        (async() => {
            try {
                dispatch({type:ON_LOAD_DATA_START});
                const response = await fetch(props.url);
                const json = await response.json();
                dispatch({type:ON_LOAD_DATA_SUCCESS,data:json,slide:0});
            }catch (e) {
                dispatch({type:ON_LOAD_DATA_ERROR,error:e.message || 'Unexpected error'});
            }
        })();
    }, [props.url]);

    function prevSlide() {
        let slide = state.currentSlide-1;
        dispatch({type:ON_CHANGE_SLIDE,slide:slide<0 ? 0:slide});
    }
    function nextSlide() {
        let slide = state.currentSlide+1;
        dispatch({type:ON_CHANGE_SLIDE,slide:slide>state.sliderData.length-props.showItems ? state.sliderData.length-props.showItems:slide});
    }


    if (state.loading) {
        return <div>Loading</div>
    }

    if (state.error) {
        return <div style={{color: 'red'}}>ERROR: {state.error}</div>
    }

    return (
        <ThemeContext.Provider value={props.theme}>
            <div className={"sliderMainContainer "+props.theme}>
                <button onClick={prevSlide}>Prev</button>
                <SliderContent sliderData={state.sliderData} {...props} currentSlide={state.currentSlide}/>
                <button onClick={nextSlide}>Next</button>
            </div>
        </ThemeContext.Provider>
    );
}

export default Slider;