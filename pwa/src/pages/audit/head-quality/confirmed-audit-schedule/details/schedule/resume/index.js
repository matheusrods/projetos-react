import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FaCheck, FaHome } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { editConfirmedAudit } from '../../../../../../../services/endpoints/audit/head-quality/edit-confirmed-audit';
import {
    NextButton,
    SingleNextButton,
    WhiteHeaderBack
} from '../../../../../../../components/atoms';
import { CompletionSuccess } from '../../../../../../../components/molecules';
import ItemListLargeGroup from '../../../../../../../components/molecules/items-list-large-group';
import ItemListSmallGroup from '../../../../../../../components/molecules/items-list-small-group';
import { filterAuditableRequirements } from '../../../../../../../services/transforms/audits';

import {
    Container,
    ContainerHeader,
    ContainerHeaderTitle,
    ContainerHeaderSubTitle,
    ContainerContent,
    ContainerSuccess
} from './styles';

const ScheduleResumeAuditHeadQuality = ({ Auditing }) => {
    const history = useHistory();

    const { programmingInEditing: confirmedAudit, setProgrammingInEditing } = Auditing;

    const [fields, setFields] = useState([]);
    const [themes, setThemes] = useState([]);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoadingSubmit(true);

            const data = {
                auditors: confirmedAudit.auditors,
                calendarDate: confirmedAudit.calendarDate,
                startTime: confirmedAudit.startTime,
                endTime: confirmedAudit.endTime
            };

            const response = await editConfirmedAudit(confirmedAudit.id, data);

            setLoadingSubmit(false);

            if (response) {
                setCompleted(true);
            }
        } catch (error) {
            setLoadingSubmit(false);
        }
    };

    const handleRedirectSuccess = () => {
        history.push('/audit/head-quality')
        setProgrammingInEditing(null);
    };

    useEffect(() => {
        if (!confirmedAudit) {
            history.push('/audit/head-quality');
            return;
        }

        const {
            unity = {},
            auditors = [],
            auditorsLabel = '',
            calendarDateFormatted = '',
            startTime = '',
            endTime = ''
        } = confirmedAudit;

        const fieldsFormatted = [
            {
                label: auditors.length > 1 ? 'Auditores' : 'Auditor',
                value: auditorsLabel
            },
            {
                label: 'Localidade',
                value: unity.fantasyName
            },
            {
                label: 'Data agendada',
                value: `${calendarDateFormatted} (${startTime}-${endTime})`
            }
        ];

        setFields(fieldsFormatted);
        setThemes(filterAuditableRequirements(confirmedAudit));
    }, [confirmedAudit, history]);

    if (completed) {
        return (
            <ContainerSuccess>
                <ContainerContent>
                    <CompletionSuccess
                        title={'Programação de auditoria reagendada com sucesso!'}
                        description={'Você será redirecionado para a tela inicial'}
                        redirectTime={5000}
                        fullscreen={completed}
                        redirectTo={handleRedirectSuccess}
                    />
                </ContainerContent>
                <SingleNextButton
                    positionRelative={true}
                    onNext={handleRedirectSuccess}
                    nextLabel={'Ir para início'}
                    icon={<FaHome />}
                />
            </ContainerSuccess>
        );
    } else {
        return (
            <>
                <WhiteHeaderBack
                    title={'Programação de Auditoria'}
                    onBack={history.goBack}
                />
                <Container>
                    <ContainerContent>
                        <ContainerHeader>
                            <ContainerHeaderTitle>
                                Área de atuação: {confirmedAudit.areaDescription}
                            </ContainerHeaderTitle>
                            <ContainerHeaderSubTitle>
                                Revise as informações do escopo antes de
                                confirmar a auditoria
                            </ContainerHeaderSubTitle>
                        </ContainerHeader>
                        <ItemListLargeGroup data={fields} />
                        <ItemListSmallGroup data={themes} />
                    </ContainerContent>
                    <NextButton
                        positionRelative={true}
                        nextDisabled={loadingSubmit}
                        loading={loadingSubmit}
                        onBack={history.goBack}
                        onNext={handleSubmit}
                        icon={<FaCheck />}
                        nextLabel={'Finalizar'}
                    />
                </Container>
            </>
        );
    }
};

export default inject('Auditing')(observer(ScheduleResumeAuditHeadQuality));
