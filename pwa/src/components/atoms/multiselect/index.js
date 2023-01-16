import React from 'react';
import { Container, Title } from './styles';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import colors from '../../../styles/colors';

const animatedComponents = makeAnimated();

export default function Multiselect({
    label,
    options = [],
    defaultValue = [],
    onChange,
    single = false,
    placeholder,
    isSearchable = true,
    ...props
}) {
    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: `1px solid ${colors.gray4_2}`,
            color: `${colors.gray4}`,
            padding: '4px',
            fontSize: '14px'
        }),
        option: (provided) => ({
            ...provided,
            fontSize: '14px'
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#2d373c',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '20px',
        })
    };

    return (
        <Container>
            <Title>{label}</Title>
             
                <Select
                    isSearchable={isSearchable}
                    styles={customStyles}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={defaultValue}
                    isMulti={!single}
                    options={options}
                    onChange={onChange}
                    noOptionsMessage={() => 'Sem opções'}
                    placeholder={placeholder ?? 'Selecione...'}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 3,
                        colors: {
                            ...theme.colors,
                            primary: colors.orange2
                        }
                    })}
                    {...props}
                /> 
        </Container>
    );
}
