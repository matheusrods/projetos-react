import styled from "styled-components";
import colors from "../../../../../styles/colors";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;
export const Title = styled.h2`
    color: ${colors.text};
    font-size: 18px;
    margin-bottom: 20px;
`;

export const WrapperLabel = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;
export const Label = styled.div`
    color: ${colors.text};
    font-size: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    svg {
        margin-right: 5px;
    }
`;
export const Value = styled.div`
    color: ${colors.blue2};
    font-size: 28px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Wrapper = styled.div`
  margin-bottom: 20px;
`;
