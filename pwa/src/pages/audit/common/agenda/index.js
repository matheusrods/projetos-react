import React, { Fragment, useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import { observer, inject } from 'mobx-react';
import { useHistory } from 'react-router';
import { FaFilter } from 'react-icons/fa';
import { Container, FilterActionsButton, ModalContent } from './styles';
import ScheduleCard from '../../../../components/atoms/schedule-card';
import CalendarHeader from '../../../../components/organisms/calendar-header';
import NavbarFooter from '../../../../components/organisms/navbarFooter';
import { ButtonMultiSelect } from '../../../../components/organisms';
import { Multiselect } from '../../../../components/atoms';
import {
    LoadingContainer,
    ModalComplex
} from '../../../../components/molecules';
import { getEmployees } from '../../../../services/endpoints/users';
import { getAreasOperation } from '../../../../services/endpoints/audit/areas-operation';
import { getProcessForNewAudit } from '../../../../services/endpoints/audit/process-new-audit';
import { getProgrammingAudits } from '../../../../services/endpoints/audit/programming-audits';
import { transformResponseAudit } from '../../../../services/transforms/audits';

const Agenda = ({ UserStore }) => {
    const history = useHistory();

    const { user } = UserStore;

    const [date, dispatchDate] = useState(
        history.location?.state ? history.location.state.date : new Date()
    );
    const [loading, setLoading] = useState(false);
    const [modalFilter, setModalFilter] = useState(false);

    const [audits, setAudits] = useState([]);
    const [fetchedAudits, setFetchedAudits] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [areas, setAreas] = useState([]);
    const [processes, setProcesses] = useState([]);
    const [requirements, setRequirements] = useState([]);

    const [selectedFilters, setSelectedFilters] = useState(
        history.location?.state ? history.location.state.selectedFilters : {}
    );

    const handleFilter = useCallback(async () => {
        let filteredAudits = fetchedAudits;

        const employee = employees.find((employee) => employee.selected);

        if (employee) {
            filteredAudits = audits.filter((audit) =>
                audit.auditors.includes(employee.id)
            );
        }

        if (selectedFilters?.areas?.length) {
            const selectedAreas = selectedFilters.areas.map((area) => area.id);
            filteredAudits = filteredAudits.filter((audit) =>
                selectedAreas.includes(audit.area.id)
            );
        }

        if (selectedFilters?.processes?.length) {
            const selectedProcesses = selectedFilters.processes.map(
                (process) => process.id
            );
            let filteredByProcesses = [];
            filteredAudits.forEach((audit) => {
                selectedProcesses.forEach((process) => {
                    if (audit.auditableProcessesIds.includes(process)) {
                        filteredByProcesses.push(audit);
                    }
                });
            });

            filteredAudits = filteredByProcesses;
        }

        if (selectedFilters?.requirements?.length) {
            const selectedRequirements = selectedFilters.requirements.map(
                (requirement) => requirement.id
            );
            let filteredByRequirements = [];
            filteredAudits.forEach((audit) => {
                selectedRequirements.forEach((requirement) => {
                    if (audit.auditableRequirements.includes(requirement)) {
                        filteredByRequirements.push(audit);
                    }
                });
            });

            filteredAudits = filteredByRequirements;
        }

        setAudits(filteredAudits);
        setModalFilter(false);
    }, [
        audits,
        employees,
        fetchedAudits,
        selectedFilters.areas,
        selectedFilters.processes,
        selectedFilters.requirements
    ]);

    const fetchFilterData = useCallback(async () => {
        setLoading(true);

        const employeesResponse = await getEmployees();
        setEmployees(employeesResponse.employees);

        const areasResponse = await getAreasOperation(user.clientId);
        setAreas(areasResponse.formattedAreas);

        setLoading(false);
    }, [user.clientId]);

    useEffect(() => fetchFilterData(), [fetchFilterData]);

    useEffect(() => handleFilter(), [fetchedAudits, handleFilter]);

    useEffect(() => {
        async function fetchAudits() {
            setLoading(true);

            const auditsResponse = await getProgrammingAudits({
                codigo_unidade: user.clientId,
                data_agenda: moment(date).format('YYYY-MM-DD')
            });

            if (auditsResponse) {
                const audits = auditsResponse.data.map((item) => {
                    item = transformResponseAudit(item);
                    return item;
                });

                setFetchedAudits(audits);
            } else {
                setFetchedAudits([]);
            }

            setLoading(false);
        }

        fetchAudits();
    }, [date, user.clientId]);

    const clearProcesses = () => {
        setSelectedFilters((old) => ({
            ...old,
            processes: []
        }));
        setProcesses([]);
    };

    const clearRequirements = () => {
        setSelectedFilters((old) => ({
            ...old,
            requirements: []
        }));
        setRequirements([]);
    };

    useEffect(() => {
        async function fetchProcesses() {
            if (!history.location?.state?.selectedFilters) {
                clearProcesses();
                clearRequirements();
            } else {
                history.replace();
            }

            if (!selectedFilters?.areas?.length) {
                return;
            }

            let areaIds = selectedFilters.areas.map((area) => area.id);

            const processResponse = await getProcessForNewAudit(
                user.clientId,
                areaIds
            );
            setProcesses(processResponse.processesFormatted);
        }

        fetchProcesses();
    }, [history, selectedFilters.areas, user.clientId]);

    useEffect(() => {
        if (!selectedFilters?.processes?.length) {
            return;
        }

        let requirements = [];

        selectedFilters.processes.forEach((process) => {
            for (let theme of process.themes) {
                for (let title of theme.titles) {
                    title.requirements.forEach((requirement) => {
                        requirements.push(requirement);
                    });
                }
            }
        });

        setRequirements(requirements);
    }, [selectedFilters.processes]);

    if (loading) {
        return (
            <Fragment>
                <CalendarHeader date={date} />
                <Container>
                    <LoadingContainer />
                </Container>
                <NavbarFooter
                    active={2}
                    onClickAudit={() => history.push(`ses`)}
                />
            </Fragment>
        );
    }

    return (
        <Fragment>
            <CalendarHeader date={date} dispatchDate={dispatchDate} />
            <Container>
                {audits?.map((audit) => (
                    <ScheduleCard
                        key={audit?.id}
                        audit={audit}
                        onClickDetails={() =>
                            history.push({
                                pathname: `details`,
                                state: {
                                    audit: audit,
                                    selectedFilters,
                                    date: date
                                }
                            })
                        }
                    />
                ))}
                <FilterActionsButton onClick={() => setModalFilter(true)}>
                    <FaFilter size={20} color={'#FFFFFF'} />
                </FilterActionsButton>
            </Container>
            <NavbarFooter active={2} onClickAudit={() => history.push(`ses`)} />
            <ModalComplex
                visible={modalFilter}
                cancelButtonLabel={'Cancelar'}
                confirmButtonLabel={'Filtrar'}
                onConfirm={() => handleFilter()}
                onCancel={() => setModalFilter(false)}
            >
                <ModalContent>
                    <ButtonMultiSelect
                        name={'auditor'}
                        fieldName={'Auditor'}
                        pageTitle={'Selecione o auditor'}
                        labelSearchInput={'Auditor'}
                        category={'checkbox'}
                        fieldsFilter={['name']}
                        single={true}
                        items={employees}
                        onSave={(items) => setEmployees([...items])}
                        showSelectedInTag={false}
                        position={'absolute'}
                        height={'calc(100% - 16px)'}
                        top={'16'}
                    />
                    <Multiselect
                        label="Áreas"
                        single={false}
                        placeholder="Todas"
                        isClearable={true}
                        value={selectedFilters.areas}
                        onChange={(items) => {
                            setSelectedFilters((old) => ({
                                ...old,
                                areas: items
                            }));
                        }}
                        options={areas}
                    />
                    <Multiselect
                        label="Processos"
                        single={false}
                        placeholder="Todos"
                        isClearable={true}
                        value={selectedFilters.processes}
                        onChange={(items) => {
                            clearRequirements();
                            setSelectedFilters((old) => ({
                                ...old,
                                processes: items
                            }));
                        }}
                        options={processes}
                    />
                    <Multiselect
                        label="Requisito da norma"
                        single={false}
                        placeholder="Selecione os requisitos"
                        isClearable={true}
                        value={selectedFilters.requirements}
                        onChange={(items) =>
                            setSelectedFilters((old) => ({
                                ...old,
                                requirements: items
                            }))
                        }
                        options={requirements}
                    />
                </ModalContent>
            </ModalComplex>
        </Fragment>
    );
};

export default inject('UserStore')(observer(Agenda));
