/* eslint-disable array-callback-return */
import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { inject, observer } from 'mobx-react';
import {
    Accordion,
    NextButton,
    WhiteHeaderBack,
    SingleNextButton
} from '../../../../components/atoms';
import CheckboxGroup from '../../../../components/molecules/checkbox-group';
import { ButtonMultiSelect } from '../../../../components/organisms';
import colors from '../../../../styles/colors';

import {
    Container,
    ContainerHeader,
    ContainerHeaderTitle,
    ContainerHeaderSubTitle,
    H2,
    Requests,
    Request,
    RequestTitle,
    AccordionInfo,
    RequestItem,
    InputContainer,
    ContainerText,
    ContainerContent,
    ContainerSuccess
} from './styles';
import { FaHome } from 'react-icons/fa';
import {
    LoadingContainer,
    ModalComplex
} from '../../../../components/molecules';
import { CompletionSuccess } from '../../../../components/molecules';
import { getProcessForNewAudit } from '../../../../services/endpoints/audit/process-new-audit';
import { getAreasOperation } from '../../../../services/endpoints/audit/areas-operation';
import { getClientsByUserId } from '../../../../services/endpoints/users';
import { FiAlertCircle } from 'react-icons/fi';
import { finalValidation } from '../../../../services/endpoints/audit/ses/final-validation';

