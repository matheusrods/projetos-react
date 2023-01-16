import { inject, observer } from 'mobx-react';
import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { FiAlertCircle } from 'react-icons/fi';
import {
    CircleCheckbox,
    Divisor,
    TextAreaDefault,
    WhiteHeaderBack,
    NextButton,
    SingleNextButton
} from '../../../../../components/atoms';
import {
    ModalComplex,
    CompletionSuccess
} from '../../../../../components/molecules';
import { getEmployees } from '../../../../../services/endpoints/users';
import { ButtonMultiSelect } from '../../../../../components/organisms';
import { FaHome } from 'react-icons/fa';
import {
    Container,
    Content,
    Title,
    Card,
    CardHeader,
    CardTitle,
    CardSubTitle,
    CardDetails,
    CardDetailsValue,
    CardBody,
    Iso,
    Id,
    CardBodyText,
    CardBodyTitle,
    CardBodyQuestion,
    CheckboxLabel,
    JustificationTitle,
    Team,
    ContainerSuccess,
    ContainerContent
} from './styles';

function IndicatedNCOMResponsibleProcess({ Auditing }) {
    const history = useHistory();

    const { 
        unConformityAudit = null, 
        unConformityRequirement = null,
        setUnConformityRequirementInDeal: onChangeUnConformityRequirementInDeal,
        sendUnConformityRequirementDeal,
        resetUnConformityRequirementInDeal
    } = Auditing;

    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [usersResponsibles, setUsersResponsibles] = useState([]);

    const validation = (selectedUsers) => {
        if (unConformityRequirement.responsibleAnalisys === '' || !unConformityRequirement.responsibleAnalisys) {
            return false;
        }

        if (!selectedUsers.length && unConformityRequirement.isValid === 0) {
            return false
        }

        return true;
    };

    const handleSubmit = async () => {
        try {
            setLoadingSubmit(true);

            const selectedUsers = usersResponsibles.filter((user) => user.selected).map(({ id }) => ({ codigo: id }))

            const isValidated = validation(selectedUsers);

            if (!isValidated) {
                setAlertModalVisible(true);
                return setLoadingSubmit(false);
            }

            const response = await sendUnConformityRequirementDeal(selectedUsers);

            setLoadingSubmit(false);
            
            if (response) {
                resetUnConformityRequirementInDeal();
                setCompleted(true);
            }
        } catch (error) {
            setLoadingSubmit(false);
        }
    };

    useEffect(() => {
        const getData = async () => {
            const response = await getEmployees({ userPermission: 36 });

            if (response?.employees && Array.isArray(response.employees)) {
                setUsersResponsibles(response.employees);
            }
        };

        getData();
    }, [])

    const handleSaveTeam = (items) => {
        setUsersResponsibles([...items]);
        return 'saved';
    };

    if (completed) {
        return (
            <ContainerSuccess>
                <ContainerContent>
                    <CompletionSuccess
                        title={
                            'Sua análise foi enviada com sucesso!'
                        }
                        description={
                            'Você será redirecionado para a tela inicial'
                        }
                        redirectTime={5000}
                        fullscreen={completed}
                        redirectTo={() => history.go(-2)}
                    />
                </ContainerContent>
                <SingleNextButton
                    positionRelative={true}
                    onNext={() => () => history.go(-2)}
                    nextLabel={'Ir para início'}
                    icon={<FaHome />}
                />
            </ContainerSuccess>
        );
    } else {
        return (
            <Fragment>
                <WhiteHeaderBack title={'NC/OM'} onBack={() => history.goBack()} />
                <Container>
                    <Content>
                        <Title>NC/OM apontadas</Title>
                        <Card>
                            <CardHeader>
                                <CardTitle>Área de atuação: {unConformityAudit?.areaDescription}</CardTitle>
                                <CardSubTitle>{unConformityAudit?.auditableProcessesLabel}</CardSubTitle>
                            </CardHeader>
                            <Divisor />
                            <CardDetails>
                                <CardDetailsValue>{unConformityRequirement?.dateInclusionFormatted}</CardDetailsValue>
                                <CardDetailsValue>{unConformityAudit.unity?.fantasyName}</CardDetailsValue>
                            </CardDetails>
                            <Divisor />
                            <CardBody>
                                <Iso>{unConformityRequirement?.themeTitle}</Iso>
                                <Id>ID #{unConformityRequirement?.requirementAuditedId}</Id>
                                <CardBodyText>
                                    {unConformityRequirement.orderLabel}. {unConformityRequirement.requirementTitle} 
                                </CardBodyText>
                                <CardBodyTitle>Evidências</CardBodyTitle>
                                {unConformityRequirement?.classifications.map((classification, index) => (
                                    <CardBodyText key={index}>
                                        {classification.evidence}
                                    </CardBodyText>)
                                )}

                                <Divisor />
                                
                                <CardBodyTitle>
                                    Oportunidades de melhoria
                                </CardBodyTitle>
                                {unConformityRequirement?.classifications.map((classification, index) => (
                                    <CardBodyText key={index}>
                                        {classification.opportunityImprovement}
                                    </CardBodyText>)
                                )}

                                <Divisor />

                                {unConformityRequirement.isValid === 0 &&
                                    <Team>
                                        <ButtonMultiSelect
                                            name={'team'}
                                            fieldName={
                                                'Responsáveis pela tratativa'
                                            }
                                            pageTitle={'Selecionar responsáveis'}
                                            labelSearchInput={
                                                'Responsáveis pela tratativa'
                                            }
                                            category={'checkbox'}
                                            fieldsFilter={['name']}
                                            single={false}
                                            items={usersResponsibles}
                                            onSave={handleSaveTeam}
                                            showSelectedInTag={false}
                                        />
                                    </Team>
                                }
                                <CardBodyQuestion>
                                    <CheckboxLabel>
                                        <CircleCheckbox
                                            checked={unConformityRequirement.isValid === 1}
                                            onChange={() => {
                                                onChangeUnConformityRequirementInDeal('isValid', 1)
                                                setUsersResponsibles([])
                                            }}
                                            name="validate"
                                        />
                                        <CardBodyText
                                            margin="0 0 0 8px"
                                            display="inline"
                                        >
                                            Validar
                                        </CardBodyText>
                                    </CheckboxLabel>
                                    <CheckboxLabel margin="0 0 0 16px">
                                        <CircleCheckbox
                                            checked={unConformityRequirement.isValid === 0}
                                            onChange={() => onChangeUnConformityRequirementInDeal('isValid', 0)}
                                            name="not-validate"
                                        />
                                        <CardBodyText
                                            margin="0 0 0 8px"
                                            display="inline"
                                        >
                                            Não Validar
                                        </CardBodyText>
                                    </CheckboxLabel>
                                </CardBodyQuestion>
                                <JustificationTitle>
                                    Justificativa
                                </JustificationTitle>
                                <TextAreaDefault
                                    name={'justification'}
                                    placeholder="Descreva aqui o motivo da validação ou não validação"
                                    value={unConformityRequirement.responsibleAnalisys}
                                    onChange={({ target }) =>
                                        onChangeUnConformityRequirementInDeal('responsibleAnalisys', target.value)
                                    }
                                />
                            </CardBody>
                        </Card>
                    </Content>
                    <NextButton
                        nextLabel="Avançar"
                        onBack={() => {
                            history.goBack();
                        }}
                        onNext={() => handleSubmit()}
                        loading={loadingSubmit}
                        positionRelative={true}
                    />
                    <ModalComplex
                        nameModal={'alert-modal'}
                        visible={alertModalVisible}
                        onConfirm={() => setAlertModalVisible(false)}
                        title={'Preencha os campos!'}
                        description={`Todos os campos são obrigatórios`}
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

export default inject('Auditing')(observer(IndicatedNCOMResponsibleProcess));
