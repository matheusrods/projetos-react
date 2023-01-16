import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { LoadingContainer, ModalComplex, RadioButtonGroup } from '../../../components/molecules';
import { ButtonMultiSelect, Header } from '../../../components/organisms';
import { getActionDetails, updateAnalysis } from '../../../services/endpoints/actions';
import { getEmployees } from '../../../services/endpoints/users';
import {
    CompanyHeader,
    NextButton,
    TextArea,
    InputDatePicker,
} from '../../../components/atoms';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    StyledForm,
} from './styles';
import { toast } from 'react-toastify';
import { FaExclamationTriangle } from 'react-icons/fa';

const WaitingAnalysisActionsImplementation = ({
    UserStore: { userId },
    PermissionStore: { hasPermission },
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
    const [modalExitPage, setModalExitPage] = useState({ visible: false, path: null });

    const getData = useCallback(async () => {
        setLoading(true);

        const action = await getActionDetails(id);

        if (action) {
            const {
                responsibilityMatrix,
                implementation_analysis:
                {
                    valid,
                    responsibleUser,
                    description,
                    analysisDate
                }
            } = action;

            if (responsibilityMatrix && !responsibilityMatrix.includes(userId)) {
                toast.warning('O seu usuário não possuí permissão para acessar essa paginá');
                history.push('/action-plan');
            } else if(valid === true) {
                toast.warning('Essa ação já foi analisada');
                history.push('/action-plan');
            } else {
                const { employees } = await getEmployees({ userPermission: 8 });

                setUserOptions(employees);
                setApproved(valid === true ? 1 : valid === false ? 2 : null);
                setResponsible(responsibleUser ? employees.find(user => user.id === responsibleUser) : null);
                setAnalysis(description ? description : null);
                setDate(analysisDate ? analysisDate : new Date());
                setLoading(false);
            }
        } else {
            history.push('/action-plan');
        }
    }, [history, id, userId]);

    useEffect(() => {
        getData();
    }, [getData]);

    const handleSave = (items) => {
        setUserOptions([...items]);

        const userIndex = items.findIndex(item => item.selected);

        setResponsible(userIndex >= 0 ? { ...items[userIndex] } : null);
    };

    const handleSubmit = async () => {
        setSubmitLoading(true);

        const response = await updateAnalysis(id, {
            implementationAnalysis: {
                approved: approved,
                analysis: analysis,
                responsible: responsible,
                date: date,
            },
        });

        setSubmitLoading(false);

        if (response) {
            history.push('/action-plan');
        }
    };

    return hasPermission(8) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    typeAction={'Análise da ação'}
                    onClose={() => setModalExitPage({ visible: true, path: `/action-plan` })}
                    positionRelative={true}
                />
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <Fragment>
                            <PageInfo>
                                <PageTitle>Análise de implementação</PageTitle>
                                <PageDescription>Informe os detalhes</PageDescription>
                            </PageInfo>
                            <PageInfo>
                                <PageTitle>Avaliação</PageTitle>
                                <PageDescription>Como você avalia a implementação?</PageDescription>
                            </PageInfo>
                            <StyledForm initialData={{ analysis: analysis }}>
                                <RadioButtonGroup
                                    options={[
                                        {
                                            id: 1,
                                            label: 'Validar a implementação',
                                        },
                                        {
                                            id: 2,
                                            label: 'Reabrir a ação',
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
                                    placeholder={'Complemente com suas observações'}
                                    name={'analysis'}
                                    label={'Análise'}
                                    onChange={(e) => setAnalysis(e.target.value)}
                                />
                                <ButtonMultiSelect
                                    labelSearchInput={'Dados do responsável'}
                                    fieldName={'Responsável pela análise'}
                                    pageTitle={'Responsável pela análise'}
                                    fieldsFilter={['name']}
                                    category={'user'}
                                    single={true}
                                    name={'responsible'}
                                    items={userOptions}
                                    selected={responsible?.id}
                                    onSave={handleSave}
                                />
                                <InputDatePicker
                                    name={'date'}
                                    label={'Data de análise'}
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
                    loading={submitLoading}
                    nextDisabled={
                        submitLoading
                        || loading
                        || approved === null
                        || responsible === null
                        || date === null
                        || analysis === null
                        || analysis === ''
                    }
                    onNext={handleSubmit}
                    nextLabel={'Concluir'}
                />
            </Container>
            <ModalComplex
                title={"Atenção"}
                description={"Ao sair, você perdera todos os dados preenchidos. Este ato não pode ser revertido. Tem certeza que deseja sair?"}
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

export default inject('UserStore', 'PermissionStore')(
    observer(WaitingAnalysisActionsImplementation)
);
