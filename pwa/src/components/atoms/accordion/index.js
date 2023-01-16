import React, { useEffect, useRef, useState } from 'react';

import {
    Container,
    Label,
    AccordionSection,
    AccordionButton,
    LabelWrapper
} from './styles';

function Accordion({
    label,
    heightAuto = null,
    children,
    backgroundColor = '#fff',
    labelColor = '#5E687D'
}) {
    const [open, setOpen] = useState(false);
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
            <LabelWrapper onClick={() => setOpen(!open)}>
                <Label labelColor={labelColor}>{label}</Label>
                <AccordionButton size={16} open={open} />
            </LabelWrapper>
            <AccordionSection
                maxHeight={heightAuto ?? sectionMaxHeight}
                ref={divRef}
                open={open}
            >
                {children}
            </AccordionSection>
        </Container>
    );
}

export default Accordion;
