import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import moment from '../../../../../../config/moment';
import {
    InputDatePicker,
    InputTime,
    NextButton,
    SingleNextButton,
    WhiteHeaderBack
} from '../../../../../../components/atoms';

import {
    Container,
    DatePicker,
    Times,
    StartTime,
    EndTime,
    Team,
    ContainerContent,
    ContainerSuccess
} from './styles';
import { FaHome, FaTimes } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import colors from '../../../../../../styles/colors';
import {
    CompletionSuccess,
    LoadingContainer,
    ModalComplex
} from '../../../../../../components/molecules';
import InputDefault from '../../../../../../components/atoms/input-default';
import { ButtonMultiSelect } from '../../../../../../components/organisms';
import { getEmployees } from '../../../../../../services/endpoints/users';
import { editAuditPendingReview } from '../../../../../../services/endpoints/audit/head-quality/edit-audit-pending-review';
import { Redirect } from 'react-router-dom';

const ScheduleDatesHeadQuality = ({ Auditing }) => {
    const history = useHistory();

    const { programmingInEditing: auditPendingReview = null, setProgrammingInEditing } = Auditing;

    const [loading, setLoading] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [completed, setCompleted] = useState(false);

    const [date, setDate] = useState(auditPendingReview?.calendarDate || new Date());
    const [startTime, setStartTime] = useState(auditPendingReview?.startTime || '');
    const [endTime, setEndTime] = useState(auditPendingReview?.endTime || '');
    const [valueContributors, setValueContributors] = useState(auditPendingReview?.numberEmployees || 0);
    const [usersResponsibleProcess, setUsersResponsibleProcess] = useState([]);

    const [alertHourInvalidModalVisible, setAlertHourInvalidModalVisible] = useState(false);
    const [exitModalVisible, setExitModalVisible] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoadingSubmit(true);

            const data = {
                responsibleProcess: usersResponsibleProcess.filter(item => item.selected),
                calendarDate: moment(date).format('YYYY-MM-DD'),
                startTime: startTime,
                endTime: endTime,
                numberEmployees: parseInt(valueContributors)
            };

            const response = await editAuditPendingReview(auditPendingReview.id, data);

            setLoadingSubmit(false);

            if (response) {
                setCompleted(true);
            }
        } catch (error) {
            setLoadingSubmit(false);
        }
    };

    const handleUsersResponsibleProcess = (itemsSelected = []) => {
        setUsersResponsibleProcess((oldState) => {
            const newState = oldState.map(user => {
                if (itemsSelected.find(item => item.id === user.id && item.selected === true)) {
                    return { ...user, selected: true };
                }

                return { ...user, selected: false };
            });

            return newState;
        });
    };

    const nextDisabled =
        !moment(date).isValid()
        || startTime.length < 5
        || endTime.length < 5
        || !(parseInt(valueContributors) >= 0)
        || loading
        || !(usersResponsibleProcess.filter(item => item.selected).length > 0)
        || loadingSubmit;

    useEffect(() => {
        if (nextDisabled) {
            return;
        }

        if (startTime >= endTime) {
            setAlertHourInvalidModalVisible(true);
            return;
        }
    }, [date, startTime, endTime, nextDisabled]);

    const getUsersResponsibleProcess = useCallback(async () => {
        const response = await getEmployees({ userPermission: 37 });

        if (response?.employees && Array.isArray(response.employees) && auditPendingReview?.responsibleProcess) {
            const users = response.employees.map(user => {
                const userIndex = auditPendingReview.responsibleProcess.findIndex(item => item.id === user.id)

                return { ...user, selected: userIndex !== -1 };
            });

            setUsersResponsibleProcess(users);
        }

        setLoading(false);
    }, [auditPendingReview?.responsibleProcess]);

    useEffect(getUsersResponsibleProcess, [getUsersResponsibleProcess]);

    if (completed) {
        return (
            <ContainerSuccess>
                <ContainerContent>
                    <CompletionSuccess
                        title={'Programação de auditoria editada com sucesso!'}
                        description={'Você será redirecionado para a tela inicial'}
                        redirectTime={5000}
                        fullscreen={completed}
                        redirectTo={() => {
                            history.push('/audit/head-quality');
                            setProgrammingInEditing(null);
                        }}
                    />
                </ContainerContent>
                <SingleNextButton
                    positionRelative={true}
                    onNext={() => {
                        history.push('/audit/head-quality');
                        setProgrammingInEditing(null);
                    }}
                    nextLabel={'Ir para início'}
                    icon={<FaHome />}
                />
            </ContainerSuccess>
        );
    } else {
        return auditPendingReview ? (
            <>
                <WhiteHeaderBack
                    title={'Programação de Auditoria'}
                    onBack={() => setExitModalVisible(true)}
                />
                <Container>
                    <ContainerContent>
                        {loading ? (
                            <LoadingContainer />
                        ) : (
                            <>
                                <DatePicker>
                                    <InputDatePicker
                                        name={'date'}
                                        label={'Data'}
                                        initialValue={date}
                                        clearIcon={<FaTimes color={colors.gray4_2} />}
                                        onChange={setDate}
                                    />
                                </DatePicker>
                                <Times>
                                    <StartTime>
                                        <InputTime
                                            name={'startTime'}
                                            label={'Hora de início'}
                                            placeholder={'00:00'}
                                            onChange={setStartTime}
                                            value={startTime}
                                        />
                                    </StartTime>
                                    <EndTime>
                                        <InputTime
                                            name={'endTime'}
                                            label={'Hora de término'}
                                            placeholder={'00:00'}
                                            onChange={setEndTime}
                                            value={endTime}
                                        />
                                    </EndTime>
                                </Times>
                                <Team>
                                    <InputDefault
                                        type={'number'}
                                        min={'0'}
                                        max={''}
                                        name={'contributors'}
                                        label={'Quant. de Colaboradores'}
                                        placeholder={'Nº de colaboradores'}
                                        onChange={(e) => {
                                            setValueContributors(e.target.value);
                                        }}
                                        value={valueContributors}
                                        width={'55%'}
                                        flexDirection={'column'}
                                    />
                                </Team>
                                <Team>
                                    <ButtonMultiSelect
                                        name={'team'}
                                        fieldName={'Responsáveis pelo processo'}
                                        pageTitle={'Selecionar responsáveis'}
                                        labelSearchInput={'Responsáveis pelo processo'}
                                        category={'checkbox'}
                                        fieldsFilter={['name']}
                                        single={false}
                                        items={usersResponsibleProcess}
                                        onSave={handleUsersResponsibleProcess}
                                        showSelectedInTag={false}
                                        placeholderSearchInput={'Digite para pesquisar'}
                                        placeholderInput={'Escolha os responsáveis'}
                                    />
                                </Team>
                            </>
                        )}
                    </ContainerContent>
                    <NextButton
                        positionRelative={true}
                        nextDisabled={nextDisabled || startTime >= endTime}
                        loading={loadingSubmit}
                        onBack={() => setExitModalVisible(true)}
                        onNext={handleSubmit}
                        nextLabel={'Avançar'}
                    />
                </Container>
                <ModalComplex
                    nameModal={'alert-modal-contributor-invalid'}
                    visible={alertHourInvalidModalVisible}
                    onConfirm={() => setAlertHourInvalidModalVisible(false)}
                    title={'Horas inválidas!'}
                    description={`A hora de término tem que ser maior que a hora de inicio`}
                    confirmButtonLabel={'Ok!'}
                    icon={<FiAlertCircle />}
                    uniqueFooterButton={true}
                    onCancel={() => setAlertHourInvalidModalVisible(false)}
                />
                <ModalComplex
                    nameModal={'alert-modal-exit'}
                    visible={exitModalVisible}
                    onConfirm={history.goBack}
                    onCancel={() => setExitModalVisible(false)}
                    title={'Atenção'}
                    description={'Ao sair, você perdera os dados dessa tela. Tem certeza que deseja sair?'}
                    confirmButtonLabel={'Sair'}
                    cancelButtonLabel={'Cancelar'}
                    icon={<FiAlertCircle />}
                />
            </>
        ) : <Redirect to={'/audit/head-quality'} />;
    }
};

export default inject('Auditing')(observer(ScheduleDatesHeadQuality));
