import styled from 'styled-components';
import colors from '../../../../../../styles/colors';

export const ReasonText = styled.h2`
    font-size: 14px;
    line-height: 16px;
    font-weight: 400;
    color: ${colors.client};
    padding: 8px 0;

    strong {
        font-weight: 500;
    }
`;

export const Container = styled.div`
    background-color: ${colors.gray2};
    height: 100%;
    max-width: 768px;
    margin: 0px auto 0px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    /* @media (max-width: 768px) {
        margin: 0px;
        height: 100%;
    } */
`;

export const Content = styled.div`
    flex: 1;
    padding: 20px 16px 40px;
    overflow-y: auto;
`;

export const Title = styled.h1`
    font-size: 16px;
    line-height: 19px;
    font-weight: 400;
    color: #333333;
    margin-bottom: 16px;
`;

export const Card = styled.div`
    padding: 16px;
    background-color: ${colors.white};
    border-radius: 3px;
`;

export const CardHeader = styled.section`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding-bottom: 8px;
`;

export const CardTitle = styled.h1`
    font-size: 14px;
    font-weight: 500;
    color: ${colors.gray4};
    line-height: 16px;
`;

export const CardSubTitle = styled.h2`
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    color: ${colors.gray5};
`;

export const CardDetails = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
`;

export const CardDetailsValue = styled.span`
    font-size: 11px;
    line-height: 16px;
    font-weight: 400;
    color: ${colors.gray3};
`;

export const Iso = styled.h1`
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: ${colors.text};
`;

export const Id = styled.h2`
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    color: ${colors.gray3};
`;

export const CardBody = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 16px;
`;

export const CardBodyText = styled.p`
    display: ${(props) => props.display ?? null};
    margin: ${(props) => props.margin ?? null};
    font-weight: 400;
    font-size: 12px;
    line-height: 16px;
    color: ${colors.text};
`;

export const CardBodyTitle = styled.h3`
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: ${colors.text};
`;

export const CardBodyQuestion = styled.section`
    padding: 16px 0;
`;

export const CheckboxLabel = styled.label`
    margin: ${(props) => props.margin ?? null};
`;

export const JustificationTitle = styled.h3`
    font-size: 10px;
    line-height: 12px;
    font-weight: 500;
    text-transform: uppercase;
    color: ${colors.text};
`;


export const ContainerSuccess = styled.div`
    min-height: calc(100% - 76px);
    display: flex;
    background-color: ${colors.white};
    flex-direction: column;
    height: 100%;
    max-width: 768px;
    margin: 0 auto;
    /* padding-bottom: 160px; */
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
    color: #4f4f4f;
    text-transform: uppercase;
    margin-top: 24px;
    margin-bottom: 16px;
`;