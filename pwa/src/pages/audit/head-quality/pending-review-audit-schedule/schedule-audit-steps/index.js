import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { FaArrowRight } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { NextButton, WhiteHeaderBack } from '../../../../../components/atoms';
import ItemListLargeGroup from '../../../../../components/molecules/items-list-large-group';
import ItemListSmallGroup from '../../../../../components/molecules/items-list-small-group';
import { filterAuditableRequirements } from '../../../../../services/transforms/audits';

import {
    Container,
    ContainerHeader,
    ContainerHeaderTitle,
    ContainerHeaderSubTitle,
    ContainerContent
} from './styles';

const SchedulePendentReviewResume = ({ Auditing }) => {
    const history = useHistory();

    const { setProgrammingInEditing } = Auditing;

    const { auditPendingReview = null } = history.location.state ?? {};

    const [fields, setFields] = useState([]);
    const [themes, setThemes] = useState([]);

    useEffect(() => {
        if (!auditPendingReview) {
            history.push('/audit/head-quality');
            return;
        }

        const {
            unity = {},
            calendarDateFormatted = '',
            auditors = [],
            auditorsLabel = ''
        } = auditPendingReview;

        const fieldsFormatted = [
            {
                label: auditors.length > 1 ? 'Auditores' : 'Auditor',
                value: auditorsLabel
            },
            {
                label: 'Localidade',
                value: unity?.fantasyName
            },
            {
                label: 'Data agendada',
                value: calendarDateFormatted
            }
        ];

        setFields(fieldsFormatted);
        setThemes(filterAuditableRequirements(auditPendingReview));
    }, [auditPendingReview, history]);

    const handleSubmit = async () => {
        setProgrammingInEditing(auditPendingReview);

        history.push('/audit/head-quality/pending-review/schedule/date');
    };

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
                            Área de atuação: {auditPendingReview.areaDescription}
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
                    onBack={history.goBack}
                    onNext={handleSubmit}
                    icon={<FaArrowRight />}
                    nextLabel={'Avançar'}
                />
            </Container>
        </>
    );
};

export default inject('Auditing')(observer(SchedulePendentReviewResume));
