import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
    Container,
    Header,
    HeaderTextWrapper,
    LabelValueWrapper,
    Button,
    StrongSubHeader,
    SubHeaderTextWrapper,
    Label,
    Footer,
    DetailsButton,
    Body,
    Item,
    Row,
    FullDescription,
    InlineSpanIconText,
    ItemLabel,
    ItemLabelSoft,
    AlertItem
} from './styles';
import { FaAngleRight } from 'react-icons/fa';
import DropdownMenu from '../dropdown-menu';

function InfoCard({
    borderColor = null,
    actions = [],
    subHeaderBold = '',
    subHeaderLabel = '',
    subHeaderValue = '',
    showFooterAction = false,
    footerActionLabel = '',
    footerAction = () => {},
    children,
    title
}) {

    return (
        <Container>
            <Header borderColor={borderColor}>
                <HeaderTextWrapper>
                    <h2>{title}</h2>
                    {actions.length > 0 &&
                        <DropdownMenu
                            label={() => <BsThreeDotsVertical />}
                            actions={actions}
                            align='right'
                        />
                    }
                </HeaderTextWrapper>
                <SubHeaderTextWrapper>
                    {subHeaderBold &&
                        <StrongSubHeader>
                            {subHeaderBold}
                        </StrongSubHeader>
                    }
                    {(subHeaderLabel || subHeaderValue) &&
                        <LabelValueWrapper>
                            {subHeaderLabel &&
                                <Label>
                                    {subHeaderLabel}
                                </Label>
                            }
                            {subHeaderValue &&
                                <Label>
                                    {subHeaderValue}
                                </Label>
                            }
                        </LabelValueWrapper>
                    }
                </SubHeaderTextWrapper>
            </Header>
            <Body>{children}</Body>
            <Footer>
                <div></div>
                {showFooterAction &&
                    <Button onClick={footerAction}>
                        <DetailsButton>
                            {footerActionLabel || 'Ver detalhes'} <FaAngleRight />
                        </DetailsButton>
                    </Button>
                }
            </Footer>
        </Container>
    );
}

function InfoCardItem ({
    labelBold = '',
    label = '',
    inlineValueLabel = '',
    inlineIconLabel,
    fullDescription = '',
    labelSoft = '',
    borderBottom = true,
    customPadding = '',
    multiLineValue = []
}) {
    const InlineIconLabel = inlineIconLabel;
    return (
        <Item borderBottom={borderBottom} customPadding={customPadding}>
            {(labelBold || inlineValueLabel || inlineIconLabel || label || labelSoft) &&
                <Row>
                    {labelBold &&
                        <ItemLabel>
                            <strong>
                                {labelBold}
                            </strong>
                        </ItemLabel>
                    }
                    {label &&
                        <ItemLabel>
                            {label}
                        </ItemLabel>
                    }
                    {labelSoft &&
                        <ItemLabelSoft>
                            {labelSoft}
                        </ItemLabelSoft>
                    }
                    { (inlineIconLabel || inlineValueLabel || multiLineValue.length > 0) &&
                        <div>
                            {inlineIconLabel && <InlineIconLabel />}
                            <InlineSpanIconText>{inlineValueLabel}</InlineSpanIconText>
                            {multiLineValue.map((item, index) => (
                                <InlineSpanIconText key={index}>{item}</InlineSpanIconText>
                            ))}
                        </div>
                    }
                </Row>
            }

            {fullDescription &&
                <FullDescription>
                    {fullDescription}
                </FullDescription>
            }
        </Item>
    )
}

function InfoCardAlertInfo ({
    label= '',
    color = '',
}) {
    return (
        <AlertItem color={color}>
            {label}
        </AlertItem>
    )
}
export default InfoCard;
export { InfoCardItem, InfoCardAlertInfo };
