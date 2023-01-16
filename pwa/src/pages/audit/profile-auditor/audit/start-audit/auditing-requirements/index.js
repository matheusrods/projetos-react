import { inject, observer } from 'mobx-react';
import React, { Fragment, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import {
    CircleCheckbox,
    CompanyHeader,
    NextButton,
    TextAreaDefault,
    InputRangeCriticism,
    FloatingActionButton,
    Photo
} from '../../../../../../components/atoms';
import {
    LoadingContainer,
    ModalComplex
} from '../../../../../../components/molecules';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {
    Container,
    Content,
    ScrollContainer,
    Title,
    SubTitle,
    Info,
    ContainerQuestion,
    ContainerQuestionClassification,
    CheckboxLabel,
    CardBodyText,
    SubTitleTextArea,
    ContainerTextArea,
    ButtonAddNC,
    InfoNC,
    ContainerButtonsNC,
    ContainerPhotos,
    ListPhotos,
    Section,
    ContainerModal,
    TitleModal,
    DescriptionModal,
    TextSend,
    ContainerSend,
    ContainerButtonAddPhoto,
    ButtonAddPhoto
} from './styles';
import '../../../../../../assets/css/horizontal-scroll-styles.css';
import { FaAngleLeft, FaAngleRight, FaCheckCircle, FaInfo, FaPen } from 'react-icons/fa';
import {
    FiPlusCircle,
    FiPaperclip,
    FiAlertCircle,
    FiX,
    FiAlertOctagon
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import colors from '../../../../../../styles/colors';
import { Header } from '../../../../../../components/organisms';

const MenuItem = ({ text, selected }) => {
    return (
        <div className={selected ? 'menu-item active' : 'menu-item'}>{text}</div>
    );
};

const Menu = (listTabs, selected) =>
    listTabs.map((norm, index) => {
        const { title } = norm;

        return <MenuItem text={title} key={index} selected={selected === index} />;
    });

const Arrow = ({ text, className }) => {
    return <div className={className}>{text}</div>;
};

const ArrowLeft = Arrow({ text: <FaAngleLeft />, className: 'arrow-prev' });
const ArrowRight = Arrow({ text: <FaAngleRight />, className: 'arrow-next' });

function AuditPendingViewAnnotations({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const {
        programmingInEditing = null,
        criticalities = [],
        themesInAuditing = [],
        stepThemeIndex = 0,
        addUnConformed: handleAddUnConformed,
        updateStepAuditing: onChangeStepAuditing,
        updateAnswer: onChangeAnswer,
        updateStatusRequirement: onChangeStatusRequirement,
        sendThemeAudited,
        setRequirementPhotoInEditingIndex
    } = AuditProfileAuditorStore;

    const location = useLocation();

    const [loading, setLoading] = useState(false);
    const [modalInfo, setModalInfo] = useState({ visible: false, info: '' });
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    const [exitModalVisible, setExitModalVisible] = useState(false);
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [infoRegistersModalVisible, setInfoRegistersModalVisible] = useState(false);

    const handleSubmit = async () => {
        if (themesInAuditing[stepThemeIndex]?.submittedAudit) {
            const response = onChangeStepAuditing('add');

            if (response) {
                if (themesInAuditing.filter(theme => !theme.submittedAudit).length > 0) {
                    setInfoRegistersModalVisible(true);
                } else {
                    history.goBack();
                }
            }
        } else {
            setConfirmModalVisible(false);
            setLoading(true);

            const themeResponse = await sendThemeAudited(stepThemeIndex);

            setLoading(false);

            if (themeResponse) {
                const response = onChangeStepAuditing('add');

                if (response) {
                    history.goBack();
                }
            }
        }
    };

    const validateData = () => {
        const errors = [];

        const themeValidate = themesInAuditing[stepThemeIndex];

        const { titles = [] } = JSON.parse(JSON.stringify(themeValidate));

        titles.forEach(title => {
            const { requirements = [] } = title;

            requirements.forEach(requirement => {
                const { answers, status } = requirement;

                switch (status) {
                    case 1:
                        if (!(answers?.conformed?.evidence) || answers?.conformed?.evidence === '') {
                            errors.push(`É obrigatório descrever as evidências do requisito '${requirement.orderLabel}'`);
                        }
                        break;
                    case 2:
                        answers.unConformities.forEach((classification, index) => {
                            if (!(classification?.evidence) || classification?.evidence === '') {
                                errors.push(`É obrigatório descrever as evidências do requisito '${requirement.orderLabel}' na ${index + 1} classificação`);
                            }
                        });
                        break;
                    case 3:
                        if (!(answers?.notApplicable?.evidence) || answers?.notApplicable?.evidence === '') {
                            errors.push(`É obrigatório descrever as evidências do requisito '${requirement.orderLabel}'`);
                        }
                        break;
                    default:
                        errors.push(`É obrigatório definir se o requisito '${requirement.orderLabel}' é conforme, não conforme ou não se aplica`);
                        break;
                }
            });
        });

        errors.map(toast.error);

        return errors.length === 0 ? true : false;
    };

    const handleOpenPhoto = (photoUrl) => {
        history.push({
            pathname: '/audit/view-photo',
            state: { photo: { url: photoUrl } }
        });
    };

    const renderPhotos = (picturesData) => {
        return picturesData.map((item, index) => (
            <Photo
                showOptions={false}
                src={item}
                key={index}
                onClick={() => handleOpenPhoto(item)}
            />
        ));
    };

    const renderForm = (theme) => {
        const { titles = [] } = theme;

        return (
            <Fragment>
                {titles.map((title, indexTitle) => {
                    const { requirements = [] } = title;

                    return (
                        <Fragment key={indexTitle}>
                            <Title>{title.orderLabel}. {title.title}</Title>
                            {requirements.map((requirement, indexRequirement) => {
                                return (
                                    <Fragment key={indexRequirement}>
                                        <SubTitle>
                                            {requirement.orderLabel} {requirement.title}
                                            {requirement.knowMore &&
                                                <Info
                                                    onClick={() => {
                                                        setModalInfo({
                                                            visible: true,
                                                            info: requirement.knowMore
                                                        });
                                                    }}
                                                >
                                                    <FaInfo />
                                                </Info>
                                            }
                                        </SubTitle>
                                        <ContainerQuestion>
                                            <CheckboxLabel>
                                                <CircleCheckbox
                                                    checked={requirement.status === 1}
                                                    onChange={() => onChangeStatusRequirement(stepThemeIndex, indexTitle, indexRequirement, 1)}
                                                    name="conform"
                                                />
                                                <CardBodyText
                                                    checked={requirement.status === 1}
                                                    margin="0 0 0 8px"
                                                    display="inline"
                                                >
                                                    Conforme
                                                </CardBodyText>
                                            </CheckboxLabel>
                                            <CheckboxLabel>
                                                <CircleCheckbox
                                                    checked={requirement.status === 2}
                                                    onChange={() => onChangeStatusRequirement(stepThemeIndex, indexTitle, indexRequirement, 2)}
                                                    name="not-conform"
                                                />
                                                <CardBodyText
                                                    checked={requirement.status === 2}
                                                    margin="0 0 0 8px"
                                                    display="inline"
                                                >
                                                    Não conforme
                                                </CardBodyText>
                                            </CheckboxLabel>
                                            <CheckboxLabel>
                                                <CircleCheckbox
                                                    checked={requirement.status === 3}
                                                    onChange={() => onChangeStatusRequirement(stepThemeIndex, indexTitle, indexRequirement, 3)}
                                                    name="not-applicable"
                                                />
                                                <CardBodyText
                                                    checked={requirement.status === 3}
                                                    margin="0 0 0 8px"
                                                    display="inline"
                                                >
                                                    Não se aplica
                                                </CardBodyText>
                                            </CheckboxLabel>
                                        </ContainerQuestion>
                                        {requirement.status === 1 && (
                                            <Fragment>
                                                <SubTitleTextArea>Evidências</SubTitleTextArea>
                                                <ContainerTextArea>
                                                    <TextAreaDefault
                                                        name={'evidence'}
                                                        placeholder={'Descreva aqui as evidências'}
                                                        value={requirement?.answers?.conformed?.evidence || ''}
                                                        onChange={({ target: { value } }) =>
                                                            onChangeAnswer(
                                                                'conformed',
                                                                stepThemeIndex,
                                                                indexTitle,
                                                                indexRequirement,
                                                                null,
                                                                'evidence',
                                                                value
                                                            )
                                                        }
                                                    />
                                                </ContainerTextArea>
                                                <SubTitleTextArea>
                                                    Oportunidade de melhorias ou nc
                                                </SubTitleTextArea>
                                                <ContainerTextArea>
                                                    <TextAreaDefault
                                                        name={'opportunity'}
                                                        placeholder={'Descreva aqui as oportunidades de melhorias'}
                                                        value={requirement?.answers?.conformed?.opportunityImprovement || ''}
                                                        onChange={({ target: { value } }) =>
                                                            onChangeAnswer(
                                                                'conformed',
                                                                stepThemeIndex,
                                                                indexTitle,
                                                                indexRequirement,
                                                                null,
                                                                'opportunityImprovement',
                                                                value
                                                            )
                                                        }
                                                    />
                                                </ContainerTextArea>
                                            </Fragment>
                                        )}
                                        {requirement.status === 2 && (
                                            <Fragment>
                                                {requirement.answers.unConformities.map(
                                                    (answer, indexAnswer) => {
                                                        return (
                                                            <Fragment key={indexAnswer}>
                                                                <SubTitle>
                                                                    {indexAnswer + 1} - Classifique a não conformidade
                                                                </SubTitle>
                                                                <ContainerQuestionClassification>
                                                                    <CheckboxLabel margin="0px 24px 0px 0px">
                                                                        <CircleCheckbox
                                                                            checked={answer.classification === 1}
                                                                            onChange={() =>
                                                                                onChangeAnswer(
                                                                                    'unConformities',
                                                                                    stepThemeIndex,
                                                                                    indexTitle,
                                                                                    indexRequirement,
                                                                                    indexAnswer,
                                                                                    'classification',
                                                                                    1
                                                                                )
                                                                            }
                                                                            name="bigger"
                                                                        />
                                                                        <CardBodyText
                                                                            checked={answer.classification === 1}
                                                                            margin="0 0 0 8px"
                                                                            display="inline"
                                                                        >
                                                                            NC Maior
                                                                        </CardBodyText>
                                                                    </CheckboxLabel>
                                                                    <CheckboxLabel>
                                                                        <CircleCheckbox
                                                                            checked={answer.classification === 2}
                                                                            onChange={() =>
                                                                                onChangeAnswer(
                                                                                    'unConformities',
                                                                                    stepThemeIndex,
                                                                                    indexTitle,
                                                                                    indexRequirement,
                                                                                    indexAnswer,
                                                                                    'classification',
                                                                                    2
                                                                                )
                                                                            }
                                                                            name="smaller"
                                                                        />
                                                                        <CardBodyText
                                                                            checked={answer.classification === 2}
                                                                            margin="0 0 0 8px"
                                                                            display="inline"
                                                                        >
                                                                            NC Menor
                                                                        </CardBodyText>
                                                                    </CheckboxLabel>
                                                                </ContainerQuestionClassification>
                                                                <InputRangeCriticism
                                                                    backgroundColor={'#FFF'}
                                                                    boxShadow={'none'}
                                                                    margin={'0px 0px 15px 0px'}
                                                                    onChange={({ criticality }) =>
                                                                        onChangeAnswer(
                                                                            'unConformities',
                                                                            stepThemeIndex,
                                                                            indexTitle,
                                                                            indexRequirement,
                                                                            indexAnswer,
                                                                            'criticality',
                                                                            criticality
                                                                        )
                                                                    }
                                                                    criticalityLevels={criticalities}
                                                                    criticality={answer.criticality}
                                                                />
                                                                <SubTitleTextArea>
                                                                    Evidências
                                                                </SubTitleTextArea>
                                                                <ContainerTextArea>
                                                                    <TextAreaDefault
                                                                        name={'evidence'}
                                                                        placeholder={'Descreva aqui as evidências'}
                                                                        value={answer.evidence}
                                                                        onChange={({ target: { value } }) =>
                                                                            onChangeAnswer(
                                                                                'unConformities',
                                                                                stepThemeIndex,
                                                                                indexTitle,
                                                                                indexRequirement,
                                                                                indexAnswer,
                                                                                'evidence',
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                </ContainerTextArea>
                                                                <SubTitleTextArea>
                                                                    Oportunidade de melhorias ou nc
                                                                </SubTitleTextArea>
                                                                <ContainerTextArea>
                                                                    <TextAreaDefault
                                                                        name={'opportunity'}
                                                                        placeholder={'Descreva aqui as oportunidades de melhorias'}
                                                                        value={answer.opportunityImprovement}
                                                                        onChange={({ target: { value } }) =>
                                                                            onChangeAnswer(
                                                                                'unConformities',
                                                                                stepThemeIndex,
                                                                                indexTitle,
                                                                                indexRequirement,
                                                                                indexAnswer,
                                                                                'opportunityImprovement',
                                                                                value
                                                                            )
                                                                        }
                                                                    />
                                                                </ContainerTextArea>
                                                            </Fragment>
                                                        );
                                                    }
                                                )}
                                                <ContainerButtonsNC>
                                                    <InfoNC>
                                                        <FiAlertOctagon
                                                            fontSize={16}
                                                            color={'#EB5757'}
                                                        />
                                                        NC/OM reincidente
                                                    </InfoNC>
                                                    <ButtonAddNC
                                                        onClick={() => handleAddUnConformed(stepThemeIndex, indexTitle, indexRequirement)}
                                                    >
                                                        <FiPlusCircle fontSize={16} />
                                                        Adicionar NC
                                                    </ButtonAddNC>
                                                </ContainerButtonsNC>
                                            </Fragment>
                                        )}
                                        {requirement.status === 3 && (
                                            <Fragment>
                                                <SubTitleTextArea>Evidências</SubTitleTextArea>
                                                <ContainerTextArea>
                                                    <TextAreaDefault
                                                        name={'evidence'}
                                                        placeholder={'Descreva aqui as evidências'}
                                                        value={requirement?.answers?.notApplicable?.evidence || ''}
                                                        onChange={({ target: { value } }) =>
                                                            onChangeAnswer(
                                                                'notApplicable',
                                                                stepThemeIndex,
                                                                indexTitle,
                                                                indexRequirement,
                                                                null,
                                                                'evidence',
                                                                value
                                                            )
                                                        }
                                                    />
                                                </ContainerTextArea>
                                            </Fragment>
                                        )}
                                        {requirement?.photos && requirement.photos.length > 0 ? (
                                            <Fragment>
                                                <SubTitleTextArea
                                                    onClick={() => {
                                                        setRequirementPhotoInEditingIndex(indexTitle, indexRequirement);
                                                        history.push(`${location.pathname}/pictures`);
                                                    }}
                                                >
                                                    Fotos da auditoria desse requisito
                                                    <FaPen fontSize={18} />
                                                </SubTitleTextArea>
                                                <Section>
                                                    <ContainerPhotos>
                                                        <ListPhotos>
                                                            {renderPhotos(requirement.photos)}
                                                        </ListPhotos>
                                                    </ContainerPhotos>
                                                </Section>
                                            </Fragment>
                                        ) : (
                                            <ContainerButtonAddPhoto>
                                                <ButtonAddPhoto
                                                    onClick={() => {
                                                        setRequirementPhotoInEditingIndex(indexTitle, indexRequirement);
                                                        history.push(`${location.pathname}/pictures`);
                                                    }}
                                                >
                                                    <FiPlusCircle fontSize={16} />
                                                    Adicionar fotos
                                                </ButtonAddPhoto>
                                            </ContainerButtonAddPhoto>
                                        )}
                                    </Fragment>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </Fragment>
        );
    };

    if (loading) {
        return (
            <Fragment>
                <Header hiddenMobile={true} />
                <Container>
                    <CompanyHeader
                        positionRelative={true}
                        typeAction={'Auditoria em andamento'}
                    />
                    <LoadingContainer text={'Enviando requisitos auditados...'} />
                </Container>
            </Fragment>
        );
    }

    return programmingInEditing && themesInAuditing[stepThemeIndex] ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <CompanyHeader
                    positionRelative={true}
                    onClose={() => setExitModalVisible(true)}
                    typeAction={'Auditoria em andamento'}
                />
                <ScrollContainer>
                    <ScrollMenu
                        data={Menu(themesInAuditing, stepThemeIndex)}
                        arrowLeft={ArrowLeft}
                        arrowRight={ArrowRight}
                        selected={stepThemeIndex}
                        onSelect={(value) => {
                            if (!themesInAuditing[stepThemeIndex]?.submittedAudit && parseInt(value) !== stepThemeIndex) {
                                setInfoModalVisible(true);
                            }

                            onChangeStepAuditing('custom', value);
                        }}
                        clickWhenDrag={true}
                        hideArrows={true}
                        hideSingleArrow={true}
                        scrollToSelected={true}
                        alignCenter={true}
                    />
                </ScrollContainer>
                {themesInAuditing[stepThemeIndex]?.submittedAudit
                    ?
                    <ContainerSend>
                        <FaCheckCircle size={64} color={colors.client} />
                        <TextSend>Esse tema já foi auditado</TextSend>
                    </ContainerSend>
                    :
                    <Content>
                        {renderForm(themesInAuditing[stepThemeIndex])}
                        <FloatingActionButton
                            onClick={() =>
                                history.push({
                                    pathname: '/audit/profile-auditor/start-audit',
                                    state: {
                                        originPage: 'auditing-requirements'
                                    }
                                })
                            }
                            bottom={68}
                            right={12}
                            position={'absolute'}
                            backgroundColor={'#FAA50A'}
                            size={21}
                            color={'#FFF'}
                            icon={<FiPaperclip />}
                        />
                    </Content>
                }
                <NextButton
                    positionRelative={true}
                    nextDisabled={loading}
                    onBack={() => setExitModalVisible(true)}
                    onNext={() => {
                        if (themesInAuditing[stepThemeIndex]?.submittedAudit) {
                            handleSubmit();
                        } else if (validateData()) {
                            setConfirmModalVisible(true);
                        }
                    }}
                    nextLabel={
                        themesInAuditing[stepThemeIndex]?.submittedAudit
                            ? themesInAuditing.length === (stepThemeIndex + 1)
                                ? 'Ir para requisitos aplicáveis'
                                : 'Próximo tema'
                            : 'Enviar requisitos'
                    }
                />
            </Container>
            <ModalComplex
                nameModal={'question-info'}
                visible={modalInfo.visible}
                onCancel={() => setModalInfo((state) => ({ ...state, visible: false }))}
                onConfirm={() => setModalInfo((state) => ({ ...state, visible: false }))}
                confirmButtonLabel={'Ok, entendi'}
                uniqueFooterButton={true}
            >
                <ContainerModal>
                    <TitleModal>Saiba mais</TitleModal>
                    <DescriptionModal>{modalInfo.info}</DescriptionModal>
                </ContainerModal>
            </ModalComplex>
            <ModalComplex
                nameModal={'confirm-modal'}
                visible={confirmModalVisible}
                onConfirm={handleSubmit}
                onCancel={() => setConfirmModalVisible(false)}
                confirmButtonLabel={'Confirmar'}
                cancelButtonLabel={'Voltar'}
                title={'Deseja finalizar esse requisito?'}
                description={'Essa ação não poderá ser desfeita.'}
                icon={<FiAlertCircle color={'#00B247'} />}
                uniqueFooterButton={false}
            />
            <ModalComplex
                nameModal={'exit-modal'}
                visible={exitModalVisible}
                onConfirm={history.goBack}
                onCancel={() => setExitModalVisible(false)}
                confirmButtonLabel={'Confirmar'}
                cancelButtonLabel={'Voltar'}
                title={'Tem certeza que deseja sair?'}
                description={'As informações não salvas serão perdidas.'}
                icon={<FiX color={'rgb(235, 87, 87)'} />}
                uniqueFooterButton={false}
            />
            <ModalComplex
                nameModal={'info-modal'}
                visible={infoModalVisible}
                onConfirm={() => setInfoModalVisible(false)}
                onCancel={() => setInfoModalVisible(false)}
                confirmButtonLabel={'Ok!'}
                title={'Importante'}
                description={'Não se esqueça de retornar ao tema anterior e enviá-lo, pois ele não foi salvo.'}
                icon={<FiAlertCircle color={'#F2994A'} />}
                uniqueFooterButton={true}
            />
            <ModalComplex
                nameModal={'info-registers-modal'}
                visible={infoRegistersModalVisible}
                onConfirm={history.goBack}
                onCancel={() => setInfoRegistersModalVisible(false)}
                confirmButtonLabel={'Confirmar'}
                cancelButtonLabel={'Voltar'}
                title={'Tem certeza que deseja sair?'}
                description={'Ainda existe requisitos que não foram enviados.'}
                icon={<FiX color={'rgb(235, 87, 87)'} />}
            />
        </Fragment>
    ) : <Redirect to={'/audit/profile-auditor'} />;
}

export default inject(
    'AuditProfileAuditorStore'
)(observer(AuditPendingViewAnnotations));
