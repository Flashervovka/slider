export const ON_LOAD_DATA_START = 'ON_LOAD_DATA_START';
export const ON_LOAD_DATA_SUCCESS = 'ON_LOAD_DATA_SUCCESS';
export const ON_LOAD_DATA_ERROR = 'ON_LOAD_DATA_ERROR';
export const ON_CHANGE_SLIDE = 'ON_CHANGE_SLIDE';
export const ON_CHANGE_SLIDE_COMPLETED = 'ON_CHANGE_SLIDE_COMPLETED';

export function reducer(state, action) {
    let sd;
    switch (action.type) {
        case ON_LOAD_DATA_START:
            return {
                sliderData:[...state.sliderData],
                loading:true
            };

        case ON_LOAD_DATA_SUCCESS:
            sd = [...state.sliderData, ...action.data];
            return {
                sliderData:sd,
                loading:false,
                currentSlide:action.slide,
                sliderItemsData:sd.slice(action.slide,Math.min(parseInt(2*action.maxFadeItems)+parseInt(action.showItems),sd.length))
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
                sliderItemsData:[...state.sliderItemsData]
            };

        case ON_CHANGE_SLIDE_COMPLETED:
            sd = [...state.sliderData];
            let sid = sd.slice(state.currentSlide-1,Math.min(parseInt(2*action.maxFadeItems)+parseInt(action.showItems),sd.length))
            return {
                sliderData:[...state.sliderData],
                currentSlide:state.currentSlide,
                sliderItemsData:sid
            };
        default:
            throw new Error();
    }
}