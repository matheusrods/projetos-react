import React, { Fragment, useEffect, useState } from 'react';
import { FaAngleRight, FaExclamationTriangle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import {
    CompanyHeader,
    NextButton,
    TextArea,
    StarRating
} from '../../../../components/atoms';
import { Header } from '../../../../components/organisms';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    ObserverCard,
    ObserverDate,
    ObserverHeader,
    ObserverInfo,
    ObserverLabel,
    ObserverStatus,
    ObserverUser,
    Avatar,
    RiskDot,
    DetailsButton,
    Flex,
    FlexColumn,
    ContinueButton,
    StyledForm
} from './styles';
import { ModalComplex } from '../../../../components/molecules';
import { isEmpty, sleep } from '../../../../utils/helpers';
import { toast } from 'react-toastify';

const RiskRatingQuality = ({ ClassificationStore }) => {
    const {
        observation,
        setNewRegisterData,
        quality,
        criticism,
        reset,
        improvementActions
    } = ClassificationStore;

    const history = useHistory();
    const [modalExitPage, setModalExitPage] = useState(false);
    const [rating, setRating] = useState(0);
    const [complementary, setComplementary] = useState('');
    const [participants, setParticipants] = useState('');

    useEffect(() => {
        const grabIdFromUrl = () => {
            const splitted = history.location.pathname.split('/');
            return Number(splitted[3]);
        };
        if (isEmpty(improvementActions)) {
            toast.warn(
                'Perdemos alguns dados. Você será redirecionado em alguns segundos'
            );
            sleep(3000).then(() =>
                history.push(`/observer-ehs/risk-rating/${grabIdFromUrl()}`)
            );
        }
    }, [improvementActions, history]);

    useEffect(() => {
        if (!isEmpty(quality)) {
            setRating(quality?.rating ?? 0);
            setComplementary(quality?.complementary ?? '');
            setParticipants(quality?.participants ?? '');
        }
    }, [quality]);

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'Classificação de risco EHS'}
                    onClose={() => setModalExitPage(true)}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Qualidade da observação</PageTitle>
                        <PageDescription>
                            Indique a classificação dessa observação
                            considerando critérios como postura do observador,
                            abrangência, ação imediata, descrição do registro,
                            etc.
                        </PageDescription>
                    </PageInfo>
                    <ObserverCard>
                        <ObserverHeader borderColor={'#50C3E8'}>
                            <ObserverLabel>
                                <span>
                                    {observation?.observationType ??
                                        'Não informado'}
                                </span>
                                <Flex>
                                    <span>
                                        {criticism?.name ?? 'Não informado'}
                                    </span>
                                    <RiskDot color={`#${criticism?.color}`} />
                                </Flex>
                                <p>
                                    {observation?.observationLocation ??
                                        'Não informado'}
                                </p>
                            </ObserverLabel>
                        </ObserverHeader>
                        <ObserverLabel>
                            <span>Status</span>
                            <ObserverStatus color={'#5CB3FF'}>
                                Aguardando análise
                            </ObserverStatus>
                        </ObserverLabel>
                        <ObserverInfo>
                            <Flex>
                                <>
                                    <Avatar>
                                        <span>
                                            {(observation?.observer?.avatar &&
                                                observation?.observer?.name?.length) &&
                                                observation?.observer?.name[0]}
                                        </span>
                                    </Avatar>
                                    <FlexColumn>
                                        <ObserverUser>
                                            {observation?.observer?.name ??
                                                'Não informado'}
                                        </ObserverUser>
                                        <ObserverDate>
                                            {observation?.date ??
                                                'Não informado'}
                                        </ObserverDate>
                                    </FlexColumn>
                                </>
                            </Flex>
                            <DetailsButton>
                                <ContinueButton
                                    onClick={() =>
                                        history.push(
                                            `/observer-ehs/details/${observation.id}`
                                        )
                                    }
                                >
                                    Ver detalhes
                                </ContinueButton>
                                <FaAngleRight />
                            </DetailsButton>
                        </ObserverInfo>
                    </ObserverCard>
                    <StyledForm>
                        <StarRating
                            label={'Avalie a observação'}
                            selectedStars={rating}
                            onChange={(value) => setRating(value)}
                        />
                        <TextArea
                            label={'Complemente sua avaliação (opcional)'}
                            placeholder={'Descreva aqui...'}
                            name={'additional-rating'}
                            value={complementary}
                            onChange={({ target }) =>
                                setComplementary(target.value)
                            }
                        />
                        <TextArea
                            label={
                                'Pessoas participantes da tratativa (opcional)'
                            }
                            placeholder={'Digite aqui...'}
                            name={'participants'}
                            value={participants}
                            onChange={({ target }) =>
                                setParticipants(target.value)
                            }
                        />
                    </StyledForm>
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => history.goBack()}
                    onNext={() => {
                        setNewRegisterData({
                            quality: {
                                rating,
                                complementary,
                                participants
                            }
                        });
                        history.push('check-observation');
                    }}
                    nextLabel={'Avançar'}
                />
            </Container>
            <ModalComplex
                title={'Atenção'}
                description={
                    'Ao sair, você perdera os dados até aqui. Tem certeza que deseja sair?'
                }
                nameModal={'exit-page'}
                visible={modalExitPage}
                onCancel={() => setModalExitPage(false)}
                onConfirm={() => {
                    reset();
                    history.push('/observer-ehs');
                }}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </Fragment>
    );
};

export default inject('ClassificationStore')(observer(RiskRatingQuality));
