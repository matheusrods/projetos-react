import React from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { TagStatus } from '..';

import {
    CardContainer,
    Top,
    Bottom,
    Title,
    Status,
    Date,
    Button
} from './styles';

const AuditRequirementsCard = ({
    backgroundColor,
    borderColor,
    onClick = () => { },
    item
}) => {
    return (
        <CardContainer
            onClick={() => onClick(item)}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
        >
            <Top>
                <Title>{item?.titleNotFormatted}</Title>
                <Status>
                    <TagStatus
                        label={item?.submittedAudit ? 'Concluído' : 'Análise pendente'}
                        color={item?.submittedAudit ? '#00B247' : '#F5AD3F'}
                    />
                </Status>
            </Top>
            <Bottom hasDate={item?.submittedAuditDate ? true : false}>
                {/* <Date>{item.date}</Date> */}
                {/* <Button>{item.buttonLabel} <FaAngleRight /></Button> */}
                {item?.submittedAuditDate && <Date>{item.submittedAuditDate}</Date>}
                <Button>
                    {item?.submittedAudit ? 'Ver registros' : 'Ver detalhes'} <FaAngleRight />
                </Button>
            </Bottom>
        </CardContainer>
    );
};

export default AuditRequirementsCard;
