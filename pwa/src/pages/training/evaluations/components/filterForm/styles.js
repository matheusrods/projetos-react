import styled from 'styled-components';
import {
    InputWrapperDatePicker as CustomInputWrapperDatePicker,
    Section as CustomSection,
    SectionTitle as CustomSectionTitle
} from '../../../../safety-walk-talk/modal-filter/styles';

export const Section = styled(CustomSection)`
    margin-bottom: 0;
`;

export const SectionTitle = styled(CustomSectionTitle)`
    margin-left: 0;
`;

export const InputWrapperDatePicker = styled(CustomInputWrapperDatePicker)`
    margin: 16px 0;
`;
