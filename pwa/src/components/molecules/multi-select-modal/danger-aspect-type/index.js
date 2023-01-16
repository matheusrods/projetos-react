import React from 'react';
import * as Icon from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa';
import { Container, Header, RiskName, Checkbox } from './styles';

const DangerAspectTypeCard = ({ item: { name, icon, color, ...restItem }, selected, onPress, ...rest }) => {
    const convertText = (text) => {
        let loweredText = text.toLowerCase().split('-').join(' ');
        let words = loweredText.split(' ');

        for (var a = 0; a < words.length; a++) {
            let w = words[a];

            let firstLetter = w[0];
            w = firstLetter.toUpperCase() + w.slice(1);

            words[a] = w;
        }

        return words.join('');
    }

    const renderIcon = (iconName, props = {}) => {
        try {
            const iconConverted = `Fa${convertText(iconName)}`;

            return Icon[iconConverted](props);
        } catch(error) {
            return Icon['FaCog'](props);
        }
    }

    return (
        <Container type={'button'} onClick={onPress} borderColor={color} {...rest}>
            <Header>
                {renderIcon(icon)}
                <Checkbox selected={selected}>
                    <FaCheck />
                </Checkbox>
            </Header>
            <RiskName>{name}</RiskName>
        </Container>
    );
}

export default DangerAspectTypeCard;
