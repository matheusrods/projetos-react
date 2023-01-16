import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaCheck, FaExclamationTriangle, FaSearch, FaTimes } from 'react-icons/fa';
import { ActionCard, SideModal, WhiteHeader } from '../../atoms';
import { ConfirmCancelFooter } from '../../organisms';
import { ModalComplex } from '..';
import colors from '../../../styles/colors';
import {
    Content,
    SearchContainer,
    SearchInput,
    FieldName,
    InputGroup,
    LeftIcon,
    RightIcon,
    List,
    NoRecord,
    Keyword,
    LoadMoreButton,
    Loading,
    LimitText,
    ContainerLimit
} from './styles';

import CheckboxCard from './checkbox-card';
import SafetyWalkTalkCard from './safety-walk-talk-card';
import UserCard from './user-card';
import DangerAspectTypeCard from './danger-aspect-type'
import ObserverCard from './observer-card';

const MultiSelectModal = ({
    name,
    pageTitle,
    items,
    visible,
    onClose,
    onSave,
    category,
    single = false,
    fieldsFilter = [],
    placeholderSearchInput,
    labelSearchInput,
    children,
    selected,
    onLoadMore,
    hasLoadMore,
    asynchronous = false,
    isLoadingRequest,
    limit,
    zIndex = 100,
    ...rest
}) => {
    const [filter, setFilter] = useState('');
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [initialData, setInitialData] = useState([]);

    const [alertModalVisible, setAlertModalVisible] = useState(false);

    const listRef = useRef(null);

    const getItems = useCallback(() => {
        const array = [];

        items?.forEach((item) => {
            array.push({
                ...item,
                selected: selected !== undefined
                    ? selected instanceof Array
                        ? selected.includes(item.id)
                        : item.id === selected
                    : item.selected,
            });
        });

        setInitialData(array);
        setData(array);
    }, [items, selected]);

    const validateFilter = useCallback((textFilter, item) => {
        let valid = false;

        fieldsFilter.forEach(field => {
            if (_.get(item, field) && Array.isArray(_.get(item, field).toString().match(new RegExp(textFilter, 'i')))) {
                valid = true;
            }
        });

        return valid;
    }, [fieldsFilter]);

    const filterData = useCallback((textFilter) => {
        const array = [];

        data.forEach(item => {
            if (((textFilter !== '') && validateFilter(textFilter, item)) || item.selected) {
                array.push(item);
            }
        });

        setFilteredData(array);
    }, [data, validateFilter]);

    useState(() => {
        getItems();
    }, []);

    useEffect(() => {
        filterData(filter);
    }, [data, filterData, filter]);

    useEffect(() => {
        getItems();
    }, [items, getItems]);

    useEffect(() => {
        if (visible) {
            listRef.current.scrollTop = 0;
        }
    }, [visible]);

    const render = () => {
        const dataToUse = (filter !== '') ? filteredData : data;

        if (dataToUse.length > 0) {
            const elements = [];

            dataToUse.forEach((item, index) => {
                switch (category) {
                    case "user":
                        elements.push(
                            <UserCard
                                key={index.toString()}
                                name={item.name}
                                avatar={item.avatar}
                                onPress={() => handleItem(item.id)}
                                selected={item.selected}
                            />
                        );
                        break;
                    case "checkbox":
                        elements.push(
                            <CheckboxCard
                                key={index.toString()}
                                name={item.name}
                                onPress={() => handleItem(item.id)}
                                selected={item.selected}
                                radio={single}
                                disabled={item.disabled}
                            />
                        );
                        break;
                    case "safety-walk-talk":
                        elements.push(
                            <SafetyWalkTalkCard
                                key={index.toString()}
                                id={item.id}
                                status={item?.status}
                                location={item?.location}
                                date={item?.date}
                                user={item?.user}
                                onPress={() => handleItem(item.id)}
                                selected={item.selected}
                            />
                        );
                        break;
                    case "observer":
                        elements.push(
                            <ObserverCard
                                key={index.toString()}
                                id={item.id}
                                status={item?.status}
                                location={item?.location}
                                date={item?.date}
                                user={item?.user}
                                observationType={item?.observationType}
                                criticism={item?.criticism}
                                onPress={() => handleItem(item.id)}
                                selected={item.selected}
                            />
                        );
                        break;
                    case "action":
                        elements.push(
                            <ActionCard
                                backgroundColor={colors.gray1}
                                action={item}
                                key={index.toString()}
                                onClick={() => handleItem(item.id)}
                                selected={item.selected}
                                showSelected={true}
                                notDetailsButton
                            />
                        );
                        break;
                    case "danger-aspect-type":
                        elements.push(
                            <DangerAspectTypeCard
                                key={index.toString()}
                                onClick={() => handleItem(item.id)}
                                selected={item.selected}
                                item={item}
                            />
                        );
                        break;
                    default:
                        return;
                }
            });

            return elements;
        } else {
            return (
                <NoRecord>
                    {filter !== ''
                        ? <>
                            Não foi encontrado nenhum registro para a busca: &nbsp;
                            <Keyword>{filter}</Keyword>
                        </>
                        : 'Não foi encontrado nenhum registro'
                    }
                </NoRecord>
            );
        }
    }

    const handleItem = (id, reset) => {
        const array = [];

        data.forEach(item => {
            if (item.id === id) {
                array.push({ ...item, selected: !item.selected });
            } else {
                if (single) {
                    array.push({ ...item, selected: false });
                } else {
                    array.push(item);
                }
            }
        });

        setData(array);

        if (reset) {
            setInitialData(array);
            onSave(array);
        }
    }

    const handleBack = () => {
        setData(initialData);
        setFilter('');
        onClose();
    }

    const handleSave = () => {
        if (!single && limit > 0) {
            let quantity = 0;

            data.forEach(item => {
                if (item.selected) {
                    quantity++;
                }
            });

            if (quantity > limit) {
                setAlertModalVisible(true);
            } else {
                onSave(data);
                setInitialData(data);
                setFilter('');
                onClose();
            }
        } else {
            onSave(data);
            setInitialData(data);
            setFilter('');
            onClose();
        }
    }

    const quantitySelected = () => {
        let quantity = 0;

        data.forEach(item => {
            if (item.selected) {
                quantity++;
            }
        })

        return quantity;
    }

    return (
        <SideModal visible={visible} zIndex={zIndex} {...rest}>
            <WhiteHeader title={pageTitle} onClose={handleBack} />
            <Content>
                <SearchContainer>
                    <FieldName htmlFor={`${name}-search-input`}>{labelSearchInput ?? 'Dados do observador'}</FieldName>
                    <InputGroup>
                        <SearchInput
                            id={`${name}-search-input`}
                            placeholder={placeholderSearchInput ?? 'Digite ou Selecione'}
                            maxLength={100}
                            autoComplete={'off'}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                        />
                        <LeftIcon>
                            <FaSearch />
                        </LeftIcon>
                        <RightIcon type={'button'} onClick={() => setFilter('')}>
                            <FaTimes />
                        </RightIcon>
                    </InputGroup>
                </SearchContainer>
                {(!single && limit > 0) &&
                    <ContainerLimit>
                        <LimitText>Registros selecionados: {quantitySelected()}</LimitText>
                        <LimitText>Limite: {limit}</LimitText>
                    </ContainerLimit>
                }
                <List category={category} ref={listRef}>
                    {render()}
                    {(hasLoadMore) &&
                        <LoadMoreButton type={'button'} disabled={isLoadingRequest} onClick={onLoadMore}>
                            {isLoadingRequest ? <Loading /> : 'Carregar mais'}
                        </LoadMoreButton>
                    }
                </List>
            </Content>
            <ConfirmCancelFooter
                confirmButtonLabel={'Confirmar'}
                confirmButtonIcon={<FaCheck />}
                cancelButtonLabel={'Cancelar'}
                confirmButtonType={'button'}
                onConfirm={handleSave}
                onCancel={handleBack}
            />
            <ModalComplex
                nameModal={'alert-modal'}
                visible={alertModalVisible}
                onCancel={() => setAlertModalVisible(false)}
                onConfirm={() => setAlertModalVisible(false)}
                icon={<FaExclamationTriangle size={40} />}
                title={'Limite atingido'}
                description={`O limite de registros selecionados foi ultrapassado, reveja sua seleções e respeite o limite indicado. Limite: ${limit}`}
                confirmButtonLabel={'Voltar'}
                uniqueFooterButton={true}
            />
        </SideModal>
    );
}

export default MultiSelectModal;
