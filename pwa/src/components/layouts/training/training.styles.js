import styled from 'styled-components';
import { Container as Content } from '../../../pages/WantToSee/styles';

export const Container = styled(Content)`
    padding: 0;
    padding-top: ${({ didOnboarding }) => (didOnboarding ? '96px' : '10px')};
`;
