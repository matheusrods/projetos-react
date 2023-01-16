import styled, { css, keyframes } from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const spin = keyframes`
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 20px 16px 16px;
    max-height: calc(100% - 142px);
    background-color: #FFFFFF;
    max-width: 768px;
    width: 100%;
    margin: 0 auto;
`;

export const SearchContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
`;

export const InputGroup = styled.div`
    height: 44px;
    width: 100%;
    position: relative;
`;

export const LeftIcon = styled.div`
    height: 44px;
    width: 44px;
    position: absolute;
    top: 0px;
    left: 0px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #2D373C;
    padding-left: 3px;
`;

export const RightIcon = styled.button`
    height: 100%;
    width: 32px;
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 14px;
    padding-right: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #2D373C;
    outline: none;
    border: 0px;
    background-color: transparent;
`;

export const SearchInput = styled.input`
    width: 100%;
    height: 44px;
    padding: 0px 32px 0px 44px;
    border: 1.5px solid #5E687D;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #2D373C;
    outline: none;

    &::placeholder {
        color: #2D373C;
    }
`;

export const FieldName = styled.label`
    font-size: 10px;
    font-weight: 500;
    line-height: 12px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #9FA8B3;
    margin-bottom: 8px;
`;

export const List = styled.div`
    flex: 1;
    overflow-y: auto;
    display: grid;
    align-content: baseline;
    gap: ${(props) => {
        switch (props.category) {
            case 'user':
                return '9px';
            case 'checkbox':
                return '0px';
            case 'observer':
            case 'safety-walk-talk':
                return '8px';
            case 'danger-aspect-type':
                return '8px';
            default:
                return '0px';
        }
    }};

    ${props => props?.category && props.category === 'danger-aspect-type' && css`
        grid-template-columns: repeat(2, 1fr);
    `}
`;

export const NoRecord = styled.p`
    font-size: 12px;
    font-weight: 400;
    line-height: 14px;
    color: #9FA8B3;
    word-break: break-all;
`;

export const Keyword = styled.span`
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    color: #9FA8B3;
    display: block;
`;

export const LoadMoreButton = styled.button`
    height: 44px;
    background: #FAA50A;
    border-radius: 3px;
    border: none;
    outline: none;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #FFFFFF;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Loading = styled(FaSpinner)`
    animation: ${spin} 2s infinite linear;
`;

export const ContainerLimit = styled.div`
    display: flex;
    flex-direction: row;
    margin-bottom: 8px;
    gap: 16px;
`;

export const LimitText = styled.span`
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
    text-transform: uppercase;
    color: #9FA8B3;
`;
