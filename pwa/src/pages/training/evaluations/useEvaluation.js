import { useObserver } from 'mobx-react';
import * as React from 'react';

import { stores } from '../../../mobx';
import { handleDate } from '../common';
import { TrainingContext } from '../context';
import * as Actions from './actions';
import { ExamType, initialState, reducer } from './service';

const useEvaluation = () => {
    const formRef = React.useRef();

    const [formData, setformData] = React.useState();
    const [{ selected, modal, tabs, currentTab, ...rest }, dispatch] =
        React.useReducer(reducer, initialState);

    const {
        exams: { provas, filtros, getProvasRequest, patchProvaRequest },
        fetch
    } = React.useContext(TrainingContext);

    const {
        TrainingExamsStore: { resetPatchProvasRequest }
    } = useObserver(() => stores);

    const onSubmit = React.useCallback(
        async (respostas) => {
            await fetch(
                Actions.patchExam(
                    { status: 3, realizado: true, respostas },
                    selected.codigo
                )
            );
        },
        [fetch, selected]
    );

    const onFilterSubmit = React.useCallback(
        (data) => {
            fetch(
                Actions.getExamsByFilter({
                    tipo: tabs[currentTab].name,
                    nome: data[tabs[currentTab].name] || '[]',
                    periodo: `[${handleDate(data.initialDate)}, ${handleDate(
                        data.endDate
                    )}]`
                })
            );
        },
        [fetch, tabs, currentTab]
    );

    const handleFormData = React.useCallback(() => {
        setformData({
            [tabs[currentTab].name]: filtros[tabs[currentTab].name].map(
                (name) => ({ name, id: name })
            ),
            initialDate: [{ name: 'initialDate', id: 'initialDate' }],
            endDate: [{ name: 'endDate', id: 'endDate' }]
        });
    }, [filtros, tabs, currentTab]);

    React.useEffect(() => {
        const onStart = async () => {
            await fetch(Actions.getExamsFilters());
            await fetch(Actions.getExams());
        };

        onStart();
    }, [fetch]);

    React.useEffect(() => {
        if (filtros) handleFormData();
    }, [handleFormData, filtros]);

    React.useEffect(() => {
        if (formData && formRef.current)
            Object.keys(formData).map((key) =>
                formRef.current.setData({
                    [key]: JSON.stringify(
                        formData[key]
                            .filter(({ selected }) => selected)
                            .map(({ id }) => id)
                    )
                })
            );
    }, [formData, filtros]);

    React.useEffect(() => {
        if (!modal.view) resetPatchProvasRequest();
    }, [resetPatchProvasRequest, modal]);

    React.useEffect(() => {
        if (patchProvaRequest.success && selected) {
            setTimeout(() => {
                dispatch({
                    type: ExamType.ON_RESULT_CHANGE,
                    payload: provas[tabs[currentTab].name].find(
                        ({ questionario }) =>
                            questionario.codigo === selected.codigo
                    )
                });
            }, 1000);
        }
    }, [patchProvaRequest, provas, selected, tabs, currentTab]);

    React.useEffect(() => {
        if (getProvasRequest.success) dispatch({ type: ExamType.CLOSE_MODAL });
    }, [getProvasRequest, dispatch]);

    return {
        provas,
        getProvasRequest,
        patchProvaRequest,
        dispatch,
        onSubmit,
        filtros,
        selected,
        modal,
        tabs,
        currentTab,
        formData,
        setformData,
        formRef,
        onFilterSubmit,
        ...rest
    };
};

export default useEvaluation;
