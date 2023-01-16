import { flowResult } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { Fragment, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import {
    CircleCheckbox,
    Divisor,
    TextAreaDefault,
    WhiteHeaderBack,
    NextButton
} from '../../../../../../components/atoms';
import { LoadingContainer } from '../../../../../../components/molecules';
import { ButtonMultiSelect } from '../../../../../../components/organisms';
import { postPointedRequirementsThemeAudited } from '../../../../../../services/endpoints/audit/profile-auditor';
import { getEmployees } from '../../../../../../services/endpoints/users';
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
    Team
} from './styles';

function IndicatedNCOMHeadQuality({ Auditing, UserStore }) {
    const history = useHistory();

    const { unConformityAudit = null, unConformityRequirement = null, setUnConformity, setUnConformityRequirement } = Auditing;
    const { user } = UserStore || {};

    const [usersResponsible, setUsersResponsible] = useState([]);
    const [validate, setValidate] = useState(true);
    const [justification, setJustification] = useState('');
    const [loading, setLoading] = useState(true);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const handleCheckboxChange = () => setValidate((old) => !old);

    const validationJustification = () => {
        if (justification === '' || usersResponsible.filter(user => user.selected).length === 0) {
            return false;
        }

        return true;
    };

    const handleSubmit = async () => {
        try {
            setLoadingSubmit(true);

            const data = {
                codigo_auditoria_programacao: unConformityAudit.id,
                codigo_auditoria_programacao_tema_auditado_requisito: unConformityRequirement.requirementAuditedId,
                valida: validate ? 1 : 0,
                justificativa: justification,
                responsaveis: usersResponsible.filter(user => user.selected).map(({ id }) => ({ codigo: id }))
            };

            const response = await postPointedRequirementsThemeAudited(data, 'head-quality');

            if (response.error) {
                setLoadingSubmit(false);
                return;
            }

            if (!response.error) {
                await flowResult(
                    Auditing.fetch(
                        { codigo_unidade: user.clientId },
                        'head-quality'
                    )
                );

                if (Auditing.state === 'done') {
                    const programmings = JSON.parse(JSON.stringify(Auditing.programmings));

                    const { unConformities = [] } = programmings;

                    const unConformity = unConformities.find(i => i.id === unConformityAudit.id) || null;

                    if (unConformity) {
                        history.goBack();
                    } else if (unConformities) {
                        history.go(-2);
                    } else {
                        history.push('/audit/head-quality');
                    }

                    setUnConformity(unConformity);
                    setUnConformityRequirement(null);
                }

                if (Auditing.state === 'error') {
                    history.push('/audit/head-quality');
                }
            }

            setLoadingSubmit(false);
        } catch (error) {
            setLoadingSubmit(false);
        }
    };

    const handleSaveTeam = (items) => {
        setUsersResponsible([...items]);
    };

    useEffect(() => {
        const getData = async () => {
            const response = await getEmployees({ userPermission: 36 });

            if (response?.employees && Array.isArray(response.employees)) {
                setUsersResponsible(response.employees);
            }

            setLoading(false);
        };

        getData();
    }, []);

    return unConformityAudit && unConformityRequirement ? (
        <Fragment>
            <WhiteHeaderBack
                title={'Auditorias com NC/OM'}
                onBack={history.goBack}
            />
            <Container>
                {loading ? (
                    <LoadingContainer />
                ) : (
                    <Content>
                        <Title>NC/OM apontadas</Title>
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    Área de atuação: {unConformityAudit?.areaDescription}
                                </CardTitle>
                                <CardSubTitle>{unConformityAudit?.auditableProcessesLabel}</CardSubTitle>
                            </CardHeader>
                            <Divisor />
                            <CardDetails>
                                <CardDetailsValue>{unConformityRequirement?.dateInclusionFormatted}</CardDetailsValue>
                                <CardDetailsValue>{unConformityAudit?.unity?.fantasyName}</CardDetailsValue>
                            </CardDetails>
                            <Divisor />
                            <CardBody>
                                <Iso>{unConformityRequirement?.themeTitle}</Iso>
                                <Id>ID #{unConformityRequirement?.requirementAuditedId}</Id>
                                <CardBodyText>
                                    {unConformityRequirement?.orderLabel} {unConformityRequirement?.title}
                                </CardBodyText>
                                <CardBodyTitle>Evidências</CardBodyTitle>
                                {unConformityRequirement?.classifications?.map((classification, index) => (
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
                                <Team>
                                    <ButtonMultiSelect
                                        name={'team'}
                                        fieldName={'Responsáveis pela tratativa'}
                                        pageTitle={'Selecionar responsáveis'}
                                        labelSearchInput={'Responsáveis pela tratativa'}
                                        category={'checkbox'}
                                        fieldsFilter={['name']}
                                        single={false}
                                        items={usersResponsible}
                                        onSave={handleSaveTeam}
                                        showSelectedInTag={false}
                                    />
                                </Team>
                                <CardBodyQuestion>
                                    <CheckboxLabel>
                                        <CircleCheckbox
                                            checked={validate}
                                            onChange={handleCheckboxChange}
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
                                            checked={!validate}
                                            onChange={handleCheckboxChange}
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
                                    value={justification}
                                    onChange={({ target }) => setJustification(target.value)}
                                />
                            </CardBody>
                        </Card>
                    </Content>
                )}
                <NextButton
                    nextLabel="Avançar"
                    onBack={history.goBack}
                    onNext={handleSubmit}
                    loading={loadingSubmit}
                    nextDisabled={!validationJustification() || loadingSubmit}
                    positionRelative={true}
                />
            </Container>
        </Fragment>
    ) : <Redirect to={'/audit/head-quality'} />;
}

export default inject('Auditing', 'UserStore')(observer(IndicatedNCOMHeadQuality));
