import { inject, observer } from 'mobx-react';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { CompanyHeader, NextButton } from '../../../../components/atoms';
import { ModalComplex } from '../../../../components/molecules';
import LoadingContainer from '../../../../components/molecules/loading-container';
import { Header } from '../../../../components/organisms';
import { getAreaObservationsData } from '../../../../services/endpoints/swt/area-observations';
import colors from '../../../../styles/colors';
import { isEmpty } from '../../../../utils/helpers';
import {
    Card,
    Category,
    CategoryFooter,
    CategoryHeader,
    CategoryTitle,
    Container,
    Content,
    Dot,
    Number,
    PageDescription,
    PageInfo,
    PageTitle,
    Rating,
    Ratings,
    RatingText,
    RiskRatingBar,
    RiskRatingBarFilled,
    TitleCard
} from './styles';

const GAP_IN_PIXEL = 4;

function hasRegisters(obsResponse) {
    const itHasCategory = obsResponse?.category?.[0]?.totalValue;
    const itHasClassification = obsResponse?.classification?.[0]?.total;

    if (itHasCategory && itHasClassification) {
        return true;
    }

    return false;
}

function RiskRatingBarComponent({ classification }) {
    return (
        <RiskRatingBar>
            {classification.map((item, index) => (
                <RiskRatingBarFilled
                    key={index}
                    width={`${item.percentage}%`}
                    borderRadius={item.borderRadius}
                    color={item?.color ? `#${item.color}` : colors.blueAux}
                />
            ))}
        </RiskRatingBar>
    );
}

function NewRegisterAreaObservations({ UserStore, NewRegisterSWT }) {
    const history = useHistory();
    const [classification, setClassification] = useState(null);
    const [category, setCategory] = useState(null);
    const [modalExitPage, setModalExitPage] = useState(false);

    const pushBackward = useCallback(
        () =>
            history.push(
                '/safety-walk-talk/new-register/registration-location'
            ),
        [history]
    );

    const pushForward = useCallback(() => {
        NewRegisterSWT.setNewRegisterData({
            currentStep: '/safety-walk-talk/new-register/summary'
        });

        history.push('summary');
    }, [history, NewRegisterSWT]);

    const handlePushForwardOrBackward = useCallback(() => {
        const { from } = { ...history.location.state };

        from?.includes('summary') ? pushBackward() : pushForward();
    }, [history, pushBackward, pushForward]);

    const calculateLengthBar = (
        quantityItem,
        totalValue = 150,
        quantityClassifications = 0
    ) => {
        const percentageFilled = (quantityItem * 100) / totalValue;
        const classificationGap =
            ((quantityClassifications - 1) * GAP_IN_PIXEL) /
            quantityClassifications;

        return `calc(${percentageFilled}% - ${classificationGap}px)`;
    };

    const fetchAreaObservations = useCallback(async () => {
        try {
            const areaObservationsResponse = await getAreaObservationsData(
                UserStore.clientId
            );

            if (isEmpty(areaObservationsResponse)) {
                const message = 'Serviço de Observações levantadas inoperante';
                toast.warn(message);
                throw new Error(message);
            }

            if (!hasRegisters(areaObservationsResponse)) {
                handlePushForwardOrBackward();
                return;
            }

            setClassification(areaObservationsResponse.classification);
            setCategory(areaObservationsResponse.category);
        } catch (error) {
            console.error(error);
            history.push('/safety-walk-talk');
        }
    }, [UserStore, history, handlePushForwardOrBackward]);

    useEffect(() => fetchAreaObservations(), [fetchAreaObservations]);

    if (isEmpty(classification) || isEmpty(category)) {
        return (
            <Fragment>
                <Header hiddenMobile={true} />
                <Container>
                    <CompanyHeader
                        positionRelative={true}
                        typeAction={'EHS Walk & Talk'}
                        onClose={() => alert('Fechar')}
                    />
                    <Content>
                        <LoadingContainer />
                    </Content>
                    <NextButton
                        nextDisabled={true}
                        positionRelative={true}
                        onBack={() => history.goBack()}
                        onNext={() => history.push('summary')}
                        nextLabel={'Avançar'}
                    />
                </Container>
            </Fragment>
        );
    }

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    typeAction={'EHS Walk & Talk'}
                    onClose={() => setModalExitPage(true)}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Observações EHS da área</PageTitle>
                        <PageDescription>
                            Resumo das observações levantadas nesta área
                        </PageDescription>
                    </PageInfo>
                    <Card>
                        <TitleCard>Classificação de riscos</TitleCard>
                        <RiskRatingBarComponent
                            classification={classification}
                        />
                        <Ratings>
                            {classification.map((item, index) => (
                                <Rating key={index}>
                                    <Dot
                                        color={
                                            item?.color
                                                ? `#${item.color}`
                                                : colors.blueAux
                                        }
                                    />
                                    <RatingText>
                                        {`${item.description}: ${item.total}`}
                                    </RatingText>
                                </Rating>
                            ))}
                        </Ratings>
                    </Card>
                    <Card padding={'16px 12px 10px'}>
                        <TitleCard>Categorias das observações</TitleCard>
                        {category.map((item, index) => (
                            <Category key={index}>
                                <CategoryHeader>
                                    <CategoryTitle>
                                        {item.category}
                                    </CategoryTitle>
                                    <Number>{item.totalValue}</Number>
                                </CategoryHeader>
                                <RiskRatingBar height={'10px'} flexGap={true}>
                                    {item.classifications.map(
                                        (classification, index) => (
                                            <RiskRatingBarFilled
                                                key={index.toString()}
                                                width={calculateLengthBar(
                                                    classification.quantity,
                                                    item.totalValue,
                                                    item.classifications.length
                                                )}
                                                borderRadius={
                                                    item.classifications
                                                        .length === 1
                                                        ? '8px'
                                                        : index === 0
                                                        ? '8px 0px 0px 8px'
                                                        : item.classifications
                                                              .length -
                                                              1 ===
                                                          index
                                                        ? '0px 8px 8px 0px'
                                                        : null
                                                }
                                                color={classification.color}
                                            />
                                        )
                                    )}
                                </RiskRatingBar>
                                <CategoryFooter>
                                    <span>0</span>
                                    <span>{item.totalValue.toString()}</span>
                                </CategoryFooter>
                            </Category>
                        ))}
                    </Card>
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={pushBackward}
                    onNext={pushForward}
                    nextLabel={'Avançar'}
                />
            </Container>
            <ModalComplex
                title={'Atenção'}
                description={
                    'Tentaremos salvar os passos anteriores até aqui. Tem certeza que deseja sair?'
                }
                nameModal={'exit-page'}
                visible={modalExitPage}
                onCancel={() => setModalExitPage(false)}
                onConfirm={() => history.push('/safety-walk-talk/')}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </Fragment>
    );
}

export default inject(
    'UserStore',
    'NewRegisterSWT'
)(observer(NewRegisterAreaObservations));
