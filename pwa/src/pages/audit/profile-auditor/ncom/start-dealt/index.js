import React, { Fragment, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
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
import { ButtonMultiSelect } from '../../../../../components/organisms';
import { getEmployees } from '../../../../../services/endpoints/users';
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

function IndicatedNCOMProfileAuditor({ AuditProfileAuditorStore }) {
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
    const [usersResponsibles, setUsersResponsibles] = useState([]);

    const validationJustification = () => {
        if (themeInDeal.justification === '' || !themeInDeal.justification) {
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        try {
            setLoadingSubmit(true);

            const isValidated = validationJustification();
            const selectedUsers = usersResponsibles.filter((user) => user.selected).map(({ id }) => ({ codigo: id }))

            if (!isValidated || !selectedUsers.length) {
                setAlertModalVisible(true);
                return setLoadingSubmit(false);
            }

            const response = await sendPointedRequirementsThemeAudited(selectedUsers)

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
        const getData = async () => {
            const response = await getEmployees({ userPermission: 36 });

            if (response?.employees && Array.isArray(response.employees)) {
                setUsersResponsibles(response.employees);
            }
        };

        getData();
    }, [])

    useEffect(() => {
        setProgramming(programmingInEditing)
    }, [programmingInEditing])

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
                            'Tratativa de NC/OM enviada ao responsável com sucesso!'
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
                <WhiteHeaderBack
                    title={'Auditorias com NC/OM'}
                    onBack={() => {
                        resetPointedRequirement()
                        history.goBack()
                    }}
                />
                <Container>
                    <Content>
                        <Fragment>
                            <Title>NC/OM apontadas</Title>
                            <Card>
                                <CardHeader>
                                    <CardTitle>
                                        Área de atuação: {programming.areaDescription}
                                    </CardTitle>
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

                                    <CardBodyTitle>
                                        Oportunidades de melhoria
                                    </CardBodyTitle>
                                    {themeInDeal?.classifications.map((classification, index) => (
                                        <CardBodyText key={index}>
                                            {classification.opportunityImprovement}
                                        </CardBodyText>)
                                    )}

                                    <Divisor />

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
                                    <CardBodyQuestion>
                                        <CheckboxLabel>
                                            <CircleCheckbox
                                                checked={themeInDeal.isValid === 1}
                                                onChange={() => onChangePointedRequirement('isValid', 1)}
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
                                                checked={themeInDeal.isValid === 0}
                                                onChange={() => onChangePointedRequirement('isValid', 0)}
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
                                        placeholder="Descreva aqui o motivo da recusa ou aceite"
                                        value={themeInDeal.justification}
                                        onChange={({ target }) =>
                                            onChangePointedRequirement('justification', target.value)
                                        }
                                    />
                                </CardBody>
                            </Card>
                        </Fragment>
                    </Content>
                    <NextButton
                        nextLabel="Avançar"
                        onBack={() => history.goBack()}
                        onNext={() => handleSubmit()}
                        loading={loadingSubmit}
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

export default inject('AuditProfileAuditorStore')(observer(IndicatedNCOMProfileAuditor));
