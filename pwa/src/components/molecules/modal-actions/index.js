import React from 'react';
import * as Icon from 'react-icons/fa';
import { Backdrop, Modal } from '../../atoms';
import { Header, Content, Line, Title, Option, OptionName } from './styles';

const ModalActions = ({ title, options = [], nameModal, visible, onClose }) => {
    const renderIcon = (iconName) => {
        return Icon[iconName]();
    };

    return (
        <Backdrop nameModal={nameModal} visible={visible} onClose={onClose}>
            <Modal visible={visible}>
                <Header>
                    <Line />
                    <Title>{title}</Title>
                </Header>
                <Content>
                    {options.map((option, index) => {
                        const { color, label, onPress, icon, disabled } =
                            option;

                        return (
                            <Option
                                key={index.toString()}
                                color={color}
                                disabled={disabled}
                            >
                                <OptionName onClick={disabled ? null : onPress}>
                                    {label}
                                </OptionName>
                                {renderIcon(icon ? icon : 'FaPen')}
                            </Option>
                        );
                    })}
                </Content>
            </Modal>
        </Backdrop>
    );
};

export default ModalActions;
