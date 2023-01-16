import React, { Fragment } from "react"
import { FaAngleRight } from "react-icons/fa";

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
    DetailsButton,
    Flex,
    FlexColumn,
    StyledLink,
    Counter
} from "./styles";

export default function Default({
    action,
    showSelected,
    showStatusInline,
    notDetailsButton,
    onClickDetails,
    detailsButtonLabel
}) {
    return (
        <Fragment>
            <ActionHeader>
                {(action?.id && action?.origin?.description) && (
                    <ActionId>
                        {action.origin.description}
                        <span>#{action.id}</span>
                    </ActionId>
                )}
            </ActionHeader>
            {action.status && (showSelected || showStatusInline) && (
                <ActionLabel>
                    <span>Status</span>
                    <ActionStatus color={action.status.color}>
                        {action.status.description}
                    </ActionStatus>
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
            {action?.deviationDescription && (
                <ActionLabel>
                    <span>Descrição do desvio</span>
                    <p>{action.deviationDescription}</p>
                </ActionLabel>
            )}
            {action.location?.fullAddress && (
                <ActionLabel>
                    <span>Localidade</span>
                    <p>{action.location.fullAddress}</p>
                </ActionLabel>
            )}
            {action?.relatedActionsCount >= 0 && action.relatedActionsCount !== null ? (
                <ActionLabel>
                    <span>Ações relacionadas</span>
                    <Counter>{action.relatedActionsCount}</Counter>
                </ActionLabel>
            ) : null}
            {(action?.user || onClickDetails) && (
                <ActionInfo>
                    <Flex>
                        {action.user && (
                            <Fragment>
                                <Avatar>
                                    <span>{action.user.name[0]}</span>
                                </Avatar>
                                <FlexColumn>
                                    <ActionUser>{action.user.name}</ActionUser>
                                    <ActionDate>{action.date}</ActionDate>
                                </FlexColumn>
                            </Fragment>
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
