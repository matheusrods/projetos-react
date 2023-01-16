import React, { useEffect, useRef, useState } from 'react';
import {
    Container,
    Dropdown,
    Wrapper,
    DropdownItem,
    WrapperLabel
} from './styles';

function DropdownMenu({
    label,
    actions,
    align = 'left',
}) {
    const Label = label;
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }
    const closeDropdown = (e, div) => {
        if (div && !div.contains(e.target)) {
            setIsOpen(false);
        }
    }
    const innerRef = useRef(null);
    useEffect(() => {
        const div = innerRef.current;
        document.addEventListener('click', (e) => closeDropdown(e, div));
        return () => {
            document.removeEventListener('click', (e) => closeDropdown(e, div));
        };
    }, [isOpen]);
    return (
        <Container ref={innerRef}>
            <WrapperLabel onClick={() => handleClick()}>
                {<Label />}
            </WrapperLabel>
            {isOpen &&
                <Dropdown align={align}>
                    <Wrapper>
                        {actions.map((action, index) => (
                            <DropdownItem key={index} onClick={action.onClick}>
                                {action.label}
                            </DropdownItem>
                        ))}
                    </Wrapper>
                </Dropdown>
            }

        </Container>

    );
}

export default DropdownMenu;
