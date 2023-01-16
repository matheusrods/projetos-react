import styled from 'styled-components';
import colors from '../../../../../../styles/colors';
import { FiMoreVertical } from 'react-icons/fi';

export const Container = styled.div`
    height: calc(100% - 107px);
    display: flex;
    background-color: ${colors.gray2};
    flex-direction: column;
    padding: 20px 16px 50px;
    max-width: 768px;
    margin: 0px auto;
    overflow-y: auto;
    gap: 24px;

    @media (min-width: 768px) {
        padding: 20px 16px;
    }
`;
export const CardContainer = styled.div`
    background-color: white;
    padding: 12px 16px;
    border-radius: 3px;
`;

export const ContainerPhotos = styled.div`
    margin-top: 10px;
    overflow-x: auto;
    width: 100%;
`;

export const ListPhotos = styled.div`
    display: flex;
    grid-gap: 8px;
    width: max-content;
    padding-bottom: 10px;
    cursor: pointer;
    & div {
        height: 66px;
        width: 66px;
        & img {
            object-fit: cover;
        }
    }
`;

export const Section = styled.div`
    padding: 12px 0;
    /* border-top: 1px solid ${colors.grayBorder}; */
    display: flex;
    flex-wrap: wrap;
    /* gap: ${(props) => (props.gap ? '20px' : 0)}; */
`;

export const SectionTitle = styled.h3`
    font-weight: 500;
    font-size: 14px;
    color: ${colors.gray6};
    margin-bottom: 5px;
    flex-basis: 90%;
`;

export const ContainerItem = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    align-items: center;
`;
export const ContainerItemColumn = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Label = styled.label`
    font-weight: 500;
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: ${colors.gray6};
`;

export const LabelCriticism = styled.span`
    font-size: 0.75rem;
    line-height: 1.25rem;
    color: #828282;
`;

export const Icon = styled(FiMoreVertical)`
    font-size: 1rem;
    color: ${colors.gray6};
    cursor: pointer;
`;

export const Line = styled.hr`
    border: none;
    border-bottom: 1px solid #2d373c1a;
    margin: 8px 0;
`;

export const Value = styled.label`
    font-weight: 400;
    font-size: 0.75rem;
    line-height: 1rem;
    color: ${colors.gray6};
`;

export const ValueCriticism = styled.label`
    font-size: 0.75rem;
    line-height: 1rem;
    color: #4f4f4f;
`;

export const ContainerValues = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

export const Dots = styled.div`
    width: 8px;
    height: 8px;
    border-radius: 8px;
    background-color: ${(props) => props.color};
`;

export const ContainerButton = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    cursor: pointer;
`;

export const ContainerNotFound = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 0px 20px;
`;
export const ContainerIconNotFound = styled.div`
    color: #9fa8b34D;
    font-size: 60px;
`;

export const LinkAction = styled.span`
    padding: 5px 0px;
    font-weight: 500;
    font-size: 0.75rem;
    line-height: 1rem;
    color: #faa50a;
    margin-right: 5px;
`;
export const TextNotFound = styled.span`
    font-size: 1rem;
    line-height: 1.1875rem;
    text-align: center;
    color: #828282;
`;
