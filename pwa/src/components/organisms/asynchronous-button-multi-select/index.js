import _ from 'lodash-es';
import React, { Fragment, useEffect, useState } from 'react';
import { FaCaretDown, FaSearch } from 'react-icons/fa';
import moment from '../../../config/moment';
import { api } from '../../../services/api';
import { transformObserverResponseSimplified } from '../../../services/transforms/observer';
import { transformQuestionsResponseSimplified, transformResponseSimplified } from '../../../services/transforms/safety-walk-talk';
import { MultiSelectModal } from '../../molecules';
import {
    Container,
    ContainerButton,
    Button,
    Label,
    LeftIcon,
    RightIcon,
    FieldName,
    Loading,
    Tag
} from './styles';

const ButtonMultiSelect = ({
    id = null,
    clientId = null,
    name,
    fieldName,
    pageTitle,
    onSave = () => {},
    labelSearchInput,
    fieldRequired = null,
    fieldRequiredValue = null,
    fieldUseTag = 'id',
    prefixTag = '',
    endpoint = null,
    method = 'GET',
    category = 'checkbox',
    single = true,
    placeholderSearchInput,
    selected,
    showSelectedInTag = true,
    disabled = false,
    ...rest
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setVisibleModal] = useState(false);
    const [itemSelected, setSelected] = useState(null);
    const [items, setItems] = useState([]);
    const [fieldsFilter, setFieldsFilter] = useState(['id']);

    const getData = async () => {
        if (_.isNull(fieldRequired) || (!_.isNull(fieldRequired) && !_.isNull(fieldRequiredValue))) {
            setIsLoading(true);

            let response = null;

            switch (id) {
                case 3:
                    response = await api.get(endpoint, {
                        params: {
                            codigo_unidade: clientId,
                            limit: 100,
                        },
                    });

                    const { result: { data: observers } } = response.data;

                    const observersRegisters = transformObserverResponseSimplified(observers, selected);

                    setSelected(observersRegisters.find(i => i.selected) ?? null);
                    setItems(observersRegisters);
                    setFieldsFilter((state) => [
                        ...state,
                        'user.name',
                        'status.label',
                        'location',
                        'criticism.description',
                        'observationType'
                    ]);
                    break;
                case 4:
                    response = await api.post(endpoint, {
                        'por_autor': '2',
                        'periodo_de': moment().subtract(45, 'days').format('DD/MM/YYYY'),
                        'periodo_ate': moment().add(45, 'days').format('DD/MM/YYYY')
                    });

                    const { result: { data: { swt_home } } } = response.data;

                    const safetyWalkTalkRegisters = transformResponseSimplified(swt_home, selected);

                    setSelected(safetyWalkTalkRegisters.find(i => i.selected) ?? null);
                    setItems(safetyWalkTalkRegisters);
                    setFieldsFilter((state) => [...state, 'user.name', 'status.label', 'location']);
                    break;
                case 4:
                    if (fieldRequiredValue?.clientId && fieldRequiredValue?.formType) {
                        response = await api.get(`${endpoint}/${fieldRequiredValue.clientId}/${fieldRequiredValue.formType}`);

                        const { result: { data: { quest } } } = response.data;

                        const questions = transformQuestionsResponseSimplified(quest, selected);

                        setSelected(questions.find(i => i.selected) ?? null);
                        setItems(questions);
                        setFieldsFilter((state) => [...state, 'name']);
                    }
                    break;
                default:
                    break;
            }

            setIsLoading(false);
        }
    }

    // const handleLoadMore = () => {
    //     getData();
    // }

    const handleSave = (data) => {
        if (Array.isArray(data)) {
            const item = data.find(i => i.selected);

            setSelected(item ?? null);
            onSave(item ?? null);
        }
    }

    useEffect(() => {
        if (!_.isNull(fieldRequired) && !_.isNull(fieldRequiredValue)) {
            getData();
        } else if (!_.isNull(fieldRequired)) {
            setSelected(null);
            onSave(null);
        }
        // eslint-disable-next-line
    }, [fieldRequired, fieldRequiredValue]);

    useEffect(() => {
        getData();
        // eslint-disable-next-line
    }, []);

    return (
        <Fragment>
            <Container>
                <FieldName>{fieldName ?? 'Nome do campo'}</FieldName>
                <ContainerButton>
                    <Button
                        type={'button'}
                        onClick={() => setVisibleModal(true)}
                        disabled={isLoading || disabled}
                    >
                        {single ? (
                            Object({ ...itemSelected }).hasOwnProperty(fieldUseTag) ? (
                                showSelectedInTag ? <Tag>{prefixTag}{itemSelected[fieldUseTag] ?? ''}</Tag> : <Label>{prefixTag}{itemSelected[fieldUseTag] ?? ''}</Label>
                            ) : (
                                <Label>Digite ou Selecione</Label>
                            )
                        ) : <Label>Digite ou Selecione</Label>}
                    </Button>
                    <LeftIcon>
                        <FaSearch />
                    </LeftIcon>
                    <RightIcon>
                        {isLoading ? <Loading /> : <FaCaretDown />}
                    </RightIcon>
                </ContainerButton>
            </Container>
            <MultiSelectModal
                name={name}
                asynchronous={true}
                pageTitle={pageTitle}
                category={category}
                fieldsFilter={fieldsFilter}
                single={single}
                items={items}
                visible={modalVisible}
                onSave={(data) => {
                    handleSave(data);
                    setVisibleModal(false);
                }}
                onClose={() => setVisibleModal(false)}
                labelSearchInput={labelSearchInput}
                placeholderSearchInput={placeholderSearchInput}
                selected={selected}
                // onLoadMore={handleLoadMore}
                // hasLoadMore={(endpointData?.totalPages && endpointData?.page) ? endpointData.page < endpointData.totalPages : false}
                isLoadingRequest={isLoading}
                {...rest}
            />
        </Fragment>
    );
}

export default ButtonMultiSelect;
