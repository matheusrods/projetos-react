import React, { useEffect, useRef, useState } from 'react';

import CheckBoxItem from '../checkbox';

import {
    Container,
    Label,
    AccordionSection,
    AccordionButton,
    LabelWrapper,
    ContainerText
} from './styles';

function AccordionWithCheckbox({
    label,
    heightAuto = null,
    children,
    backgroundColor = '#fff',
    labelColor = '#5E687D',
    checkboxId,
    onSelect,
    selected,
    reference = 'id'
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
    // console.log(selected.some((value) => {return value === checkboxId;}))
    return (
        <Container backgroundColor={backgroundColor}>
            <ContainerText>
                <CheckBoxItem
                    onSelect={() => onSelect(checkboxId)}
                    selected={selected?.some(value => value === checkboxId
                    )}
                    type={'button'}
                    backgroundColor={'transparent'}
                    borderColor={'none'}
                    width={'unset'}
                />
                <LabelWrapper onClick={() => setOpen(!open)}>
                    <Label labelColor={labelColor}>{label}</Label>
                    <AccordionButton size={16} open={open} />
                </LabelWrapper>
            </ContainerText>
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

export default AccordionWithCheckbox;
