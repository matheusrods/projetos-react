import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

import useEvaluation from './useEvaluation';
import styles from './styles';
import {
    Title,
    Container,
    TrainingModal,
    // DivisorBottomSheet,
    TrainingModalViews
} from '../common';
import { FloatingActionButton, Loading } from '../../../components/atoms';
import { EvaluationsFilters, EvaluationsTabs } from './components';
import { ModalComplex } from '../../../components/molecules';
import { ExamType } from './service';

const Evaluation = () => {
    const state = useEvaluation();

    if (!state.getProvasRequest.success)
        return <Loading label="Carregando treinamentos" />;

    return (
        <>
            <Container>
                <Title>Teste seus conhecimentos</Title>
            </Container>

            <EvaluationsTabs
                tabs={state.tabs}
                panels={state.provas}
                tab={state.currentTab}
                settab={(payload) =>
                    state.dispatch({ type: ExamType.ON_TAB_CHANGE, payload })
                }
                onClick={(payload) =>
                    state.dispatch({ type: ExamType.SET_SELECTED, payload })
                }
            />

            <Container>
                <FloatingActionButton
                    onClick={() =>
                        state.dispatch({ type: ExamType.OPEN_MODAL_FILTER })
                    }
                    {...styles.floatingButton}
                />
            </Container>

            <TrainingModal
                visible={state.modal.view}
                title={`Siemens`}
                subtitle={`Treinamentos`}
                onClick={() =>
                    state.modal.children.visible
                        ? state.dispatch({ type: ExamType.CLOSE_MODAL })
                        : state.dispatch({ type: ExamType.OPEN_MODAL_CHILDREN })
                }
                withHeader={state.modal.view !== 'filters'}
            >
                <TrainingModalViews
                    selected={state.selected}
                    onSubmit={state.onSubmit}
                    patchProvaRequest={state.patchProvaRequest}
                    result={state.result}
                    onClose={() =>
                        state.dispatch({ type: ExamType.CLOSE_MODAL })
                    }
                    reset={state.reset}
                    setreset={() => state.dispatch({ type: ExamType.ON_RESET })}
                    modalView={state.modal.view}
                    filters={
                        <EvaluationsFilters
                            formData={state.formData}
                            setformData={state.setformData}
                            formRef={state.formRef}
                            name={state.tabs[state.currentTab].name}
                            onFilterSubmit={state.onFilterSubmit}
                            onClose={() =>
                                state.dispatch({ type: ExamType.CLOSE_MODAL })
                            }
                            pending={state.getProvasRequest.pending}
                        />
                    }
                />

                <ModalComplex
                    nameModal={'evaluation-alert-modal'}
                    visible={state.modal.children.visible}
                    onConfirm={() =>
                        state.modal.children.component
                            ? state.dispatch({ type: ExamType.CLOSE_MODAL })
                            : state.dispatch({
                                  type: ExamType.CLOSE_MODAL_CHILDREN
                              })
                    }
                    onCancel={() =>
                        state.dispatch({ type: ExamType.CLOSE_MODAL })
                    }
                    title={'Atenção'}
                    description="A auto-avaliação não foi finalizada! Você realmente deseja fechar ou continuar?"
                    confirmButtonLabel={
                        state.modal.children.component
                            ? 'Ok, entendi'
                            : 'Continuar'
                    }
                    cancelButtonLabel={'Fechar'}
                    icon={<FiAlertCircle />}
                    uniqueFooterButton={state.modal.children.component}
                    // children={
                    //     modal.children && (
                    //         <DivisorBottomSheet
                    //             title="Saiba mais"
                    //             children={() => (
                    //                 <Text>{selected?.questoes[step - 1].dica}</Text>
                    //             )}
                    //         />
                    //     )
                    // }
                />
            </TrainingModal>
        </>
    );
};

export default Evaluation;