const AuditEdit = ({ NewAudit, UserStore, location }) => {
    const history = useHistory();

    const {
        area,
        process,
        locale,
        bus,
        opco,
        requirements,
        setAreas,
        setProcesses,
        setLocale,
        setBus,
        setOpco,
        setRequirements,
        setRequirementsSelected,
        getFormattedAudit,
        getSelectedAreas,
        getSelectedProcesses,
        getSelectedLocaleName
    } = NewAudit;

    const [selectedOption, setSelectedOption] = useState(
        location.state?.audit?.auditableRequirements
    );

    const { user } = UserStore;

    const [audit] = useState(location.state?.audit);
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [completed, setCompleted] = useState(false);

    const [selectedArea, setSelectedArea] = useState(area);
    const [selectedAreas, setSelectedAreas] = useState([]);

    const [selectedRequirements, setSelectedRequirements] =
        useState(requirements);
    const [selectedProcess, setSelectedProcess] = useState(process);

    const [selectedLocale, setSelectedLocale] = useState(locale);
    const [selectedBusinessUnits, setSelectedBusinessUnits] = useState(bus);
    const [selectedOpcos, setSelectedOpcos] = useState(opco);

    const [alertModalVisible, setAlertModalVisible] = useState(false);
    const originalPage = location?.state?.originalPage ?? 'ses';

    const handleSubmit = async () => {
        const isValidated = () => {
            if (
                !getSelectedAreas() ||
                !getSelectedProcesses() ||
                !getSelectedLocaleName() ||
                !selectedOption.length
            ) {
                setAlertModalVisible(true);
                setLoadingSubmit(false);
                return false;
            }

            return true;
        };

        const isValidatedSelectedRequirements = (audits) => {
            const isNotValid = audits.find((audit, index) => {
                if (
                    audit.processos_auditaveis.length === 0 ||
                    audit.requisitos_auditaveis.length === 0
                ) {
                    return index;
                }
            });

            if (isNotValid) {
                setAlertModalVisible(true);
                setLoadingSubmit(false);
                return false;
            }

            return true;
        };

        try {
            setLoadingSubmit(true);

            setAreas(selectedArea);
            setProcesses(selectedProcess);
            setLocale(selectedLocale);
            setBus(selectedBusinessUnits);
            setOpco(selectedOpcos);
            setRequirementsSelected(selectedOption);

            if (!isValidated()) {
                return;
            }

            const formattedAudits = getFormattedAudit();

            if (!isValidatedSelectedRequirements(formattedAudits)) {
                return;
            }

            const response = await finalValidation(
                formattedAudits[0],
                audit.id
            );

            if (response) {
                setLoadingSubmit(false);
                toast.success('Programações editada com sucesso!');
                setCompleted(true);
            }
        } catch (error) {
            setLoadingSubmit(false);
        }

        setLoadingSubmit(false);
    };

    const fetchData = useCallback(async () => {
        setLoading(true);

        if (!selectedArea.length) {
            const areasOptions = await getAreasOperation(user.clientId);

            let formattedAreas = areasOptions.formattedAreas.map((item) => {
                if (item.name === audit.areaDescription) {
                    item.selected = true;
                }

                return item;
            });

            setSelectedArea(formattedAreas);

            const selectedAreas = formattedAreas
                .filter((item) => item.selected)
                .map((filteredItem) => filteredItem.id);
            setSelectedAreas(selectedAreas);

            const processOptions = await getProcessForNewAudit(
                user.clientId,
                selectedAreas
            );
            let selectedProcessesId = [];

            audit?.auditableProcesses.filter((process) =>
                selectedProcessesId.push(process.id)
            );

            let selectedProcesses = [];
            let themes = [];

            let processesFormatted = processOptions.processesFormatted.map(
                (process) => {
                    if (selectedProcessesId.includes(process.id)) {
                        selectedProcesses.push(process);
                        process.selected = true;
                    }

                    return process;
                }
            );

            selectedProcesses.map((item) =>
                item.themes.map((theme) => themes.push(theme))
            );

            let requirementsId = [];
            let filteredRequirements = themes.filter(
                (requirement, index, self) =>
                    index ===
                    self.findIndex((t) => {
                        if (t.id === requirement.id) {
                            requirementsId.push(requirement.id);
                            return t;
                        }
                    })
            );

            setRequirements(filteredRequirements);
            setSelectedRequirements(filteredRequirements);

            setSelectedProcess(processesFormatted);
        }

        if (!selectedLocale.length) {
            const localeOptions = await getClientsByUserId(user.id);

            if (localeOptions?.clients) {
                let unitSelected = null;
                let unitsFormatted = localeOptions.clients[0]?.units.map(
                    (item) => {
                        if (item.id === audit.unity.id) {
                            unitSelected = item;
                            item.selected = true;
                        }

                        return item;
                    }
                );

                setSelectedLocale(unitsFormatted);

                if (
                    Array.isArray(unitsFormatted) &&
                    unitsFormatted.length > 0
                ) {
                    if (unitSelected) {
                        if (
                            unitSelected?.businessUnits &&
                            unitSelected.businessUnits.length > 0
                        ) {
                            let businessUnitSelected = null;
                            let businessUnitsFormatted =
                                unitSelected?.businessUnits.map(
                                    (businessUnit) => {
                                        if (
                                            businessUnit.id ===
                                            audit.businessUnit.id
                                        ) {
                                            businessUnitSelected = businessUnit;
                                            businessUnit.selected = true;
                                        }

                                        return businessUnit;
                                    }
                                );

                            setSelectedBusinessUnits(businessUnitsFormatted);

                            if (businessUnitSelected) {
                                const opcosData = unitSelected
                                    ? unitSelected.opcos.filter(
                                          (item) =>
                                              item.businessUnitId ===
                                              businessUnitSelected.id
                                      )
                                    : [];

                                let opcosFormatted = opcosData.map((opco) => {
                                    if (opco.id === audit.opco.id) {
                                        opco.selected = true;
                                    }

                                    return opco;
                                });

                                setSelectedOpcos(opcosFormatted);
                            } else {
                                setSelectedOpcos([]);
                            }
                        } else {
                            setSelectedBusinessUnits([]);
                        }
                    }
                }
            }
        }

        setLoading(false);
    }, [
        selectedLocale,
        selectedArea,
        user,
        audit.areaDescription,
        audit?.auditableProcesses,
        audit.businessUnit.id,
        audit.opco.id,
        audit.unity.id,
        setRequirements
    ]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const fetchProcess = useCallback(
        async (selectedAreas) => {
            const processOptions = await getProcessForNewAudit(
                user.clientId,
                selectedAreas
            );

            setSelectedProcess(processOptions?.processesFormatted);
        },
        [user]
    );

    const handleSaveArea = async (items) => {
        let selectedAreas = items
            .filter((item) => item.selected)
            .map((filteredItem) => filteredItem.id);

        setSelectedAreas(selectedAreas);
        setSelectedArea([...items]);

        if (selectedAreas.length !== 0) {
            await fetchProcess(selectedAreas);
        } else {
            setSelectedProcess([]);
        }

        return 'saved';
    };

    const handleSaveProcess = useCallback(
        (items) => {
            let selectedProcesses = items.filter((item) => item.selected);

            let themes = [];
            selectedProcesses.map((item) =>
                item.themes.map((theme) => themes.push(theme))
            );

            let filteredRequirements = themes.filter(
                (requirement, index, self) =>
                    index === self.findIndex((t) => t.id === requirement.id)
            );

            setRequirements(filteredRequirements);
            setSelectedRequirements(filteredRequirements);
            setSelectedProcess([...items]);

            return 'saved';
        },
        [setRequirements]
    );

    const handleSaveLocale = (items) => {
        if (Array.isArray(items) && items.length > 0) {
            const oldUnit = selectedLocale.find((i) => i.selected);
            const unit = items.find((i) => i.selected);

            if (!oldUnit || oldUnit?.id !== unit?.id) {
                if (unit?.businessUnits && unit.businessUnits.length > 0) {
                    setSelectedBusinessUnits([...unit.businessUnits]);
                } else {
                    setSelectedBusinessUnits([]);
                }

                setSelectedOpcos([]);
            }
        }

        setSelectedLocale([...items]);

        return 'saved';
    };

    const handleSaveOpcos = (items) => {
        setSelectedOpcos([...items]);
    };

    const handleSaveBusinessUnits = (items) => {
        const itemSelected = items.find((item) => item.selected);

        setSelectedBusinessUnits([...items]);

        if (itemSelected) {
            const location = selectedLocale.find((item) => item.selected);

            const opcosData = location
                ? location.opcos.filter(
                      (item) => item.businessUnitId === itemSelected.id
                  )
                : [];

            setSelectedOpcos([...opcosData]);
        } else {
            setSelectedOpcos([]);
        }

        return 'saved';
    };

    if (completed) {
        return (
            <ContainerSuccess>
                <ContainerContent>
                    <CompletionSuccess
                        title={
                            originalPage !== 'hq'
                                ? 'Programação de auditoria finalizada com sucesso!'
                                : 'Programação de auditoria reagendada com sucesso!'
                        }
                        description={
                            'Você será redirecionado para a tela inicial'
                        }
                        redirectTime={5000}
                        fullscreen={completed}
                        redirectTo={() => {
                            if (originalPage === 'ses') {
                                history.push('/audit/ses');
                                NewAudit.reset();
                            } else if (originalPage === 'hq') {
                                history.push('/audit/head-quality');
                            } else {
                                history.push('/audit/ses');
                                NewAudit.reset();
                            }
                        }}
                    />
                </ContainerContent>
                <SingleNextButton
                    positionRelative={true}
                    onNext={() => {
                        if (originalPage === 'ses') {
                            history.push('/audit/ses');
                            NewAudit.reset();
                        } else if (originalPage === 'hq') {
                            history.push('/audit/head-quality');
                        } else {
                            history.push('/audit/ses');
                            NewAudit.reset();
                        }
                    }}
                    nextLabel={'Ir para início'}
                    icon={<FaHome />}
                />
            </ContainerSuccess>
        );
    } else {
        return (
            <>
                <WhiteHeaderBack
                    title={'Programação de Auditoria'}
                    onBack={() => history.goBack()}
                />
                <Container>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <>
                            <ContainerText>
                                <ContainerHeader>
                                    <ContainerHeaderTitle>
                                        Editar Plano de Auditoria {audit?.type}
                                    </ContainerHeaderTitle>
                                    <ContainerHeaderSubTitle>
                                        Insira as informações do processo a ser
                                        auditado.
                                    </ContainerHeaderSubTitle>
                                </ContainerHeader>
                                <InputContainer>
                                    <ButtonMultiSelect
                                        name={'areas-of-operation'}
                                        fieldName={'Áreas de atuação'}
                                        pageTitle={
                                            'Selecionar áreas de atuação'
                                        }
                                        labelSearchInput={'Áreas de atuação'}
                                        category={'checkbox'}
                                        fieldsFilter={['name']}
                                        single={true}
                                        items={selectedArea}
                                        onSave={handleSaveArea}
                                        showSelectedInTag={false}
                                        placeholderSearchInput={
                                            'Escolha a área de atuação'
                                        }
                                        placeholderInput={
                                            'Escolha a área de atuação'
                                        }
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <ButtonMultiSelect
                                        name={'process'}
                                        fieldName={'Processo'}
                                        pageTitle={'Selecionar processo'}
                                        labelSearchInput={'Processo'}
                                        category={'checkbox'}
                                        fieldsFilter={['name']}
                                        single={false}
                                        items={selectedProcess}
                                        onSave={handleSaveProcess}
                                        showSelectedInTag={false}
                                        disabled={
                                            !selectedAreas ||
                                            selectedAreas.length === 0
                                        }
                                        placeholderSearchInput={
                                            'Escolha os processos a serem auditados'
                                        }
                                        placeholderInput={
                                            'Escolha os processos a serem auditados'
                                        }
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <ButtonMultiSelect
                                        name={'locale'}
                                        fieldName={'Unidade'}
                                        pageTitle={'Selecionar unidade'}
                                        labelSearchInput={'Unidade'}
                                        category={'checkbox'}
                                        fieldsFilter={['name']}
                                        single={true}
                                        items={selectedLocale}
                                        onSave={handleSaveLocale}
                                        showSelectedInTag={false}
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <ButtonMultiSelect
                                        name={'bus'}
                                        fieldName={'Business Unit'}
                                        pageTitle={'Selecionar Business Unit'}
                                        labelSearchInput={'Business Unit'}
                                        category={'checkbox'}
                                        fieldsFilter={['name']}
                                        single={true}
                                        items={selectedBusinessUnits}
                                        onSave={handleSaveBusinessUnits}
                                        showSelectedInTag={false}
                                        placeholderSearchInput={
                                            'Selecione a Business Unit'
                                        }
                                        placeholderInput={
                                            'Selecione a Business Unit'
                                        }
                                        disabled={
                                            (Array.isArray(
                                                selectedBusinessUnits
                                            ) &&
                                                selectedBusinessUnits.length ===
                                                    0) ||
                                            !selectedLocale.find(
                                                (item) => item.selected
                                            )
                                        }
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <ButtonMultiSelect
                                        name={'opco'}
                                        fieldName={'OPCO'}
                                        pageTitle={'Selecionar OPCO'}
                                        labelSearchInput={'OPCO'}
                                        category={'checkbox'}
                                        fieldsFilter={['name']}
                                        single={true}
                                        items={selectedOpcos}
                                        onSave={handleSaveOpcos}
                                        showSelectedInTag={false}
                                    />
                                </InputContainer>

                                <H2>Requisitos</H2>
                                <Requests>
                                    {selectedRequirements.map((theme) => (
                                        <Request key={theme.id}>
                                            <RequestTitle>
                                                {theme.title}
                                            </RequestTitle>
                                            <AccordionInfo>
                                                Marque os requisitos que serão
                                                auditados
                                            </AccordionInfo>

                                            {theme.titles.map(
                                                (title, index) => (
                                                    <RequestItem key={index}>
                                                        <Accordion
                                                            label={`${title.title}`}
                                                            heightAuto={true}
                                                        >
                                                            <CheckboxGroup
                                                                key={index}
                                                                options={title.requirements?.map(
                                                                    (item) => ({
                                                                        id: item.id,
                                                                        label: `${item.title}`
                                                                    })
                                                                )}
                                                                selected={
                                                                    selectedOption
                                                                }
                                                                onSelect={(
                                                                    value
                                                                ) => {
                                                                    if (
                                                                        selectedOption.includes(
                                                                            value
                                                                        )
                                                                    ) {
                                                                        const newOptions =
                                                                            selectedOption;

                                                                        newOptions.splice(
                                                                            newOptions.findIndex(
                                                                                (
                                                                                    i
                                                                                ) =>
                                                                                    i ===
                                                                                    value
                                                                            ),
                                                                            1
                                                                        );

                                                                        setSelectedOption(
                                                                            [
                                                                                ...newOptions
                                                                            ]
                                                                        );
                                                                    } else {
                                                                        const newOptions =
                                                                            [
                                                                                ...selectedOption,
                                                                                value
                                                                            ];

                                                                        setSelectedOption(
                                                                            newOptions
                                                                        );
                                                                    }
                                                                }}
                                                                colorActive={
                                                                    colors.greenAux
                                                                }
                                                                colorDefault={
                                                                    colors.gray2
                                                                }
                                                            />
                                                        </Accordion>
                                                    </RequestItem>
                                                )
                                            )}
                                        </Request>
                                    ))}
                                </Requests>
                            </ContainerText>
                            <NextButton
                                positionRelative={true}
                                nextDisabled={loading || loadingSubmit}
                                loading={loadingSubmit}
                                onBack={() => {
                                    if (
                                        location.pathname ===
                                            '/audit/new-audit' &&
                                        originalPage === 'ses'
                                    ) {
                                        history.push('/audit/ses');
                                        NewAudit.reset();
                                    } else {
                                        history.goBack();
                                    }
                                }}
                                onNext={() => handleSubmit()}
                                nextLabel={'Finalizar Programação'}
                            />
                        </>
                    )}
                </Container>
                <ModalComplex
                    nameModal={'alert-modal'}
                    visible={alertModalVisible}
                    onConfirm={() => setAlertModalVisible(false)}
                    title={'Preencha os campos!'}
                    description={`Todos os campos são obrigatórios e pelo menos 1 requisito para ser auditado`}
                    confirmButtonLabel={'Ok !'}
                    icon={<FiAlertCircle />}
                    uniqueFooterButton={true}
                    onCancel={() => setAlertModalVisible(false)}
                ></ModalComplex>
            </>
        );
    }
};

export default inject('NewAudit', 'UserStore')(observer(AuditEdit));
