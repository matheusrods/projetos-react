import styled from "styled-components";
import colors from "../../../../../../styles/colors";

export const Container = styled.div`
`;

export const PageTitle = styled.h2`
  font-size: 18px;
  color: ${colors.text};
  margin-bottom: 20px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  margin-bottom: 20px;
`;

export const WrapperCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  margin-bottom: 20px;
`;
