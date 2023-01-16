import React from "react";
import {
    Container,
    LegendsContainer,
    Legend, Donut
} from "./styles";
import {GoPrimitiveDot} from "react-icons/all";

const Criticality = ({
    color,
    legends = [],
}) => {
    return (
       <Container>
           <Donut color={color} />
           <LegendsContainer>
               {legends.map((legend, index) => (
                   <Legend key={index}>
                       <GoPrimitiveDot color={legend.color} />
                       <span>{legend.label}</span>
                   </Legend>
               ))}
           </LegendsContainer>
       </Container>
    );
};

export default Criticality;
