export const ExamType = {
    ON_TAB_CHANGE: '@exam/ON_TAB_CHANGE',
    SET_SELECTED: '@exam/SET_SELECTED',
    ON_RESULT_CHANGE: '@exam/ON_RESULT_CHANGE',
    OPEN_MODAL_FILTER: '@exam/OPEN_MODAL_FILTER',
    CLOSE_MODAL: '@exam/CLOSE_MODAL',
    OPEN_MODAL_CHILDREN: '@exam/OPEN_MODAL_CHILDREN',
    CLOSE_MODAL_CHILDREN: '@exam/CLOSE_MODAL_CHILDREN',
    ON_RESET: '@exam/ON_RESET'
};

export const modalChildren = {
    visible: false,
    component: undefined
};

export const modal = {
    view: '',
    children: modalChildren
};

export const initialState = {
    tabs: [
        { name: 'treinamentos', label: 'Treinamentos' },
        { name: 'competencias', label: 'Competências' }
    ],
    currentTab: 0,
    reset: false,
    selected: undefined,
    result: undefined,
    modal
};

export const reducer = (state, { type, payload }) => {
    switch (type) {
        case ExamType.ON_TAB_CHANGE:
            return { ...state, currentTab: payload };
        case ExamType.SET_SELECTED:
            return {
                ...state,
                selected: payload,
                modal: {
                    ...state.modal,
                    view: 'questions'
                }
            };
        case ExamType.ON_RESULT_CHANGE:
            return {
                ...state,
                result: payload,
                modal: {
                    ...state.modal,
                    view: 'results'
                }
            };
        case ExamType.OPEN_MODAL_FILTER:
            return { ...state, modal: { ...state.modal, view: 'filters' } };
        case ExamType.OPEN_MODAL_CHILDREN:
            return {
                ...state,
                modal: {
                    ...state.modal,
                    children: { visible: true, component: undefined }
                }
            };
        case ExamType.CLOSE_MODAL_CHILDREN:
            return {
                ...state,
                modal: { ...state.modal, children: modalChildren }
            };
        case ExamType.ON_RESET:
            return {
                ...state,
                reset: true,
                modal: { ...state.modal, view: 'questions' }
            };
        case ExamType.CLOSE_MODAL:
            return {
                ...state,
                selected: undefined,
                result: undefined,
                modal
            };
        default:
            return state;
    }
};
