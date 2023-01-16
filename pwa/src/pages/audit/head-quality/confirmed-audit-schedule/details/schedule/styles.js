import styled from "styled-components";
import colors from "../../../../../../styles/colors";

export const Container = styled.div`
    min-height: calc(100% - 76px);
    display: flex;
    background-color: ${colors.white};
    flex-direction: column;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding-bottom: 76px;
    overflow-y: auto;
`;

export const ContainerContent = styled.div`
    padding: 20px 16px;
    flex: 1;
    overflow-y: auto;
`;

export const H2 = styled.h2`
    font-size: 0.75rem;
    font-weight: 500;
    line-height: 1rem;
    color: #4F4F4F;
    text-transform: uppercase;
    margin-top: 24px;
    margin-bottom: 16px;
`;

export const DatePicker = styled.div`
    margin-bottom: 24px;
`;
export const Times = styled.div`
    margin-bottom: 12px;
    display: flex;
    gap: 24px;
`;
export const StartTime = styled.div`
`;
export const EndTime = styled.div`
`;
export const Team = styled.div`
`;
