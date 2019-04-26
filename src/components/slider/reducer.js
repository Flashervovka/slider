export const ON_LOAD_DATA_START = 'ON_LOAD_DATA_START';
export const ON_LOAD_DATA_SUCCESS = 'ON_LOAD_DATA_SUCCESS';
export const ON_LOAD_DATA_ERROR = 'ON_LOAD_DATA_ERROR';
export const ON_CHANGE_SLIDE = 'ON_CHANGE_SLIDE';

export function reducer(state, action) {
    switch (action.type) {
        case ON_LOAD_DATA_START:
            return {
                sliderData:[...state.sliderData],
                loading:true
            };

        case ON_LOAD_DATA_SUCCESS:
            return {
                sliderData:[...state.sliderData, ...action.data],
                loading:false,
                currentSlide:action.slide
            };
        case ON_LOAD_DATA_ERROR:
            return {
                sliderData:[],
                error:action.error,
                loading:false
            };

        case ON_CHANGE_SLIDE:
            return {
                sliderData:[...state.sliderData],
                currentSlide:action.slide,
            };
        default:
            throw new Error();
    }
}