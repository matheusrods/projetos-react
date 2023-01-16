import React, { useEffect, useRef, useState } from 'react';

import {
    Container,
    Label,
    AccordionSection,
    AccordionButton,
    LabelWrapper,
    LabelRow,
    AccordionItem
} from './styles';
import colors from '../../../styles/colors';
import { useHistory } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
function AccordionCard({
       label,
       heightAuto = null,
       icon = () => {},
       children,
       backgroundColor = colors.shape,
       labelColor = colors.gray4
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [sectionMaxHeight, setSectionMaxHeight] = useState(0);
    const divRef = useRef(null);

    useEffect(() => {
        if (
            divRef.current?.offsetHeight &&
            sectionMaxHeight < divRef.current?.offsetHeight
        ) {
            setSectionMaxHeight(divRef.current?.offsetHeight);
        }
    }, [divRef.current?.offsetHeight, sectionMaxHeight]);

    return (
        <Container backgroundColor={backgroundColor}>
            <LabelWrapper onClick={() => setIsOpen(!isOpen)}>
                <LabelRow>
                    {icon()}
                    <Label labelColor={labelColor}>{label}</Label>
                </LabelRow>

                <AccordionButton size={16} open={isOpen} />
            </LabelWrapper>
            <AccordionSection
                maxHeight={heightAuto ?? sectionMaxHeight}
                ref={divRef}
                open={isOpen}
            >
                {children}
            </AccordionSection>
        </Container>
    );
}

function AccordionCardItem({
    label = '',
    icon = () => {},
    link = '',
    labelColor = colors.text
}) {
    const history = useHistory();
    return (
        <AccordionItem onClick={() => {history.push(link)}}>
            <LabelWrapper>
                <LabelRow>
                    {icon()}
                    <Label labelColor={labelColor}>{label}</Label>
                </LabelRow>
                <FiChevronRight size={20} color={colors.subText} />
            </LabelWrapper>
        </AccordionItem>
    );
}

export default AccordionCard;
export { AccordionCardItem };
