export const ON_LOAD_DATA_START = 'ON_LOAD_DATA_START';
export const ON_LOAD_DATA_SUCCESS = 'ON_LOAD_DATA_SUCCESS';
export const ON_LOAD_DATA_ERROR = 'ON_LOAD_DATA_ERROR';

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
                loading:false
            };
        case ON_LOAD_DATA_ERROR:
            return {
                sliderData:[],
                error:action.error,
                loading:false
            };
        default:
            throw new Error();
    }
}