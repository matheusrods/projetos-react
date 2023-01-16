import React from 'react';
import { FaTimes } from 'react-icons/fa';

import { ButtonMultiSelectList } from '../../../../../components/organisms';
import colors from '../../../../../styles/colors';
import { InputWrapper } from '../../../../inspection-assessment/form-inspection/styles';
import { StyledInputDatePicker } from '../../../../safety-walk-talk/modal-filter/styles';
import { Section, SectionTitle, InputWrapperDatePicker } from './styles';

const FilterForm = ({ formData, setformData }) => {
    return (
        <>
            <Section>
                <InputWrapper>
                    <ButtonMultiSelectList
                        name="competencias"
                        fieldName="COMPETÊNCIAS"
                        pageTitle="Selecionar tipo de Competência"
                        category="checkbox"
                        fieldsFilter={['name']}
                        single={false}
                        items={formData.competencias}
                        onSave={(items) =>
                            setformData((curData) => ({
                                ...curData,
                                competencias: items
                            }))
                        }
                        showSelectedInTag={false}
                        zIndex={101}
                    />
                </InputWrapper>
            </Section>

            <Section>
                <InputWrapper>
                    <ButtonMultiSelectList
                        name="status"
                        fieldName="STATUS"
                        pageTitle="Selecionar tipo de STATUS"
                        category="checkbox"
                        fieldsFilter={['name']}
                        single={false}
                        items={formData.status}
                        onSave={(items) =>
                            setformData((curData) => ({
                                ...curData,
                                status: items
                            }))
                        }
                        showSelectedInTag={false}
                        zIndex={101}
                    />
                </InputWrapper>
            </Section>

            <Section>
                <SectionTitle>Filtrar por período (Prazo)</SectionTitle>

                <InputWrapperDatePicker>
                    <StyledInputDatePicker
                        label={'DE'}
                        initialValue={''}
                        name={'initialDate'}
                        onChange={(value) =>
                            setformData((curData) => ({
                                ...curData,
                                initialDate: [{ selected: true, id: value }]
                            }))
                        }
                        clearIcon={<FaTimes color={colors.gray4_2} />}
                    />
                    <StyledInputDatePicker
                        label={'ATÉ'}
                        initialValue={''}
                        name={'endDate'}
                        onChange={(value) =>
                            setformData((curData) => ({
                                ...curData,
                                endDate: [{ selected: true, id: value }]
                            }))
                        }
                        clearIcon={<FaTimes color={colors.gray4_2} />}
                    />
                </InputWrapperDatePicker>
            </Section>
        </>
    );
};

export default FilterForm;
