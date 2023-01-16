import React, {useEffect, useState} from 'react';
import {
    Content,
    PageDescription,
    Wrapper
} from './styles';
import {inject, observer} from "mobx-react";
import {SideModal, WhiteHeader} from "../../../../../../components/atoms";
import colors from "../../../../../../styles/colors";
import {ButtonMultiSelect, ConfirmCancelFooter} from "../../../../../../components/organisms";
import {FaExclamationTriangle} from "react-icons/fa";
import {ModalComplex} from "../../../../../../components/molecules";

const LinkImprovementActions = ({
    onClose,
    visible,
    onConfirm,
    InspectionQuestionsStore
}) => {
    const [questionsList, setQuestions] = useState([]);
    const [actionsList, setActionsList] = useState([]);
    const [modalAlert, setModalAlert] = useState(false);


    const {
        getAllQuestions,
        getActionsList
    } = InspectionQuestionsStore;

    const onConfirmClick = () => {
        const selectedQuestions = questionsList.filter(question => question.selected);
        const selectedActions = actionsList.filter(action => action.selected);
        if(selectedQuestions.length > 0 && selectedActions.length > 0) {
            onConfirm(selectedQuestions[0].id, selectedActions[0].id);
        }else{
            setModalAlert(true);
        }
    };

    useEffect(() => {
        async function fetchData() {
            await getAllQuestions().then(questions => {
                for (const question of questions) {
                    setQuestions(questionsList => [...questionsList, {
                        id: question.id,
                        name: `${question.title} - ${question.question}`,
                    }]);
                }

            });
            await getActionsList().then(res => {
                setActionsList(res.actions);
            });
        }
        fetchData();
    }, [getAllQuestions, getActionsList]);

    return (
        <SideModal visible={visible} top={0}>
            <WhiteHeader title={'Vincular ação'} onClose={onClose} />
            <Content>
                <PageDescription>Selecione uma ação pré-existente para vincular esta tratativa</PageDescription>
                <Wrapper>
                    <ButtonMultiSelect
                        pageTitle={'Vincular ação de melhoria'}
                        fieldName={'Item Questão'}
                        category={'checkbox'}
                        name={'select-question'}
                        fieldsFilter={['id', 'label']}
                        labelSearchInput={'Buscar item questão'}
                        single={true}
                        items={questionsList}
                        onSave={(items) => setQuestions([...items])}
                        top={0}
                    />
                </Wrapper>

                <Wrapper>
                    <ButtonMultiSelect
                        pageTitle={'Vincular ação de melhoria'}
                        fieldName={'Buscar ação'}
                        category={'action'}
                        name={'select-action'}
                        fieldsFilter={['id', 'origin.description']}
                        labelSearchInput={'Buscar ação'}
                        fieldUseTag={'id'}
                        prefixTag={'#'}
                        single={true}
                        items={actionsList}
                        onSave={(items) => setActionsList([...items])}
                        top={0}
                    />
                </Wrapper>

                <ModalComplex
                    title={'Atenção'}
                    description={'Selecione o item questão e a ação de melhoria para criar um vínculo entre eles.'}
                    nameModal={'exit-page'}
                    visible={modalAlert}
                    onCancel={() => setModalAlert(false)}
                    onConfirm={() => setModalAlert(false)}
                    icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                    confirmButtonLabel={'Ok'}
                    uniqueFooterButton={true}
                />

            </Content>
            <ConfirmCancelFooter
                confirmButtonLabel={'Adicionar'}
                cancelButtonLabel={'Cancelar'}
                cancelButtonLabelColor={colors.gray6}
                onCancel={onClose}
                onConfirm={() => onConfirmClick()}
                confirmButtonDisabled={false}
            />
        </SideModal>
    );
};

export default inject('HomeInspectionStore', 'InspectionQuestionsStore')(observer(LinkImprovementActions));
