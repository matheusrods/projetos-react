import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Form } from '@unform/web';

import {
    ButtonMultiSelectList,
    FilterPage
} from '../../../../../components/organisms';
import colors from '../../../../../styles/colors';
import { InputWrapper } from '../../../../inspection-assessment/form-inspection/styles';
import { StyledInputDatePicker } from '../../../../safety-walk-talk/modal-filter/styles';
import { Section, SectionTitle, InputWrapperDatePicker } from './styles';

const EvaluationsFilters = ({
    formData,
    setformData,
    name,
    formRef,
    onFilterSubmit,
    onClose,
    pending
}) => {
    return (
        <Form
            id={'form'}
            ref={formRef}
            onSubmit={onFilterSubmit}
            initialData={formData}
        >
            <FilterPage
                onClose={onClose}
                onReset={() => null} // TODO: 'onReset'
                confirmButtonType="submit"
                pending={pending}
            >
                <Section>
                    <InputWrapper>
                        <ButtonMultiSelectList
                            name={name}
                            fieldName="COMPETÊNCIAS"
                            pageTitle="Selecionar tipo de Competência"
                            category="checkbox"
                            fieldsFilter={['name']}
                            single={false}
                            items={formData[name]}
                            onSave={(items) =>
                                setformData((curData) => ({
                                    ...curData,
                                    [name]: items
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
            </FilterPage>
        </Form>
    );
};

export default EvaluationsFilters;
