// eslint-disable-next-line no-unused-vars
import React, { useCallback, useEffect, useState } from 'react';
import moment from '../../../../../../config/moment';
import { useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import { getAuditors } from '../../../../../../services/endpoints/audit/auditors';
import { getProgrammingAudits } from '../../../../../../services/endpoints/audit/programming-audits';
import {
    InputDatePicker,
    InputTime,
    NextButton,
    WhiteHeaderBack
} from '../../../../../../components/atoms';
import {
    Container,
    DatePicker,
    Times,
    StartTime,
    EndTime,
    Team,
    ContainerContent
} from './styles';
import { FaTimes } from 'react-icons/fa';
import colors from '../../../../../../styles/colors';
import { ButtonMultiSelect } from '../../../../../../components/organisms';
import { LoadingContainer, ModalComplex } from '../../../../../../components/molecules';
import { FiAlertCircle } from 'react-icons/fi';
import { replaceSpecialChars } from '../../../../../../utils/helpers';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

const ScheduleAuditHeadQuality = ({ Auditing, UserStore }) => {
    const history = useHistory();

    const { programmingInEditing: confirmedAudit, setProgrammingInEditing } = Auditing;
    const { user } = UserStore;

    const [loading, setLoading] = useState(true);

    const [auditors, setAuditors] = useState([]);

    const [date, setDate] = useState(confirmedAudit?.calendarDate || new Date());
    const [startTime, setStartTime] = useState(confirmedAudit?.startTime || '');
    const [endTime, setEndTime] = useState(confirmedAudit?.endTime || '');
    const [selectedPeoplesTeam, setSelectedPeoplesTeam] = useState(confirmedAudit?.auditors || []);

    const [auditorsWithAgendaAvailable, setAuditorsWithAgendaAvailable] = useState([]);

    const [alertHourInvalidModalVisible, setAlertHourInvalidModalVisible] = useState(false);
    const [exitModalVisible, setExitModalVisible] = useState(false);

    const shouldDisableSelect = !moment(date).isValid() || startTime.length < 5 || endTime.length < 5;

    const handleSubmit = () => {
        const auditors = auditorsWithAgendaAvailable
            .filter(auditor => auditor.selected)
            .map(({ id, name }) => ({ id, name }));

        const auditorsLabel = auditors.reduce((previous, current, currentIndex) => {
            if (currentIndex === 0) {
                return current.name;
            }

            return `${previous}, ${current.name}`;
        }, '');

        const newConfirmedAudit = {
            ...confirmedAudit,
            auditors,
            auditorsLabel,
            calendarDate: moment(date).format('YYYY-MM-DD'),
            calendarDateFormatted: moment(date).format('DD/MM/YYYY'),
            startTime: startTime,
            endTime: endTime
        };

        setProgrammingInEditing(newConfirmedAudit);

        history.push('schedule/resume');
    };

    const handleSaveTeam = async (items) => {
        const selectedAuditors = items.filter((item) => item.selected);

        if (selectedAuditors.length === 0) {
            setSelectedPeoplesTeam([]);
            return;
        }

        const isConflicted = selectedAuditors.map((auditor) => {
            const fetch = getProgrammingAudits({
                codigo_unidade: user.clientId,
                data_agenda: moment(date).format('YYYY-MM-DD'),
                codigo_auditor: auditor.id
            });

            return fetch;
        });

        const [response] = await Promise.all(isConflicted);

        const { programacoes = [] } = response;

        const sameAudit = programacoes.filter((item) => item.codigo !== confirmedAudit.id);

        if (!sameAudit.length) {
            setSelectedPeoplesTeam(selectedAuditors);
            return;
        }

        toast.warn('Já existe uma programação para essa data com um dos auditores selecionados');
    };

    const nextDisabled = () => {
        return !moment(date).isValid() || startTime.length < 5 || endTime.length < 5 || auditorsWithAgendaAvailable.filter(item => item.selected).length === 0 || loading;
    };

    const fetchAuditors = useCallback(async () => {
        const data = await getAuditors(user.clientId);

        setAuditors(data);
        setLoading(false);
    }, [user]);

    useEffect(() => {
        if (shouldDisableSelect) {
            return;
        }

        if (startTime >= endTime) {
            setAlertHourInvalidModalVisible(true);
            return;
        }

        const verifyAuditorSchedule = () => {
            const auditorsAvailableOnThisDay = [];
            const weekDay = replaceSpecialChars(moment(date).format('ddd'));

            auditors.forEach((auditor) => {
                const schedule = auditor.schedule.filter((period) => period.weekDays.includes(weekDay));

                if (schedule.length > 0) {
                    auditorsAvailableOnThisDay.push({
                        ...auditor,
                        availableSchedule: schedule
                    });
                }
            });

            const minutesStart = (Number(startTime.split(':')[0]) * 60) + Number(startTime.split(':')[1]);
            const minutesEnd = (Number(endTime.split(':')[0]) * 60) + Number(endTime.split(':')[1]);

            const auditorsAvailableOnThisDateTime =
                auditorsAvailableOnThisDay.map((auditor) => {
                    const isAvailable = auditor.availableSchedule.filter((period) =>
                        minutesStart > period.startTimeNumber && minutesEnd < period.endTimeNumber
                    );

                    const disabled = isAvailable.length > 0 ? false : true;
                    const selected = !disabled && selectedPeoplesTeam.find(item => item.id === auditor.id) ? true : false;

                    return { ...auditor, disabled, selected };
                });

            return auditorsAvailableOnThisDateTime;
        };

        setAuditorsWithAgendaAvailable(verifyAuditorSchedule());
    }, [shouldDisableSelect, date, auditors, startTime, endTime, selectedPeoplesTeam]);

    useEffect(() => fetchAuditors(), [fetchAuditors]);

    return confirmedAudit ? (
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
                                <ButtonMultiSelect
                                    name={'team'}
                                    fieldName={'Equipe de Auditoria'}
                                    pageTitle={'Selecionar Equipe'}
                                    labelSearchInput={'Equipe de Auditoria'}
                                    category={'checkbox'}
                                    fieldsFilter={['name']}
                                    single={false}
                                    items={auditorsWithAgendaAvailable}
                                    onSave={handleSaveTeam}
                                    disabled={shouldDisableSelect}
                                />
                            </Team>
                        </>
                    )}
                </ContainerContent>
                <NextButton
                    positionRelative={true}
                    nextDisabled={nextDisabled() || startTime >= endTime}
                    onBack={() => setExitModalVisible(true)}
                    onNext={handleSubmit}
                    nextLabel={'Avançar'}
                />
            </Container>
            <ModalComplex
                nameModal={'alert-modal-hour-invalid'}
                visible={alertHourInvalidModalVisible}
                onConfirm={() => setAlertHourInvalidModalVisible(false)}
                title={'Horas inválidas!'}
                description={'A hora de término tem que ser maior que a hora de inicio'}
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
};

export default inject('Auditing', 'UserStore')(observer(ScheduleAuditHeadQuality));
