import React, { useCallback, useEffect, useState } from 'react';
// eslint-disable-next-line
import { useHistory, useLocation } from 'react-router';
import { inject, observer } from 'mobx-react';
import {
    Accordion,
    NextButton,
    WhiteHeaderBack
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
    ContainerText
} from './styles';
import {
    LoadingContainer,
    ModalComplex
} from '../../../../components/molecules';
import { getProcessForNewAudit } from '../../../../services/endpoints/audit/process-new-audit';
import { getAreasOperation } from '../../../../services/endpoints/audit/areas-operation';
import { getClientsByUserId } from '../../../../services/endpoints/users';
import { FiAlertCircle } from 'react-icons/fi';

const AuditNew = ({ NewAudit, UserStore, location }) => {
    const history = useHistory();

    const {
        area,
        process,
        locale,
        bus,
        opco,
        requirements,
        selectedRequirementsId,
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
        getSelectedLocaleName,
    } = NewAudit;

    const [selectedOption, setSelectedOption] = useState(
        selectedRequirementsId
    );

    const { user } = UserStore;
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);

    const [selectedArea, setSelectedArea] = useState(area);
    const [selectedAreas, setSelectedAreas] = useState([]);

    const [selectedRequirements, setSelectedRequirements] = useState(requirements)
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
                if (audit.processos_auditaveis.length === 0 ||
                    audit.requisitos_auditaveis.length === 0) {
                    return true;
                }

                return false;
            });

            if (isNotValid) {
                setAlertModalVisible(true);
                setLoadingSubmit(false);
                return false;
            }

            return true;
        }

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

            if (originalPage === 'ses') {
                history.push({
                    pathname: 'new-audit/resume',
                    state: { audits: formattedAudits, originalPage: 'ses' }
                });
            } else if (originalPage === 'hq') {
                history.push({
                    pathname: 'schedule/1',
                    state: { originalPage: 'hq' }
                });
            } else {
                history.push('new-audit/resume');
            }
        } catch (error) {
            setLoadingSubmit(false);
        }

        setLoadingSubmit(false);
    };


    const fetchData = useCallback(async () => {
        setLoading(true);

        if (!selectedLocale.length) {
            const localeOptions = await getClientsByUserId(user.id);

            if (localeOptions?.clients) {
                setSelectedLocale(localeOptions.clients[0]?.units)
            }
        }

        if (!selectedArea.length) {
            const areasOptions = await getAreasOperation(user.clientId);
            setSelectedArea(areasOptions.formattedAreas);
        }

        setLoading(false);
    }, [selectedLocale, selectedArea, user]);


    const fetchProcess = useCallback(async (selectedAreas) => {
        const processOptions = await getProcessForNewAudit(user.clientId, selectedAreas);

        setSelectedProcess(processOptions.processesFormatted);
    }, [user])


    useEffect(() => {
        fetchData();
    }, [fetchData]);


    const handleSaveArea = async (items) => {
        let selectedAreas = items.filter(item => item.selected).map(filteredItem => filteredItem.id);

        setSelectedAreas(selectedAreas);
        setSelectedArea([...items]);

        if (selectedAreas.length !== 0) {
            await fetchProcess(selectedAreas);
        } else {
            setSelectedProcess([]);
        }

        return 'saved';
    };

    const handleSaveProcess = useCallback((items) => {
        let selectedProcesses = items.filter(item => item.selected);

        let themes = []
        selectedProcesses.map(item => item.themes.map((theme) => themes.push(theme)))

        let filteredRequirements = themes.filter((requirement, index, self) =>
            index === self.findIndex((t) => (
                t.id === requirement.id
            ))
        )

        setRequirements(filteredRequirements)
        setSelectedRequirements(filteredRequirements)
        setSelectedProcess([...items]);

        return 'saved';
    }, [setRequirements]);

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
        const itemSelected = items.find(item => item.selected);

        setSelectedBusinessUnits([...items]);

        if (itemSelected) {
            const location = selectedLocale.find((item) => item.selected);

            const opcosData = (location) ? location.opcos.filter(item => item.businessUnitId === itemSelected.id) : [];

            setSelectedOpcos([...opcosData]);
        } else {
            setSelectedOpcos([]);
        }

        return 'saved';
    };

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
                                    Novo Plano de Auditoria Interna
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
                                    pageTitle={'Selecionar áreas de atuação'}
                                    labelSearchInput={'Áreas de atuação'}
                                    category={'checkbox'}
                                    fieldsFilter={['name']}
                                    single={false}
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
                                    disabled={!selectedAreas || selectedAreas.length === 0}
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
                                    placeholderSearchInput={'Selecione a Business Unit'}
                                    placeholderInput={'Selecione a Business Unit'}
                                    disabled={
                                        (Array.isArray(selectedBusinessUnits)
                                            && selectedBusinessUnits.length === 0
                                        ) || !(selectedLocale.find(item => item.selected))
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
                                    disabled={
                                        (Array.isArray(selectedOpcos)
                                            && selectedOpcos.length === 0
                                        ) || !(selectedBusinessUnits.find(item => item.selected))
                                    }
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

                                        {theme.titles.map((title, index) => (
                                            <RequestItem key={index}>
                                                <Accordion
                                                    label={`${title.orderLabel}. ${title.title}`}
                                                    heightAuto={true}
                                                >
                                                    <CheckboxGroup
                                                        key={index}
                                                        options={title.requirements?.map((item) => ({
                                                            id: item.id,
                                                            label: `${item.orderLabel} ${item.title}`
                                                        })
                                                        )}
                                                        selected={selectedOption}
                                                        onSelect={(value) => {
                                                            if (selectedOption.includes(value)) {
                                                                const newOptions = selectedOption;

                                                                newOptions.splice(newOptions.findIndex((i) => i === value), 1);

                                                                setSelectedOption([...newOptions]);
                                                            } else {
                                                                const newOptions = [...selectedOption, value];

                                                                setSelectedOption(newOptions);
                                                            }
                                                        }}
                                                        colorActive={colors.greenAux}
                                                        colorDefault={colors.gray2}
                                                    />
                                                </Accordion>
                                            </RequestItem>
                                        ))}
                                    </Request>
                                ))}
                            </Requests>
                        </ContainerText>
                        <NextButton
                            positionRelative={true}
                            nextDisabled={loading || loadingSubmit}
                            loading={loadingSubmit}
                            onBack={() => {
                                if (location.pathname === '/audit/new-audit' && originalPage === 'ses') {
                                    history.push('/audit/ses');
                                    NewAudit.reset();
                                } else {
                                    history.goBack()
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
};

export default inject('NewAudit', 'UserStore')(observer(AuditNew));
