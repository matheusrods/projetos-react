import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import colors from "../../../styles/colors";
import { Container, Error, Title } from "./styles";

const animatedComponents = makeAnimated();

export default function MultiSelectUnForm({
    name,
    label,
    options = [],
    single,
    placeholder,
    ...props
}) {
    const selectRef = useRef(null);

    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: selectRef.current,
            getValue: (ref) => {
                if (!single) {
                    if (!ref.state.value) {
                        return [];
                    }

                    return ref.state.value.map((option) => option.value);
                }

                if (!ref.state.value) {
                    return "";
                }

                return ref.state.value.value;
            },
        });
    }, [fieldName, registerField, single]);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: `1px solid ${colors.gray4_2}`,
            color: `${colors.gray4}`,
            padding: "4px",
            fontSize: "14px",
        }),
        option: (provided) => ({
            ...provided,
            fontSize: "14px",
        }),
    };

    return (
        <Container>
            <Title>{label}</Title>
            <Select
                ref={selectRef}
                defaultValue={defaultValue}
                styles={customStyles}
                closeMenuOnSelect={single}
                components={animatedComponents}
                isMulti={!single}
                options={options}
                noOptionsMessage={() => "Sem opções"}
                placeholder={placeholder ?? "Selecione..."}
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 3,
                    colors: {
                        ...theme.colors,
                        primary: colors.orange2,
                    },
                })}
                {...props}
            />
            {error && <Error>{error}</Error>}
        </Container>
    );
}
