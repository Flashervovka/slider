import React, {useEffect, useReducer} from 'react';
import {reducer,
    ON_LOAD_DATA_ERROR,
    ON_LOAD_DATA_SUCCESS,
    ON_LOAD_DATA_START,
    ON_CHANGE_SLIDE,
    ON_CHANGE_SLIDE_COMPLETED} from './reducer';
import SliderContent from './components/slidercontent';
import ThemeContext from './themecontext';



const initialState = {
    sliderData:[],/*все полученные данные*/
    error:'',/*ошибка*/
    loading:true,/*флаг загрузки*/
    currentSlide:0,/*текущий слайд*/
    sliderItemsData:[]/*отображаемые данные*//*,
    showItems:1,/*количество показываемых слайдов
    maxFadeItems:1/*максимальное количество скрытых элементов слева и справа от показываемых слайдов*/
};


function Slider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        (async() => {
            try {
                dispatch({type:ON_LOAD_DATA_START});
                const response = await fetch(props.url);
                const json = await response.json();
                dispatch({type:ON_LOAD_DATA_SUCCESS,data:json,slide:0,maxFadeItems:props.maxFadeItems,showItems:props.showItems});
            }catch (e) {
                dispatch({type:ON_LOAD_DATA_ERROR,error:e.message || 'Unexpected error'});
            }
        })();
    }, [props.url,props.maxFadeItems,props.showItems]);

    function prevSlide() {
        let slide = state.currentSlide-1;
        dispatch({type:ON_CHANGE_SLIDE,slide:slide<0 ? 0:slide});
    }

    function nextSlide() {
        let slide = state.currentSlide+1;
        dispatch({
            type:ON_CHANGE_SLIDE,
            slide:slide>state.sliderItemsData.length-props.showItems ? state.sliderItemsData.length-props.showItems:slide
        });
    }

    function onChangeSlideCompleted() {
       // dispatch({type:ON_CHANGE_SLIDE_COMPLETED,maxFadeItems:props.maxFadeItems,showItems:props.showItems});
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
                <SliderContent sliderData={state.sliderItemsData} {...props} currentSlide={state.currentSlide} onChangeSlideCompleted={onChangeSlideCompleted}/>
                <button onClick={nextSlide}>Next</button>
            </div>
        </ThemeContext.Provider>
    );
}

export default Slider;