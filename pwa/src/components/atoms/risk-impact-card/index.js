import React from "react";
import * as Icon from "react-icons/fa";
import {
    CardIcon,
    Container,
    Content,
    Header,
    Label,
    Title,
    Value,
} from "./styles";

function RiskImpactCard({
    title,
    icon = "FaTimes",
    borderColor,
    dangersAspects = [],
    risksImpacts = [],
    typeRiskImpactCode,
    onClickEdit = () => { },
    ...rest
}) {
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
    };


    const renderValues = (renderValues) => {
        return renderValues.join(" · ");
    };

    const renderIcon = (iconName, props = {}) => {
        try {
            const iconConverted = `Fa${convertText(iconName)}`;

            return Icon[iconConverted](props);
        } catch (error) {
            return Icon['FaCog'](props);
        }
    };

    return (
        <Container {...rest}>
            <Header borderColor={borderColor}>
                <div>
                    <CardIcon>{renderIcon(icon)}</CardIcon>
                    <Title>{title}</Title>
                </div>
                {renderIcon('pencil-alt', { style: { cursor: 'pointer' }, onClick: () => onClickEdit() })}
            </Header>
            <Content>
                <div>
                    <Label>{typeRiskImpactCode === 1 ? 'PERIGO' : 'ASPECTO'}</Label>
                    <Value>{renderValues(dangersAspects)}</Value>
                </div>
                <div>
                    <Label>{typeRiskImpactCode === 1 ? 'RISCO' : 'IMPACTO'}</Label>
                    <Value>{renderValues(risksImpacts)}</Value>
                </div>
            </Content>
        </Container>
    );
}

export default RiskImpactCard;
