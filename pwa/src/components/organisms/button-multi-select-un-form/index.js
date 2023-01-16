import { useField } from "@unform/core";
import React, { Fragment, useEffect, useRef, useState } from "react";
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
    Error
} from "./styles";

const ButtonMultiSelectUnForm = ({
    name,
    fieldName: fieldNameLabel,
    items,
    single,
    fieldsFilter,
    category,
    pageTitle,
    onSave,
    labelSearchInput,
    placeholderSearchInput,
    selected,
    showSelectedInTag = true,
    disabled = false,
    ...rest
}) => {
    const [modalVisible, setVisibleModal] = useState(false);
    const [itemSelected, setSelected] = useState(null);

    const { fieldName, registerField, defaultValue, error } = useField(name);

    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current.value = defaultValue;
    }, [defaultValue]);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value'
        });
    }, [fieldName, registerField]);

    useEffect(() => {
        let object = null;

        items?.forEach((item) => {
            if (selected) {
                if (selected instanceof Array && selected.includes(item.id)) {
                    object = item;
                } else if (item.id === selected) {
                    object = item;
                }
            } else if (item.selected) {
                object = item;
            }
        });

        setSelected(object);

        inputRef.current.value = object?.id ?? null;
    }, [items, selected]);

    return (
        <Fragment>
            <Container>
            <input ref={inputRef} name={name} type={'hidden'} />
                <FieldName>{fieldNameLabel ?? "Nome do campo"}</FieldName>
                <ContainerButton>
                    <Button
                        onClick={() => setVisibleModal(true)}
                        type={"button"}
                        disabled={disabled}
                    >
                        {single ? (
                            itemSelected?.name ? (
                                showSelectedInTag ? <Tag>{itemSelected?.name}</Tag> : <Label>{itemSelected?.name}</Label>
                            ) : (
                                <Label>Digite ou Selecione</Label>
                            )
                        ) : (
                            items.map((item) => <Tag>{item.name}</Tag>)
                        )}
                    </Button>
                    <LeftIcon>
                        <FaSearch />
                    </LeftIcon>
                    <RightIcon>
                        <FaCaretDown />
                    </RightIcon>
                </ContainerButton>
            {error && <Error>{error}</Error>}

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
                {...rest}
            />
        </Fragment>
    );
};

export default ButtonMultiSelectUnForm;
