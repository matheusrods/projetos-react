import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import colors from '../../../styles/colors';
import {
    SafetyDate,
    SafetyHeader,
    SafetyId,
    SafetyInfo,
    SafetyLabel,
    SafetyStatus,
    SafetyUser,
    Avatar,
    Container,
    RiskDot,
    DetailsButton,
    Flex,
    FlexColumn,
    RiskIcon,
    RiskLabel,
    ContinueButton
} from './styles';

function SafetyCard({
    safety,
    backgroundColor,
    borderColor,
    onClickContinue,
    onClickNameCard,
    typeOfSafety = null
}) {
    if (typeOfSafety) {
        return (
            <Container backgroundColor={backgroundColor}>
                <SafetyHeader borderColor={borderColor}>
                    <SafetyId
                        onClick={() => {
                            if (typeof onClickNameCard === 'function') {
                                onClickNameCard();
                            }
                        }}
                    >
                        Safety Walk & Talk
                        <span>
                            #{safety?.uuid?.split('-')[0] ?? 'Não registrado'}
                        </span>
                    </SafetyId>
                    <SafetyStatus color={colors.blueAux}>
                        Em andamento
                    </SafetyStatus>
                </SafetyHeader>
                <SafetyLabel>
                    <span>EHS Walk & Talk</span>
                    <p>
                        {safety?.registrationLocation?.company?.name ??
                            'Não informado'}
                    </p>
                </SafetyLabel>
                <SafetyInfo>
                    <Flex>
                        <>
                            <Avatar>
                                <span>
                                    {safety?.observer?.name[0].toUpperCase() ??
                                        'Não informado'}
                                </span>
                            </Avatar>
                            <FlexColumn>
                                <SafetyUser>
                                    {safety?.observer?.name ?? 'Não informado'}
                                </SafetyUser>
                                <SafetyDate>{safety.date}</SafetyDate>
                            </FlexColumn>
                        </>
                    </Flex>
                    <DetailsButton>
                        <ContinueButton
                            onClick={() => onClickContinue(safety.uuid)}
                        >
                            Continuar
                        </ContinueButton>
                        <FaAngleRight />
                    </DetailsButton>
                </SafetyInfo>
            </Container>
        );
    }

    return (
        <Container backgroundColor={backgroundColor}>
            <SafetyHeader borderColor={borderColor}>
                <SafetyId
                    onClick={() => {
                        if (typeof onClickNameCard === 'function') {
                            onClickNameCard();
                        }
                    }}
                >
                    Safety Walk & Talk
                    <span>#{safety.codigo}</span>
                </SafetyId>
                {safety.status_codigo && (
                    <SafetyStatus color={safety.status_cor}>
                        {safety.status_desc}
                    </SafetyStatus>
                )}
            </SafetyHeader>
            {safety?.localidade && (
                <SafetyLabel>
                    <span>EHS Walk & Talk</span>
                    <p>{safety.localidade}</p>
                </SafetyLabel>
            )}
            {safety.risk && (
                <SafetyLabel>
                    <Flex>
                        <RiskIcon size={16} />
                        <RiskLabel>Risco</RiskLabel>
                    </Flex>
                    <Flex>
                        <span>{safety.risk}</span>
                        <RiskDot color={safety.status_cor} />
                    </Flex>
                </SafetyLabel>
            )}
            <SafetyInfo>
                <Flex>
                    {safety.nome && (
                        <>
                            <Avatar>
                                <span>
                                    {safety.avatar ??
                                        safety.nome[0].toUpperCase()}
                                </span>
                            </Avatar>
                            <FlexColumn>
                                <SafetyUser>{safety.nome}</SafetyUser>
                                <SafetyDate>{safety.data}</SafetyDate>
                            </FlexColumn>
                        </>
                    )}
                </Flex>

                <DetailsButton>
                    <ContinueButton
                        onClick={() => onClickContinue(safety.codigo)}
                    >
                        Continuar
                    </ContinueButton>
                    <FaAngleRight />
                </DetailsButton>
            </SafetyInfo>
        </Container>
    );
}

export default SafetyCard;
