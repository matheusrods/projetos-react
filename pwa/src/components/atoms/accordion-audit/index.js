import React, { useEffect, useRef, useState } from 'react';

import {
    Container,
    Label,
    AccordionSection,
    AccordionButton,
    LabelWrapper,
    Dot
} from './styles';

function AccordionAudit({
    label,
    heightAuto = null,
    children,
    status,
    quantity,
    style
}) {
    const [open, setOpen] = useState(false);
    const [sectionMaxHeight, setSectionMaxHeight] = useState(0);

    const divRef = useRef(null);

    useEffect(() => {
        if (open) {
            setSectionMaxHeight(quantity * (209 + 8));
        } else {
            setSectionMaxHeight(217);
        }
    }, [open, quantity]);

    return (
        <Container status={status} open={open} style={style}>
            <LabelWrapper onClick={() => setOpen(!open)}>
                {open ? <Dot status={status} /> : null}
                <Label open={open}>{label}</Label>
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

export default AccordionAudit;
