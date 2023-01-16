import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { FaCheck, FaHome } from 'react-icons/fa';
import { useHistory } from 'react-router';
import {
    NextButton,
    SingleNextButton,
    WhiteHeaderBack
} from '../../../../../components/atoms';
import { CompletionSuccess } from '../../../../../components/molecules';
import ItemListLargeGroup from '../../../../../components/molecules/items-list-large-group';
import ItemListSmallGroup from '../../../../../components/molecules/items-list-small-group';
import { reschedule } from '../../../../../services/endpoints/audit/ses/reschedule';
import { filterAuditableRequirements } from '../../../../../services/transforms/audits';

import {
    Container,
    ContainerHeader,
    ContainerHeaderTitle,
    ContainerHeaderSubTitle,
    ContainerContent,
    ContainerSuccess
} from './styles';

const ScheduleResumeAudit = ({ Auditing }) => {
    const history = useHistory();

    const { programmingInEditing: audit, sourcePage = null, setProgrammingInEditing, setSourcePage } = Auditing;

    const [fields, setFields] = useState([]);
    const [themes, setThemes] = useState([]);

    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [completed, setCompleted] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoadingSubmit(true);

            const data = {
                auditors: audit.auditors,
                calendarDate: audit.calendarDate,
                startTime: audit.startTime,
                endTime: audit.endTime
            };

            const response = await reschedule(audit.id, data);

            setLoadingSubmit(false);

            if (response) {
                setCompleted(true);
            }
        } catch (error) {
            setLoadingSubmit(false);
        }
    };

    const handleRedirectSuccess = () => {
        history.push(sourcePage ? `/audit/${sourcePage}` : '/want-to-see');
        setProgrammingInEditing(null);
        setSourcePage(null);
    };

    useEffect(() => {
        if (!audit) {
            history.push(sourcePage ? `/audit/${sourcePage}` : '/want-to-see');
            return;
        }

        const {
            unity = {},
            auditors = [],
            auditorsLabel = '',
            calendarDateFormatted = '',
            startTime = '',
            endTime = ''
        } = audit;

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
        setThemes(filterAuditableRequirements(audit));
    }, [audit, history, sourcePage]);

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
                                Área de atuação: {audit?.areaDescription}
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

export default inject('Auditing')(observer(ScheduleResumeAudit));
