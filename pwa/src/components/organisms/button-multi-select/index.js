import React, { Fragment, useEffect, useState } from "react";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { MultiSelectModal } from "../../molecules";
import {
    Container,
    ContainerButton,
    Button,
    Label,
    LeftIcon,
    RightIcon,
    FieldName,
    Tag,
} from "./styles";

const ButtonMultiSelect = ({
    name,
    fieldName,
    items,
    single,
    fieldsFilter,
    fieldUseTag = 'name',
    prefixTag = '',
    category,
    pageTitle,
    onSave,
    labelSearchInput,
    placeholderSearchInput,
    selected,
    showSelectedInTag = true,
    disabled = false,
    placeholderInput = 'Digite ou Selecione',
    zIndex = 100,
    ...rest
}) => {
    const [modalVisible, setVisibleModal] = useState(false);
    const [itemSelected, setSelected] = useState(null);
    const [itemsSelected, setItemsSelected] = useState(null);

    useEffect(() => {
        let object = null;
        let array = [];

        items?.forEach((item) => {
            if (single) {
                if (selected) {
                    if (selected instanceof Array && selected.includes(item.id)) {
                        object = item;
                    } else if (item.id === selected) {
                        object = item;
                    }
                } else if (item.selected) {
                    object = item;
                }
            } else {
                if (selected) {
                    if (selected instanceof Array && selected.includes(item.id)) {
                        array.push(item);
                    } else if (item.id === selected) {
                        array.push(item);
                    }
                } else {
                    if (item.selected) {
                        array.push(item);
                    }
                }
            }
        });

        if (array.length === 0) {
            setItemsSelected(null);
        } else {
            setItemsSelected(array);
        }

        setSelected(object);
    }, [items, selected, single]);

    return (
        <Fragment>
            <Container>
                <FieldName>{fieldName ?? "Nome do campo"}</FieldName>
                <ContainerButton>
                    <Button
                        onClick={() => setVisibleModal(true)}
                        type={"button"}
                        disabled={disabled}
                    >
                        {single ? (
                            Object({ ...itemSelected }).hasOwnProperty(fieldUseTag) ? (
                                showSelectedInTag ? <Tag>{prefixTag}{itemSelected[fieldUseTag] ?? ''}</Tag> : <Label>{prefixTag}{itemSelected[fieldUseTag] ?? ''}</Label>
                            ) : (
                                <Label>{placeholderInput}</Label>
                            )
                        ) : itemsSelected ? (
                            itemsSelected.map((item, index) => <Tag key={index}>{prefixTag}{item[fieldUseTag] ?? '-'}</Tag>)
                        ) : <Label>{placeholderInput}</Label>}
                    </Button>
                    <LeftIcon>
                        <FaSearch />
                    </LeftIcon>
                    <RightIcon>
                        <FaCaretDown />
                    </RightIcon>
                </ContainerButton>
            </Container>
            <MultiSelectModal
                name={name}
                pageTitle={pageTitle}
                category={category}
                fieldsFilter={fieldsFilter}
                single={single}
                items={items}
                visible={modalVisible}
                onSave={(data) => {
                    onSave(data);
                    setVisibleModal(false);
                }}
                onClose={() => setVisibleModal(false)}
                labelSearchInput={labelSearchInput}
                placeholderSearchInput={placeholderSearchInput}
                selected={selected}
                zIndex={zIndex}
                {...rest}
            />
        </Fragment>
    );
};

export default ButtonMultiSelect;
