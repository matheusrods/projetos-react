import React from "react";
import {
    SmallCard as SmallCardComponent,
    Flex,
    SeeNow,
    Strong
} from "./styles";
import colors from '../../../styles/colors';
import { FaCaretRight, FaExclamationTriangle } from 'react-icons/fa';


const SmallCard = ({
    color = colors.environmentDangerGreen,
    link,
    strongLabel= '',
    label = '',
    seeNowLabel = '',
    icon = () => <FaExclamationTriangle size={16}/>,
}) => {
    const CustomIcon = icon;
    return (
        <SmallCardComponent
            color={color}
            to={link}
        >
            <Flex>
                <CustomIcon />
                <div>
                    <span>
                        <Strong>
                            {strongLabel}
                        </Strong>{" "}
                        {label}
                    </span>
                    <SeeNow>{seeNowLabel || 'Ver agora'}</SeeNow>
                </div>
            </Flex>
            <FaCaretRight size={16} />
        </SmallCardComponent>
    );
};

export default SmallCard;
