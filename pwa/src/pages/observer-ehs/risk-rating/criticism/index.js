import React, { Fragment } from 'react';

import { inject, observer } from 'mobx-react';
import { Header } from '../../../../components/organisms';
import { FaCheck, FaExclamationTriangle } from 'react-icons/fa';

import {
    Backdrop,
    CompanyHeader,
    InputRangeCriticism,
    NextButton,
    Modal
} from '../../../../components/atoms';
import {
    Container,
    Content,
    PageInfo,
    PageTitle,
    PageDescription,
    InputGroup,
    InputHeader,
    InputLabel,
    KnowMore,
    ModalContainer,
    ModalHeader,
    ModalContent,
    ModalTextContainer,
    ModalText,
    Strong,
    ModalFooter,
    ModalButton
} from './styles';
import {
    LoadingContainer,
    ModalComplex
} from '../../../../components/molecules';

import useRiskRatingCriticism from './useRiskRatingCriticism';


const RiskRatingCriticism = ({ ClassificationStore, UserStore }) => {

    const {
        loading,
        history,
        isEditing,
        criticality,
        setCriticality,
        criticism,
        handleNextAction,
        modalInfoVisible,
        setModalInfoVisible,
        modalExitPage,
        setModalExitPage,
        idObservation,
        reset
    } = useRiskRatingCriticism({ ClassificationStore, UserStore });

    if (loading) {
        return (
            <Fragment>
                <Header hiddenMobile={true} />
                <Container>
                    <CompanyHeader
                        positionRelative={true}
                        typeAction={'Classificação de risco EHS'}
                        onClose={() => setModalExitPage(true)}
                    />
                    <LoadingContainer />
                    <NextButton
                        positionRelative={true}
                        nextDisabled={true}
                        onBack={() => history.goBack()}
                        onNext={() =>
                            isEditing
                                ? history.goBack()
                                : history.push('improvement-actions')
                        }
                        nextLabel={isEditing ? 'Concluir' : 'Avançar'}
                        icon={isEditing ? <FaCheck /> : undefined}
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
                    typeAction={'Classificação de risco EHS'}
                    onClose={() => setModalExitPage({ visible: true, path: '/observer-ehs' })}
                />
                <Content>
                    <PageInfo>
                        <PageTitle>Classificação da criticidade</PageTitle>
                        <PageDescription>
                            Informe a criticidade desse apontamento
                        </PageDescription>
                    </PageInfo>
                    <InputGroup>
                        <InputHeader>
                            <InputLabel>Nível de criticidade</InputLabel>
                            <KnowMore onClick={() => setModalInfoVisible(true)}>
                                Saiba mais
                            </KnowMore>
                        </InputHeader>
                        <InputRangeCriticism
                            onChange={(value) => setCriticality(value.criticality)}
                            criticalityLevels={criticism}
                            criticality={criticality}
                        />
                    </InputGroup>
                </Content>
                <NextButton
                    positionRelative={true}
                    onBack={() => {
                        if (isEditing) {
                            history.goBack();
                        } else {
                            setModalExitPage({ visible: true, path: `/observer-ehs/risk-rating/${idObservation}` });
                        }
                    }}
                    onNext={() => handleNextAction()}
                    nextLabel={isEditing ? 'Concluir' : 'Avançar'}
                    icon={isEditing ? <FaCheck /> : undefined}
                />
            </Container>
            <Backdrop
                visible={modalInfoVisible}
                nameModal={'modal-info'}
                onClose={() => setModalInfoVisible(false)}
            >
                <Modal visible={modalInfoVisible}>
                    <ModalContainer>
                        <ModalHeader>Nível de criticidade</ModalHeader>
                        <ModalContent>
                            <ModalTextContainer>
                                <Strong>1 - Baixa</Strong>
                                <ModalText>
                                    Criticidade MÉDIA significa uma probabilidade muito alta e gravidade baixa, ou o inverso, uma probabilidade baixa com gravidade muito alta.
                                </ModalText>
                                <ModalText>
                                    Deve ser selecionado quando medidas de controle já estiverem implementadas para minimizar os danos e a sua probabilidade. Esse nível de criticidade não requer ações adicionais.
                                </ModalText>
                            </ModalTextContainer>
                            <ModalTextContainer>
                                <Strong>2 - Média</Strong>
                                <ModalText>
                                    Criticidade MÉDIA significa uma probabilidade muito alta e gravidade baixa, ou o inverso, uma probabilidade baixa com gravidade muito alta.
                                </ModalText>
                                <ModalText>
                                    Isso significa ter medidas de controle, porém medidas vulneráveis.  É necessário reduzir esse risco/impacto, sempre que possível.
                                </ModalText>
                            </ModalTextContainer>
                            <ModalTextContainer>
                                <Strong>3 - Alta</Strong>
                                <ModalText>
                                    Ter um item de criticidade ALTA requer ações imediatas para controle da situação, pois significa ter uma condição com impacto muito alto e uma probabilidade média de se concretizar.
                                </ModalText>
                                <ModalText>
                                    Nesse cenário, deve ser considerada uma paralização da atividade para adoção de medidas de controle.
                                </ModalText>
                            </ModalTextContainer>
                            <ModalTextContainer>
                                <Strong>4 - Maior</Strong>
                                <ModalText>
                                    A criticidade MAIOR também requer ações imediatas para mitigação dos riscos/impactos, com agravante de que a atividade deve ser paralisada imediatamente até que essas ações sejam implementadas.
                                </ModalText>
                                <ModalText>
                                    Essa criticidade significa ter uma condição com impacto muito alto e probabilidade muito alta.
                                </ModalText>
                            </ModalTextContainer>
                        </ModalContent>
                    </ModalContainer>
                    <ModalFooter>
                        <ModalButton onClick={() => setModalInfoVisible(false)}>
                            Ok, entendi
                        </ModalButton>
                    </ModalFooter>
                </Modal>
            </Backdrop>
            <ModalComplex
                title={'Atenção'}
                description={'Ao sair, você perdera os dados até aqui. Tem certeza que deseja sair?'}
                nameModal={'exit-page'}
                visible={modalExitPage.visible}
                onCancel={() => setModalExitPage({ visible: false, path: null })}
                onConfirm={() => {
                    reset();
                    history.push(modalExitPage.path);
                }}
                icon={<FaExclamationTriangle size={40} color={'#FF5C69'} />}
                confirmButtonLabel={'Sair'}
                cancelButtonLabel={'Cancelar'}
            />
        </Fragment>
    );
};

export default inject(
    'ClassificationStore',
    'UserStore'
)(observer(RiskRatingCriticism));
