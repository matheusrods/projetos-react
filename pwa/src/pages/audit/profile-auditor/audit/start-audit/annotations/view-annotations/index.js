import React, { Fragment, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { FaExclamationCircle } from 'react-icons/fa';
import { Redirect, useHistory } from 'react-router-dom';
import {
    Accordion,
    AccordionWithCheckbox,
    AddButton,
    CompanyHeader,
    NextButton
} from '../../../../../../../components/atoms';
import {
    Container,
    Content,
    Title,
    Description,
    SubTitle,
    ContainerAnnotations,
    ContainerBorderCanvas,
    ContainerBorderText,
    ContainerNotFound,
    ContainerIconNotFound,
    TextNotFound
} from './styles';
import { toast } from 'react-toastify';
import { Header } from '../../../../../../../components/organisms';

function AuditPendingNewAnnotation({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const {
        programmingInEditing = null,
        themesInAuditing = [],
        stepThemeIndex = 0,
        updateLinkedAnnotations: onChangeAnnotations,
        annotations
    } = AuditProfileAuditorStore;

    const [annotationsSelected, setAnnotationsSelected] = useState(
        themesInAuditing[stepThemeIndex]?.annotations || []
    );

    const originPageInfos = history?.location?.state?.originPage;

    const handleSubmit = async () => {
        try {
            if (originPageInfos === 'auditing-requirements') {
                onChangeAnnotations(stepThemeIndex, annotationsSelected);

                history.goBack();
            } else {
                history.push('/audit/profile-auditor/start-audit/requirements-applicable');
            }
        } catch (error) {
            toast.error('Não foi possível prosseguir para a próxima etapa');
        }
    };

    return programmingInEditing ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    onClose={history.goBack}
                    typeAction={'Auditoria em andamento'}
                />
                <Content>
                    <Title>Anotações da auditoria</Title>
                    <Description>
                        Adicione ao requisito auditado as anotações que ilustrem
                        a conformidades ou não conformidades.
                    </Description>
                    <SubTitle>Anotações Adicionadas</SubTitle>
                    <ContainerAnnotations fullHeight={annotations.length > 0 ? false : true}>
                        {annotations?.length ? (
                            annotations?.map((annotation, index) => {
                                if (originPageInfos === 'auditing-requirements') {
                                    return (
                                        <AccordionWithCheckbox
                                            key={index}
                                            label={annotation.title}
                                            heightAuto={true}
                                            checkboxId={annotation.id}
                                            selected={annotationsSelected}
                                            onSelect={(id) => {
                                                setAnnotationsSelected(oldState => {
                                                    if (oldState.includes(id)) {
                                                        return oldState.filter(item => item !== id);
                                                    }

                                                    oldState.push(id);

                                                    return [...oldState];
                                                });
                                            }}
                                        >
                                            {annotation?.description ? (
                                                <ContainerBorderText>
                                                    {annotation.description}
                                                </ContainerBorderText>
                                            ) : null}
                                            {annotation?.image ? (
                                                <ContainerBorderCanvas>
                                                    <img
                                                        src={annotation.image}
                                                        alt={annotation.title}
                                                    ></img>
                                                </ContainerBorderCanvas>
                                            ) : null}
                                        </AccordionWithCheckbox>
                                    );
                                } else {
                                    return (
                                        <Accordion
                                            key={index}
                                            label={annotation.title}
                                            heightAuto={true}
                                        >
                                            {annotation?.description ? (
                                                <ContainerBorderText>
                                                    {annotation.description}
                                                </ContainerBorderText>
                                            ) : null}
                                            {annotation?.image ? (
                                                <ContainerBorderCanvas>
                                                    <img
                                                        src={annotation.image}
                                                        alt={annotation.title}
                                                    />
                                                </ContainerBorderCanvas>
                                            ) : null}
                                        </Accordion>
                                    );
                                }
                            })
                        ) : (
                            <ContainerNotFound>
                                <ContainerIconNotFound>
                                    <FaExclamationCircle />
                                </ContainerIconNotFound>
                                <TextNotFound>
                                    Nenhuma anotação da auditoria encontrada,
                                    clique no botão de '+' e adicione
                                </TextNotFound>
                            </ContainerNotFound>
                        )}
                    </ContainerAnnotations>
                </Content>
                <AddButton
                    bottom={68}
                    position={'absolute'}
                    onClick={() => history.push('/audit/profile-auditor/start-audit/new-annotation')}
                />
                <NextButton
                    positionRelative={true}
                    nextLabel={
                        originPageInfos === 'auditing-requirements'
                            ? 'Anexar'
                            : 'Avançar'
                    }
                    onBack={history.goBack}
                    onNext={handleSubmit}
                />
            </Container>
        </Fragment>
    ) : <Redirect to={'/audit/profile-auditor'} />;
}

export default inject('AuditProfileAuditorStore')(observer(AuditPendingNewAnnotation));
