import { inject, observer } from 'mobx-react';
import React, { Fragment, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Multiselect from '../../../components/atoms/multiselect';
import { RadioButtonInlineGroup } from '../../../components/molecules';
import RadioButtonGroup from '../../../components/molecules/radio-button-group';
import ButtonMultiSelect from '../../../components/organisms/button-multi-select';
import ConfirmCancelFooter from '../../../components/organisms/confirmCancelFooter';
import moment from '../../../config/moment';
import colors from '../../../styles/colors';

import {
    Container,
    Content,
    Header,
    InputWrapper,
    Section,
    SectionTitle,
    StyledInputDatePicker,
    Title,
    InputWrapperDatePicker
} from './styles';

const ModalFilter = ({
    onClose,
    onFilter,
    filters,
    filterOptions,
    PermissionStore: { hasPermission }
}) => {
    const [responsibleFilter, setResponsibleFilter] = useState(
        filterOptions.responsibles
    );
    const [selectedFilters, setSelectedFilters] = useState(filters);

    return (
        <Container>
            <Header>
                <Title>Filtrar</Title>
                <FaTimes
                    color={'#5E687D'}
                    size={20}
                    onClick={() => onClose()}
                />
            </Header>
            <Content>
                {hasPermission(17) && (
                    <Section>
                        <InputWrapper>
                            <Multiselect
                                isClearable={true}
                                defaultValue={selectedFilters.orderBy}
                                value={[selectedFilters.orderBy]}
                                single={true}
                                onChange={(value) =>
                                    setSelectedFilters((old) => ({
                                        ...old,
                                        orderBy: value
                                    }))
                                }
                                options={[
                                    { label: 'Criticidade', value: 1 },
                                    { label: 'Origem de ferramenta', value: 2 },
                                    { label: 'Tipo da ação', value: 3 }
                                ]}
                                label={'Ordenar por'}
                            />
                        </InputWrapper>
                    </Section>
                )}
                <Section>
                    <SectionTitle>Por autor</SectionTitle>
                    <InputWrapper>
                        <RadioButtonGroup
                            options={(() => {
                                if (hasPermission(18)) {
                                    return [
                                        {
                                            label: 'Todos os registros da minha área',
                                            id: 1
                                        },
                                        {
                                            label: 'Exibir apenas meus registros como identificador',
                                            id: 2
                                        },
                                        {
                                            label: 'Exibir apenas meus registros como responsável',
                                            id: 3
                                        }
                                    ];
                                } else {
                                    return [
                                        {
                                            label: 'Exibir apenas meus registros como identificador',
                                            id: 2
                                        },
                                        {
                                            label: 'Exibir apenas meus registros como responsável',
                                            id: 3
                                        }
                                    ];
                                }
                            })()}
                            selected={selectedFilters.author ?? 0}
                            onSelect={(value) =>
                                setSelectedFilters((old) => ({
                                    ...old,
                                    author: value
                                }))
                            }
                        />
                    </InputWrapper>
                </Section>
                <Section>
                    {hasPermission(19) && (
                        <Fragment>
                            <SectionTitle>Por período</SectionTitle>
                            <InputWrapper>
                                <RadioButtonInlineGroup
                                    options={[
                                        {
                                            id: 1,
                                            label: 'Inclusão'
                                        },
                                        {
                                            id: 2,
                                            label: 'Prazo'
                                        }
                                    ]}
                                    selected={selectedFilters.dateType ?? null}
                                    onSelect={(value) => {
                                        setSelectedFilters((old) => ({
                                            ...old,
                                            dateType: value
                                        }));
                                    }}
                                />
                            </InputWrapper>
                            <InputWrapperDatePicker>
                                <StyledInputDatePicker
                                    name={'initalDate'}
                                    label={'Data inicial'}
                                    initialValue={
                                        selectedFilters.initialDeadline ?? null
                                    }
                                    onChange={(value) =>
                                        setSelectedFilters((old) => ({
                                            ...old,
                                            initialDeadline: value
                                        }))
                                    }
                                    clearIcon={
                                        <FaTimes color={colors.gray4_2} />
                                    }
                                />
                                <StyledInputDatePicker
                                    name={'endDate'}
                                    label={'Data final'}
                                    initialValue={
                                        selectedFilters.finalDeadline ?? null
                                    }
                                    onChange={(value) =>
                                        setSelectedFilters((old) => ({
                                            ...old,
                                            finalDeadline: value
                                        }))
                                    }
                                    clearIcon={
                                        <FaTimes color={colors.gray4_2} />
                                    }
                                />
                            </InputWrapperDatePicker>
                        </Fragment>
                    )}
                    {hasPermission(20) && (
                        <InputWrapper>
                            <Multiselect
                                isClearable={true}
                                value={[selectedFilters.statusId]}
                                single={true}
                                onChange={(value) =>
                                    setSelectedFilters((old) => ({
                                        ...old,
                                        statusId: value
                                    }))
                                }
                                options={filterOptions.status}
                                label={'STATUS'}
                            />
                        </InputWrapper>
                    )}
                    {hasPermission(21) && (
                        <InputWrapper>
                            <Multiselect
                                isClearable={true}
                                value={[selectedFilters.originId]}
                                single={true}
                                onChange={(value) =>
                                    setSelectedFilters((old) => ({
                                        ...old,
                                        originId: value
                                    }))
                                }
                                options={filterOptions.origins}
                                label={'ORIGEM'}
                            />
                        </InputWrapper>
                    )}
                    {hasPermission(22) && (
                        <InputWrapper>
                            <ButtonMultiSelect
                                top={0}
                                pageTitle={'Selecionar responsável'}
                                fieldName={'Responsável'}
                                category={'user'}
                                fieldsFilter={['name']}
                                labelSearchInput={'Dados do responsável'}
                                single={true}
                                items={responsibleFilter}
                                selected={selectedFilters.responsibleUserId}
                                onSave={(items) => {
                                    setResponsibleFilter([...items]);
                                    setSelectedFilters((old) => ({
                                        ...old,
                                        responsibleUserId: items.find(
                                            (item) => item.selected
                                        )?.id
                                    }));
                                }}
                            />
                        </InputWrapper>
                    )}
                </Section>
            </Content>
            <ConfirmCancelFooter
                onConfirm={() => {
                    if (
                        (selectedFilters?.initialDeadline &&
                            !selectedFilters?.finalDeadline) ||
                        (!selectedFilters?.initialDeadline &&
                            selectedFilters?.finalDeadline)
                    ) {
                        toast.warning(
                            'Para consultar por período é necessário preencher a data inicial e a data final!'
                        );
                    } else if (
                        selectedFilters?.initialDeadline &&
                        selectedFilters?.finalDeadline
                    ) {
                        if (
                            moment(selectedFilters.finalDeadline).isAfter(
                                selectedFilters.initialDeadline
                            ) ||
                            selectedFilters.finalDeadline ===
                                selectedFilters.initialDeadline
                        ) {
                            onFilter(selectedFilters);
                            onClose();
                        } else {
                            toast.warning(
                                'A data final precisa ser igual ou maior que a data inicial!'
                            );
                        }
                    } else {
                        onFilter(selectedFilters);
                        onClose();
                    }
                }}
                onCancel={() => {
                    setResponsibleFilter((old) =>
                        old.map((item) => ({ ...item, selected: false }))
                    );
                    setSelectedFilters({ author: 3, dateType: 1 });
                }}
                confirmButtonLabel={'Aplicar'}
                confirmButtonIcon={<FaCheck size={14} />}
                cancelButtonLabel={'Limpar'}
            />
        </Container>
    );
};

export default inject('PermissionStore')(observer(ModalFilter));
