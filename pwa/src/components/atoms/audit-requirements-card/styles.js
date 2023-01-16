import styled from 'styled-components';

export const CardContainer = styled.div`
    background-color: ${(props) => props.backgroundColor ?? '#fff'};
    box-shadow: 0px 3px 10px 0px #00000005;
    border-left: 3px solid ${(props) => props.borderColor ?? '#fff'};
    border-radius: 3px;
    /* min-height: 64px; */
    cursor: pointer;
    padding: 16px 16px 16px 11px;
    line-height: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    gap: 21px;
`;

export const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
`;
export const Title = styled.h2`
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: #5e687d;
`;
export const Status = styled.div``;

export const Bottom = styled.div`
    display: flex;
    justify-content: ${props => props?.hasDate ? 'space-between' : 'flex-end'};
    align-items: center;
    width: 100%;
`;
export const Date = styled.span`
    font-size: 0.75rem;
    line-height: 1rem;
    color: #828282;
`;
export const Button = styled.button`
    border: none;
    background-color: transparent;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #faa50a;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1rem;
`;
