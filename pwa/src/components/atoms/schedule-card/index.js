import { inject } from 'mobx-react';
import React from 'react';
import moment from 'moment';
import colors from '../../../styles/colors';
import {
    Container,
    FlexColumn,
    ScheduleCardText,
    ScheduleCardIconHolder,
    AreaType,
    DetailsButton,
    CheckIcon,
    ClockIcon,
    AngleRightIcon
} from './styles';

function ScheduleCard({ audit, onClickDetails, PermissionStore: { userProfileType } }) {
    if (audit?.status === 'done') {
        return (
            <Container
                backgroundColor={colors.greenLight}
                borderColor={userProfileType() === 'ses' ? audit?.statusSes.color : audit?.statusHeadQuality.color}
            >
                <FlexColumn>
                    <ScheduleCardText>Auditoria</ScheduleCardText>
                    <ScheduleCardIconHolder>
                        <CheckIcon />
                    </ScheduleCardIconHolder>
                </FlexColumn>
                <AreaType>
                    Área de Atuação: {audit?.areaDescription ?? 'Não informado'}
                </AreaType>
                <ScheduleCardText>
                    { audit?.auditors.length === 1 ? 'Auditor' : 'Auditores' }: {audit?.auditorsLabel}
                </ScheduleCardText>
                <ScheduleCardText>
                    Localidade: {audit?.unity?.fantasyName ?? 'Não informado'}
                </ScheduleCardText>
                <ScheduleCardText>
                    Data: {moment(audit?.calendarDate).format('DD/MM/YYYY') ?? 'Não informado'}
                </ScheduleCardText>
                <FlexColumn>
                    <ScheduleCardText>
                        Horário: {audit?.startTime ? audit?.startTime + ` - ` + audit?.endTime : 'Não informado'}
                    </ScheduleCardText>
                    <DetailsButton onClick={() => onClickDetails()}>
                        Ver Detalhes
                        <AngleRightIcon />
                    </DetailsButton>
                </FlexColumn>
            </Container>
        );
    }

    return (
        <Container
            backgroundColor={colors.blueLight}
            borderColor={userProfileType() === 'ses' ? audit?.statusSes.color : audit?.statusHeadQuality.color}
        >
            <FlexColumn>
                <ScheduleCardText>Auditoria</ScheduleCardText>
                <ScheduleCardIconHolder>
                    <ClockIcon />
                </ScheduleCardIconHolder>
            </FlexColumn>
            <AreaType>
                Área de Atuação: {audit?.areaDescription ?? 'Não informado'}
            </AreaType>
            <ScheduleCardText>
                { audit?.auditors.length === 1 ? 'Auditor' : 'Auditores' }: {audit?.auditorsLabel}
            </ScheduleCardText>
            <ScheduleCardText>
                Localidade: {audit?.unity?.fantasyName ?? 'Não informado'}
            </ScheduleCardText>
            <ScheduleCardText>
                Data: {moment(audit?.calendarDate).format('DD/MM/YYYY') ?? 'Não informado'}
            </ScheduleCardText>
            <FlexColumn>
                <ScheduleCardText>
                    Horário: {audit?.startTime ? audit?.startTime + ` - ` + audit?.endTime : 'Não informado'}
                </ScheduleCardText>
                <DetailsButton onClick={() => onClickDetails()}>
                    Ver Detalhes
                    <AngleRightIcon />
                </DetailsButton>
            </FlexColumn>
        </Container>
    );
}

export default inject('PermissionStore')(ScheduleCard);
