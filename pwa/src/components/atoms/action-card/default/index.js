import React, { Fragment } from 'react';
import { FaAngleRight, FaCheck } from 'react-icons/fa';
import moment from '../../../../config/moment';
import colors from '../../../../styles/colors';

import {
    ActionDate,
    ActionHeader,
    ActionId,
    ActionInfo,
    ActionLabel,
    ActionStatus,
    ActionUser,
    Avatar,
    CriticismDot,
    DeadlineLabel,
    DetailsButton,
    Flex,
    FlexColumn,
    StyledLink,
    DeadlineWarning,
    Counter,
    OptionsButton,
    StatusWrapper,
    SelectedIcon,
    DeadlineDateLabel
} from './styles';

export default function Default({
    linkObservedItem = false,
    action,
    showSelected,
    showStatusInline,
    notDetailsButton,
    onClickDetails,
    detailsButtonLabel,
    selected,
    showOptions,
    onClickOptions
}) {

    const todayDate = new Date();
    const deadlineDate = new Date(action.deadline);

    let expired = false;
    if (todayDate.getTime() > deadlineDate.getTime() && [1, 3].includes(action.status.id)) {

        expired = true;

    }

    return (
        <Fragment>
            <ActionHeader>
                {(action.id || action.uuid) && (
                    <ActionId>
                        Id ação
                        <span>#{action.id ?? action.uuid.split('-')[0]}</span>
                    </ActionId>
                )}
                <StatusWrapper>
                    {action.status && !showSelected && !showStatusInline && (
                        <ActionStatus color={!expired ? action.status.color : colors.redAux}>
                            {!expired ? action.status.description : 'Atrasada'}
                        </ActionStatus>
                    )}
                    {showSelected && (
                        <SelectedIcon selected={selected}>
                            {selected && <FaCheck size={12} />}
                        </SelectedIcon>
                    )}
                    {showOptions && (
                        <OptionsButton
                            size={14}
                            color={colors.gray5}
                            onClick={() => onClickOptions()}
                        />
                    )}
                </StatusWrapper>
            </ActionHeader>
            {linkObservedItem && (
                <ActionLabel>
                    <span>Item observado</span>
                    <p>{linkObservedItem}</p>
                </ActionLabel>
            )}
            {action.status && (showSelected || showStatusInline) && (
                <ActionLabel>
                    <span>Status</span>
                    <ActionStatus color={action.status.color}>
                        {action.status.description}
                    </ActionStatus>
                </ActionLabel>
            )}
            {action.observedItem && (
                <ActionLabel>
                    <span>Item observado</span>
                    <span>{action.observedItem}</span>
                </ActionLabel>
            )}
            {action.criticism && (
                <ActionLabel>
                    <span>Criticidade</span>
                    <Flex>
                        <span>{action.criticism.description}</span>
                        <CriticismDot color={action.criticism.color} />
                    </Flex>
                </ActionLabel>
            )}
            {action.origin && (
                <ActionLabel>
                    <span>Origem</span>
                    <span>{action.origin.description}</span>
                </ActionLabel>
            )}
            {action.type && (
                <ActionLabel>
                    <span>Tipo da ação</span>
                    <span>{action.type.description}</span>
                </ActionLabel>
            )}
            {action.responsible && (
                <ActionLabel>
                    <span>Responsável</span>
                    <span>
                        {action.responsible.name ?? 'Em processo de aceite'}
                    </span>
                </ActionLabel>
            )}
            {action.deadline && (
                <ActionLabel>
                    <DeadlineDateLabel expired={expired}>Prazo</DeadlineDateLabel>
                    <Flex>
                        <DeadlineDateLabel expired={expired}>
                            {moment(new Date(action.deadline)).isValid()
                                ? moment(action.deadline).format('DD/MM/YYYY')
                                : action.deadline}
                        </DeadlineDateLabel>
                        {action.reopened && (
                            <DeadlineLabel color={colors.redAux}>
                                Reaberto
                            </DeadlineLabel>
                        )}
                    </Flex>
                    {action.daysToExpire && (
                        <DeadlineWarning>
                            Vencerá em {action.daysToExpire}{' '}
                            {action.daysToExpire > 1 ? 'dias' : 'dia'}
                        </DeadlineWarning>
                    )}
                    {action.daysLate && (
                        <DeadlineWarning color={colors.redAux}>
                            Atrasado há {action.daysLate} dias
                        </DeadlineWarning>
                    )}
                </ActionLabel>
            )}
            {action.deviationDescription && (
                <ActionLabel>
                    <span>Descrição do Desvio</span>
                    <p>{action.deviationDescription}</p>
                </ActionLabel>
            )}
            {action.description && (
                <ActionLabel>
                    <span>Descrição</span>
                    <p>{action.description}</p>
                </ActionLabel>
            )}
            {action.location?.fullAddress && (
                <ActionLabel>
                    <span>Localidade</span>
                    <p>{action.location.fullAddress}</p>
                </ActionLabel>
            )}
            {action?.relatedActionsCount >= 0 &&
                action.relatedActionsCount !== null ? (
                <ActionLabel>
                    <span>Ações relacionadas</span>
                    <Counter>{action.relatedActionsCount}</Counter>
                </ActionLabel>
            ) : null}
            {(action.user || onClickDetails) && (
                <ActionInfo>
                    <Flex>
                        {action.user && (
                            <>
                                <Avatar>
                                    <span>{action.user.name[0]}</span>
                                </Avatar>
                                <FlexColumn>
                                    <ActionUser>{action.user.name}</ActionUser>
                                    <ActionDate>{action.date}</ActionDate>
                                </FlexColumn>
                            </>
                        )}
                    </Flex>

                    {onClickDetails && !notDetailsButton && (
                        <DetailsButton>
                            <StyledLink
                                onClick={() => onClickDetails(action.id)}
                            >
                                {detailsButtonLabel}
                            </StyledLink>
                            <FaAngleRight />
                        </DetailsButton>
                    )}
                </ActionInfo>
            )}
        </Fragment>
    );
}
