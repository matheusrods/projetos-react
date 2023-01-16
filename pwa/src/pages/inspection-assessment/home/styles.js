import styled from "styled-components";
import colors from "../../../styles/colors";
import {FiUsers} from 'react-icons/fi';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${colors.gray2};
    padding: 0 16px 96px;
    height: calc(100% - 76px);
    overflow-y: auto;
    max-width: 768px;
    margin: 76px auto 0;

    @media (min-width: 768px) {
        padding: 0 16px;
    }
`;

export const SectionTitle = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.gray4};
  margin-bottom: 12px;
  margin-top: 20px;

  &:first-child {
      margin-top: 0;
  }
`;

export const FilterActionsButton = styled.button`
    height: 48px;
    width: 48px;
    background-color: ${colors.gray5};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 16px;
    right: 64px;
    outline: none;
    border: none;
`;

export const UserIcon = styled(FiUsers).attrs({
    size: 18,
})`
  margin-right: 10px;
`;
