import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { WhiteHeader } from '../../../../components/atoms';
import { ModalActions } from '../../../../components/molecules';
import { ConfirmCancelFooter, Header } from '../../../../components/organisms';
import {
    Container,
    Content,
    Section,
    SectionTitle,
    SectionText,
    SectionSubTitle,
    SectionSub,
    WrapperTitle,
    SectionIcon,
    Photo,
    ListPhotos,
    ContainerPhotos
} from './styles';

const RiskRatingEdit = (props) => {
    const history = useHistory();
    const [editPageLink, setEditPageLink] = useState('');
    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [observation] = useState(props?.location?.state ?? {});

    const handlerEditButton = (link) => {
        setEditPageLink(link);
        setModalActionsVisible(true);
    };

    return (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={'Editar ação'}
                    onClose={() => history.goBack()}
                />
                <Content>
                    <WrapperTitle>
                        Observação #{observation?.id ?? 'Não informado'}
                    </WrapperTitle>
                    <Section>
                        <SectionTitle>Data e hora</SectionTitle>
                        <SectionText>
                            {observation?.date ?? 'Não informado'}{' '}
                            {observation?.hour ?? ''}
                        </SectionText>
                    </Section>
                    <Section>
                        <SectionTitle>Local da Observação</SectionTitle>
                        <SectionText>
                            {observation?.observationLocation ??
                                'Não informado'}
                        </SectionText>
                    </Section>
                    <Section>
                        <SectionTitle>Observador</SectionTitle>
                        <SectionText>
                            {observation?.observer?.name ?? 'Não informado'}
                        </SectionText>
                    </Section>
                    <Section>
                        <SectionTitle>Tipo de Observação</SectionTitle>
                        <SectionIcon
                            onClick={() => handlerEditButton('type')}
                        />
                        <SectionText>
                            {observation?.observationType ?? 'Não informado'}
                        </SectionText>
                    </Section>
                    <Section>
                        <SectionTitle>Descrição</SectionTitle>
                        <SectionIcon
                            onClick={() => handlerEditButton('description')}
                        />
                        <SectionText>
                            {observation?.description ?? 'Não informado'}
                        </SectionText>
                    </Section>
                    <Section>
                        <SectionTitle>O que eu observei?</SectionTitle>
                        <SectionText>
                            {observation?.whatWasObserved ?? 'Não informado'}
                        </SectionText>
                    </Section>
                    <Section>
                        <SectionTitle>O que eu fiz a respeito?</SectionTitle>
                        <SectionText>
                            {observation?.whatWasDone ?? 'Não informado'}
                        </SectionText>
                    </Section>
                    <Section>
                        <SectionTitle>Ação complementar sugerida:</SectionTitle>
                        <SectionText>
                            {observation?.whatWasSuggested ?? 'Não informado'}
                        </SectionText>
                    </Section>
                    <Section>
                        <SectionTitle>Fotos da observação</SectionTitle>
                        <ContainerPhotos>
                            {observation?.attachments?.length > 0 ? (
                                <ListPhotos>
                                    {observation?.attachments?.map(
                                        (item, index) => (
                                            <Photo
                                                key={index}
                                                onClick={() => {
                                                    history.push(
                                                        `/observer-ehs/${item.code}/view-photo`,
                                                        {
                                                            photo: {
                                                                url: item.file
                                                            }
                                                        }
                                                    );
                                                }}
                                            >
                                                <img
                                                    src={item.file}
                                                    alt="Imagem da observação"
                                                />
                                            </Photo>
                                        )
                                    )}
                                </ListPhotos>
                            ) : (
                                <SectionText>
                                    Nenhuma foto foi inserida
                                </SectionText>
                            )}
                        </ContainerPhotos>
                    </Section>
                    <Section>
                        {observation?.risksAndImpacts?.length ? (
                            <>
                                <SectionTitle>Riscos e impactos</SectionTitle>
                                <SectionIcon
                                    onClick={() =>
                                        handlerEditButton('risk-impact')
                                    }
                                />
                            </>
                        ) : null}

                        {observation?.risksAndImpacts?.map((item, index) => (
                            <SectionSub key={index}>
                                <SectionSubTitle>
                                    {item?.riskImpactDescription ??
                                        'Não informado'}
                                </SectionSubTitle>
                                <SectionText>
                                    {item?.dangerAspectsDescription ??
                                        'Não informado'}
                                </SectionText>
                            </SectionSub>
                        ))}
                    </Section>
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={'Fechar'}
                    onConfirm={() =>
                        history.push(
                            `/observer-ehs/risk-rating/${observation?.id}`
                        )
                    }
                    hideCancelButton={true}
                />
            </Container>
            <ModalActions
                title={'Detalhe da observação'}
                nameModal={'modal-actions'}
                visible={modalActionsVisible}
                onClose={() => setModalActionsVisible(false)}
                options={[
                    {
                        label: 'Editar item',
                        onPress: () =>
                            history.push(
                                `/observer-ehs/new-register/${editPageLink}`,
                                {
                                    isEditingFromRiskRating: true,
                                    observation: observation
                                }
                            )
                    },
                    {
                        label: 'Excluir item',
                        icon: 'FaTrashAlt',
                        color: '#FF5C69',
                        disabled: true
                    }
                ]}
            />
        </Fragment>
    );
};

export default RiskRatingEdit;
