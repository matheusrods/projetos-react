import styled from 'styled-components';
import colors from '../../../styles/colors';
import InputDatePicker from '../../../components/atoms/input-date-picker';

export const Container = styled.div`
    background-color: #fff;
    position: absolute;
    top: 76px;
    left: 50%;
    transform: translateX(-50%);
    overflow-x: auto;
    z-index: 15;
    height: calc(100% - 76px);
    width: 100%;
    padding-bottom: 80px;
    padding-top: 62px;
    max-width: 768px;

    @media (max-width: 768px) {
        height: 100%;
        top: 0px;
        z-index: 115;
    }
`;

export const Header = styled.div`
    height: 62px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid ${colors.grayBorder};
    position: fixed;
    width: calc(100% - 32px);
    padding-top: 16px;
    padding-bottom: 16px;
    margin-left: 16px;
    margin-right: 16px;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 100;
`;

export const Title = styled.h1`
    font-size: 20px;
    color: #2d373c;
`;

export const Content = styled.div`
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
`;

export const Section = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
`;

export const SectionTitle = styled.h3`
    color: ${colors.gray4};
    font-weight: 500;
    font-size: 14px;
    margin-left: 16px;
`;

export const StyledInputDatePicker = styled(InputDatePicker)`
    max-width: calc(50% - 5px);

    @media (max-width: 400px) {
        max-width: 100%;
    }
`;

export const InputWrapper = styled.div`
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    & > div {
        flex: 1;
    }
`;

export const InputWrapperDatePicker = styled.div`
    margin-left: 16px;
    margin-right: 16px;
    margin-top: 8px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;

    & > div {
        flex: 1;
    }

    @media (max-width: 400px) {
        justify-content: start;
        flex-direction: column;
        gap: 20px;
    }
`;
