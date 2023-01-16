import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import colors from '../../../styles/colors';
import { getNameInitials } from '../../../utils/helpers';
import { inject, observer } from 'mobx-react';

import {
    ObserverDate,
    ObserverHeader,
    ObserverId,
    ObserverInfo,
    ObserverLabel,
    ObserverStatus,
    ObserverUser,
    Avatar,
    Container,
    RiskDot,
    DetailsButton,
    Flex,
    FlexColumn,
    RiskIcon,
    RiskLabel,
    ContinueButton,
    ContainerTextContainAction,
    TextContainAction
} from './styles';

function Observer({
    observer,
    backgroundColor,
    borderColor,
    onClickContinue,
    onClickNameCard,
    typeOfObserver = null,
    continueButtonMessage = null,
    UserStore
}) {

    const renderContainsActionResponsability = () => {

        if (observer.id == 29)
            console.log(observer?.actionsUnderUser);

        if (observer?.actionsUnderUser) {

            return (
                <FlexColumn>
                    <ContainerTextContainAction>
                        <TextContainAction>Contém ação(ões) sob sua responsabilidade</TextContainAction>
                    </ContainerTextContainAction>
                </FlexColumn>
            );
        }

        return <></>;
    }

    const renderObservers = ({
        observer,
        date,
        responsible
    }) => {

        if (observer?.length) {
            return observer.map(({ avatar, name }, index) => {
                const nameInitials = name ? getNameInitials(name) : ['-'];
                return (
                    <React.Fragment key={index}>
                        <Avatar>
                            <span>
                                {avatar ? avatar : nameInitials}
                            </span>
                        </Avatar>
                        <FlexColumn>
                            <ObserverUser>
                                {name}
                            </ObserverUser>
                            <ObserverDate>{date}</ObserverDate>
                        </FlexColumn>
                    </React.Fragment>
                )
            });
        }

        return <></>;
    };

    if (typeOfObserver) {
        return (
            <Container backgroundColor={backgroundColor}>
                <ObserverHeader borderColor={borderColor}>
                    <ObserverId
                        onClick={() => {
                            if (typeof onClickNameCard === 'function') {
                                onClickNameCard();
                            }
                        }}
                    >
                        Observação
                        <span>#{observer?.uuid?.split('-')[0]}</span>
                    </ObserverId>
                    <ObserverStatus color={colors.inProgress}>
                        Em andamento
                    </ObserverStatus>
                </ObserverHeader>
                <ObserverLabel>
                    <span>
                        {observer?.observationType
                            ? observer?.observationType
                            : observer?.type?.label
                                ? observer.type.label
                                : '[Não informado]'}
                    </span>
                    <p>
                        {observer.observationLocation ??
                            observer?.registrationLocation?.location
                                ?.fullAddress}
                    </p>
                </ObserverLabel>
                {observer.criticism && (
                    <ObserverLabel>
                        <Flex>
                            <RiskIcon size={16} />
                            <RiskLabel>Criticidade</RiskLabel>
                        </Flex>
                        <Flex>
                            <span>{observer.criticism}</span>
                            <RiskDot color={observer.criticismColor} />
                        </Flex>
                    </ObserverLabel>
                )}
                <ObserverInfo>
                    <DetailsButton>
                        <ContinueButton
                            onClick={() =>
                                onClickContinue(observer?.id ?? observer?.uuid)
                            }
                        >
                            Continuar
                        </ContinueButton>
                        <FaAngleRight />
                    </DetailsButton>
                </ObserverInfo>
            </Container>
        );
    }

    return (
        <Container backgroundColor={backgroundColor}>
            <ObserverHeader borderColor={borderColor}>
                <ObserverId
                    onClick={() => {
                        if (typeof onClickNameCard === 'function') {
                            onClickNameCard();
                        }
                    }}
                >
                    Observação
                    <span>#{observer?.id ?? 'Não informado'}</span>
                </ObserverId>
                {observer?.status && (
                    <ObserverStatus color={observer?.statusColor ?? '#5CB3FF'}>
                        {observer?.statusDescription}
                    </ObserverStatus>
                )}
            </ObserverHeader>
            <ObserverLabel>
                <span>
                    {observer?.observationType ?? observer?.type?.label}
                </span>
                <p>
                    {observer?.observationLocation ??
                        observer?.registrationLocation?.location?.fullAddress}
                </p>
            </ObserverLabel>
            {observer?.criticism?.id && (
                <ObserverLabel>
                    <Flex>
                        <RiskIcon size={16} />
                        <RiskLabel>Criticidade</RiskLabel>
                    </Flex>
                    <Flex>
                        <span>{observer?.criticism?.description}</span>
                        <RiskDot color={observer?.criticism?.color ?? 'red'} />
                    </Flex>
                </ObserverLabel>
            )}
            <ObserverInfo>
                <Flex>
                    {renderObservers(observer)}
                </Flex>
                <DetailsButton>
                    <ContinueButton
                        onClick={() =>
                            onClickContinue(observer?.id ?? observer?.uuid)
                        }
                    >
                        {continueButtonMessage ?? 'Continuar'}
                    </ContinueButton>
                    <FaAngleRight />
                </DetailsButton>
            </ObserverInfo>
            {renderContainsActionResponsability()}
        </Container>
    );
}


export default inject('UserStore')(observer(Observer));
