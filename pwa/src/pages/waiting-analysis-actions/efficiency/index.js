import _ from "lodash";
import { inject, observer } from "mobx-react";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    CompanyHeader,
    NextButton,
    TextArea,
    InputDatePicker,
} from "../../../components/atoms";
import { LoadingContainer, ModalComplex, RadioButtonGroup } from "../../../components/molecules";
import { ButtonMultiSelect, Header } from "../../../components/organisms";
import { getActionDetails, updateAnalysis } from "../../../services/endpoints/actions";
import { getEmployees } from "../../../services/endpoints/users";
import colors from "../../../styles/colors";
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    StyledForm,
} from "./styles";

const WaitingAnalysisActionsEfficiency = ({
    NewActionStore: { setNewActionData, reset },
    UserStore: { userId },
    PermissionStore: { hasPermission }
}) => {
    const history = useHistory();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [approved, setApproved] = useState(null);
    const [analysis, setAnalysis] = useState(null);
    const [date, setDate] = useState(new Date());
    const [responsible, setResponsible] = useState(null);
    const [userOptions, setUserOptions] = useState([]);
    const [actionDetails, setActionDetails] = useState(null);
    const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
    const [modalExitPage, setModalExitPage] = useState({ visible: false, path: null });

    const getData = useCallback(async () => {
        setLoading(true);

        const action = await getActionDetails(id);

        if (action) {
            const {
                responsibilityMatrix,
                effectiveness_analysis: {
                    valid,
                    responsibleUser,
                    description,
                    analysisDate
                }
            } = action;

            if (responsibilityMatrix && !responsibilityMatrix.includes(userId)) {
                toast.warning('O seu usu??rio n??o possu?? permiss??o para acessar essa pagin??');
                history.push('/action-plan');
            } else if (!_.isNull(valid)) {
                toast.warning('Essa a????o j?? foi analisada');
                history.push('/action-plan');
            } else {
                const { employees } = await getEmployees({ userPermission: 9 });

                setUserOptions(employees);
                setActionDetails(action);
                setResponsible(responsibleUser ? employees.find(user => user.id === responsibleUser) : null);
                setAnalysis(description ? description : null);
                setDate(analysisDate ? analysisDate : new Date());
                setLoading(false);
            }
        } else {
            history.push('/action-plan');
        }
    }, [id, userId, history]);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleSave = (items) => {
        setUserOptions([...items]);

        const userIndex = items.findIndex(item => item.selected);

        setResponsible(userIndex >= 0 ? { ...items[userIndex] } : null);
    };

    const handleSubmit = async () => {
        reset();

        if (approved === 1) {
            setSubmitLoading(true);

            const response = await updateAnalysis(id, {
                effectivenessAnalysis: {
                    approved: approved,
                    analysis: analysis,
                    responsible: responsible,
                    date: date,
                },
            });

            setSubmitLoading(false);

            if (response) {
                history.push('/action-plan');
            } else {
                setModalConfirmVisible(false);
            }
        } else {
            setSubmitLoading(true);

            const response = await updateAnalysis(id, {
                effectivenessAnalysis: {
                    approved: approved,
                    analysis: analysis,
                    responsible: responsible,
                    date: date,
                },
            });

            setSubmitLoading(false);

            if (response) {
                setNewActionData({
                    associations: [
                        {
                            improvementActionId: id,
                            typeRelationship: 1,
                            originDescription: actionDetails?.origin?.description
                        }
                    ],
                });

                history.push(`/new-action/type`);
            } else {
                setModalConfirmVisible(false);
            }
        }
    };

    return hasPermission(9) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={"An??lise da a????o"}
                    onClose={() => setModalExitPage({ visible: true, path: `/action-plan` })}
                />
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <Fragment>
                            <PageInfo>
                                <PageTitle>An??lise de efic??cia</PageTitle>
                                <PageDescription>Informe os detalhes</PageDescription>
                            </PageInfo>
                            <PageInfo>
                                <PageTitle>Avalia????o</PageTitle>
                                <PageDescription>Como voc?? avalia a efic??cia?</PageDescription>
                            </PageInfo>
                            <StyledForm initialData={{ analysis: analysis }}>
                                <RadioButtonGroup
                                    options={[
                                        {
                                            id: 1,
                                            label: "Validar a efic??cia",
                                        },
                                        {
                                            id: 2,
                                            label: "Reabrir a a????o",
                                        },
                                    ]}
                                    selected={approved}
                                    onSelect={(reference) =>
                                        setApproved(
                                            reference === approved ? null : reference
                                        )
                                    }
                                />
                                <TextArea
                                    placeholder={"Complemente com suas observa????es"}
                                    name="analysis"
                                    label={"An??lise"}
                                    onChange={(e) => setAnalysis(e.target.value)}
                                />
                                <ButtonMultiSelect
                                    labelSearchInput={'Dados do respons??vel'}
                                    fieldName={'Respons??vel pela an??lise'}
                                    pageTitle={'Respons??vel pela an??lise'}
                                    fieldsFilter={['name']}
                                    category={'user'}
                                    single={true}
                                    name={'responsible'}
                                    items={userOptions}
                                    selected={responsible?.id}
                                    onSave={handleSave}
                                />
                                <InputDatePicker
                                    name={"date"}
                                    label={"Data de an??lise"}
                                    initialValue={date}
                                    maxDate={new Date()}
                                    onChange={(date) => setDate(date)}
                                />
                            </StyledForm>
                        </Fragment>
                    )}
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => setModalExitPage({ visible: true, path: `/waiting-analysis-actions/${id}/action-details` })}
                    nextDisabled={
                        submitLoading
                        || loading
                        || approved === null
                        || responsible === null
                        || date === null
                        || analysis === null
                        || analysis === ''
                    }
                    onNext={() => setModalConfirmVisible(true)}
                    nextLabel={"Concluir"}
                />
            </Container>
            <ModalComplex
                title={"Concluir"}
                description={"Ao prosseguir, a an??lise ser?? conclu??da. Este ato n??o pode ser revertido. Tem certeza que deseja dar esta a????o como conclu??da?"}
                nameModal={"confirm"}
                visible={modalConfirmVisible}
                onCancel={() => setModalConfirmVisible(false)}
                onConfirm={handleSubmit}
                confirmButtonLoading={submitLoading}
                icon={<FaExclamationTriangle size={40} color={colors.blueAux} />}
                confirmButtonLabel={"Sim, concluir"}
                cancelButtonLabel={"N??o, cancelar"}
            />
            <ModalComplex
                title={"Aten????o"}
                description={"Ao sair, voc?? perdera todos os dados preenchidos. Este ato n??o pode ser revertido. Tem certeza que deseja sair?"}
                nameModal={"exit-page"}
                visible={modalExitPage.visible}
                onCancel={() => setModalExitPage({ visible: false, path: null })}
                onConfirm={() => history.push(modalExitPage.path)}
                icon={<FaExclamationTriangle size={40} color={"#FF5C69"} />}
                confirmButtonLabel={"Sair"}
                cancelButtonLabel={"Cancelar"}
            />
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject('NewActionStore', 'UserStore', 'PermissionStore')(
    observer(WaitingAnalysisActionsEfficiency)
);
