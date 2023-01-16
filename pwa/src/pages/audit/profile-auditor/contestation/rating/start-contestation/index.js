import React, { Fragment, useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';
import { ConfirmCancelFooter } from '../../../../../../components/organisms';
import { FaHome } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';
import {
    CircleCheckbox,
    CompanyHeader,
    Divisor,
    SingleNextButton,
    TextAreaDefault
} from '../../../../../../components/atoms';
import {    
    CompletionSuccess,
    ModalComplex
} from '../../../../../../components/molecules';
import {
    Card,
    CardHeader,
    CardTitle,
    CardSubTitle,
    CardDetails,
    CardDetailsValue,
    CardBody,
    CardBodyText,
    CardBodyTitle,
    CardBodyQuestion,
    CheckboxLabel,
    Container,
    ContainerSuccess,
    Content,
    Id,
    Iso,
    JustificationTitle,
    Title
    
} from './styles';
import colors from '../../../../../../styles/colors';

function StartRateContestedAudit({ AuditProfileAuditorStore }) {
    const history = useHistory();

    const {
        programmingInEditing = null,
        themeInDeal = null,
        setPointedRequirement: onChangePointedRequirement,
        resetPointedRequirement,
        sendPointedRequirementsThemeAudited
    } = AuditProfileAuditorStore;

    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [programming, setProgramming] = useState(false);

    const validationJustification = () => {
        if (themeInDeal.justification_contestation === '' || !themeInDeal.justification_contestation) {
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        try {
            setLoadingSubmit(true);

            const isValidated = validationJustification();

            if (!isValidated) {
                setAlertModalVisible(true);
                return setLoadingSubmit(false);
            }

            const response = sendPointedRequirementsThemeAudited()

            setLoadingSubmit(false);

            if (response) {
                resetPointedRequirement();
                setCompleted(true);
            }
        } catch (error) {
            setLoadingSubmit(false);
        }
    };

    useEffect(() => {
        setProgramming(programmingInEditing)
    }, [programmingInEditing])

    if (completed) {
        return (
            <Fragment>
                <ContainerSuccess>
                    <CompanyHeader
                        positionRelative={true}
                        onClose={() => history.push('/audit/profile-auditor')}
                        typeAction={'Avaliação de contestações'}
                    />
                    <Content>
                        <CompletionSuccess
                            title="Enviado!"
                            subtitle="Sua análise foi enviada com sucesso!"
                            redirectTime={3000}
                            redirectTo={() =>
                                history.push('/audit/profile-auditor')
                            }
                        />
                    </Content>
                    <SingleNextButton
                        positionRelative={true}
                        onNext={() => () => history.go(-2)}
                        nextLabel={'Ir para início'}
                        icon={<FaHome />}
                    />
                </ContainerSuccess>
            </Fragment>
        )
    } else {
        return (
            <Fragment>
                <Container>
                    <CompanyHeader
                        positionRelative={true}
                        onClose={() => {
                            resetPointedRequirement();
                            history.goBack()
                        }}
                        typeAction={'Avaliação de contestações'}
                    />
                    <Content>
                        <Title>NC/OM contestada </Title>
                        <Card>
                            <CardHeader>
                                <CardTitle>Área de atuação: {programming.areaDescription}</CardTitle>
                                <CardSubTitle>{programming?.auditableProcessesLabel}</CardSubTitle>
                            </CardHeader>
                            <Divisor />
                            <CardDetails>
                                <CardDetailsValue>{themeInDeal.dateInclusionFormatted}</CardDetailsValue>
                                <CardDetailsValue>{programming.unity?.fantasyName}</CardDetailsValue>
                            </CardDetails>
                            <Divisor />
                            <CardBody>
                                <Iso>{themeInDeal.themeTitle}</Iso>
                                <Id>ID #{themeInDeal.requirementAuditedId}</Id>
                                <CardBodyText>
                                    {themeInDeal.orderLabel} {themeInDeal.title}
                                </CardBodyText>
    
                                <Divisor />
    
                                <CardBodyTitle>Evidências</CardBodyTitle>
                                {themeInDeal?.classifications.map((classification, index) => (
                                    <CardBodyText key={index}>
                                        {classification.evidence}
                                    </CardBodyText>)
                                )}
                                
                                <Divisor />
                                
                                <CardBodyTitle>Motivo da recusa</CardBodyTitle>
                                <CardBodyText>
                                    {themeInDeal.deal.justification}
                                </CardBodyText>
    
                                <CardBodyQuestion>
                                    <CardBodyText style={{ marginBottom: '24px' }}>
                                        Você aceita o motivo da recusa?
                                    </CardBodyText>
                                    <CheckboxLabel>
                                        <CircleCheckbox
                                            checked={themeInDeal.isAccepted === 1}
                                            onChange={() => onChangePointedRequirement('isAccepted', 1)}
                                            name="yes"
                                        />
                                        <CardBodyText
                                            margin="0 0 0 8px"
                                            display="inline"
                                        >
                                            Sim
                                        </CardBodyText>
                                    </CheckboxLabel>
                                    <CheckboxLabel margin="0 0 0 16px">
                                        <CircleCheckbox
                                            checked={themeInDeal.isAccepted === 0}
                                            onChange={() => onChangePointedRequirement('isAccepted', 0)}
                                            name="no"
                                        />
                                        <CardBodyText
                                            margin="0 0 0 8px"
                                            display="inline"
                                        >
                                            Não
                                        </CardBodyText>
                                    </CheckboxLabel>
                                </CardBodyQuestion>
                                <JustificationTitle>
                                    Justificativa
                                </JustificationTitle>
                                <TextAreaDefault
                                    name={'justification'}
                                    placeholder="Descreva aqui o motivo da recusa ou aceite"
                                    value={themeInDeal.justification_contestation}
                                    onChange={({ target }) =>
                                        onChangePointedRequirement('justification_contestation', target.value)
                                    }
                                />
                            </CardBody>
                        </Card>
                    </Content>
                    <ConfirmCancelFooter
                        confirmButtonLabel={'Enviar'}
                        cancelButtonLabel={'Cancelar'}
                        cancelButtonLabelColor={colors.gray6}
                        onCancel={() => history.goBack()}
                        onConfirm={() => handleSubmit()}
                        confirmButtonLoading={loadingSubmit}
                        positionRelative={true}
                    />
                    <ModalComplex
                        nameModal={'alert-modal'}
                        visible={alertModalVisible}
                        onConfirm={() => setAlertModalVisible(false)}
                        title={'Preencha os campos!'}
                        description={`O campo justificativa é obrigatório`}
                        confirmButtonLabel={'Ok !'}
                        icon={<FiAlertCircle />}
                        uniqueFooterButton={true}
                        onCancel={() => setAlertModalVisible(false)}
                    ></ModalComplex>
                </Container>
            </Fragment>
        );
    }
}

export default inject('AuditProfileAuditorStore')(observer(StartRateContestedAudit));
