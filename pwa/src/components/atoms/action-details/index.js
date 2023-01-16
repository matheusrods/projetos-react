import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import { FaEllipsisV } from "react-icons/fa";
import colors from "../../../styles/colors";
import { Photo, File } from "../index";
import {
    ActionHeader,
    ActionId,
    ActionLabel,
    ActionStatus,
    Container,
    CriticismDot,
    DeadLineLabel,
    Flex,
    RelatedRecordsContainer,
    RelatedRecordsLabel,
    RelatedRecordsList,
    RelatedRecord,
    RelatedRecordTitle,
    RelatedRecordSubTitle,
    SectionTitle,
    SectionDescription,
    AttachedPhotos,
    AttachedPhotosList,
    SectionLabel,
    AttachedDocuments,
    AttachedDocumentsList,
    Button,
    EditIcon
} from "./styles";
import moment from "../../../config/moment";

function ActionDetails({
    action: actionData,
    backgroundColor,
    showOptions = false,
    onClickOptions,
    canAddDeadline = false,
    changeResponsible = false,
    handleAddDeadline = () => { },
}) {
    const [action, setAction] = useState({});

    const history = useHistory();

    useEffect(() => {
        setAction(actionData);
    }, [actionData]);

    return (
        <Container backgroundColor={backgroundColor}>
            {(action?.id || showOptions) && (
                <ActionHeader>
                    <ActionId>
                        {action?.id && (
                            <>
                                Id ação
                                <span>#{action.id}</span>
                            </>
                        )}
                    </ActionId>
                    {showOptions ? (
                        <FaEllipsisV
                            size={18}
                            color={colors.gray5}
                            onClick={() => onClickOptions()}
                        />
                    ) : (
                        <>
                            {action?.id && (
                                <ActionStatus
                                    color={action.status?.color ?? "grey"}
                                >
                                    {action.status?.description}
                                </ActionStatus>
                            )}
                        </>
                    )}
                </ActionHeader>
            )}
            {(!action.id || showOptions) && (
                <ActionLabel>
                    <span>Status</span>
                    <div>
                        <ActionStatus color={action.status?.color ?? "grey"}>
                            {action.status?.description}
                        </ActionStatus>
                    </div>
                </ActionLabel>
            )}
            {action?.dynamicFields && action.dynamicFields.length > 0 &&
                action.dynamicFields.map(field => (
                    <ActionLabel
                        key={field.id.toString()}
                        direction={field.value.toString().length > 45 ? "column" : "row"}
                    >
                        <span>{field.fieldName}</span>
                        <span>{field.value}</span>
                    </ActionLabel>
                )
            )}
            <ActionLabel>
                <span>Tipo da ação</span>
                <span>{action?.type?.description}</span>
            </ActionLabel>
            <ActionLabel>
                <span>Criticidade</span>
                <Flex>
                    <span>{action?.criticism?.description}</span>
                    <CriticismDot color={action?.criticism?.color} />
                </Flex>
            </ActionLabel>
            {action?.registrationDateTime && (
                <ActionLabel>
                    <span>Registrado em</span>
                    <span>{action.registrationDateTime}</span>
                </ActionLabel>
            )}
            <ActionLabel>
                <span>Identificado por</span>
                <span>{action?.user?.name}</span>
            </ActionLabel>
            <ActionLabel direction={"column"}>
                <span>Local da Observação</span>
                <p>{action?.location?.fullAddress}</p>
            </ActionLabel>
            <ActionLabel direction={"column"}>
                <span>Origem</span>
                <span>{action?.origin?.description}</span>
            </ActionLabel>
            <ActionLabel direction={"column"}>
                <span>Descrição do desvio</span>
                <p>{action?.deviationDescription}</p>
            </ActionLabel>
            <ActionLabel direction={"column"}>
                <span>Descrição da ação</span>
                <p>{action?.description}</p>
            </ActionLabel>
            <ActionLabel direction={"column"}>
                <span>Local da ação</span>
                <span>{action?.actionLocationDescription}</span>
            </ActionLabel>
            <ActionLabel>
                <span>Responsável</span>
                <span>
                    {action?.responsible?.name ?? "Em processo de aceite"}
                    {changeResponsible && (
                        <EditIcon
                            onClick={() => history.push(`/action/details/${action.id}/change-responsible`)}
                        />
                    )}
                </span>
            </ActionLabel>
            {canAddDeadline && !moment(new Date(action.deadline)).isValid() ? (
                <>
                    <ActionLabel>
                        <span>Prazo</span>
                        <Flex>
                            <Button onClick={handleAddDeadline}>
                                Adicionar
                            </Button>
                        </Flex>
                    </ActionLabel>
                </>
            ) : (
                <>
                    {action.deadline && (
                        <ActionLabel>
                            <span>Prazo</span>
                            <Flex>
                                <span>
                                    {moment(new Date(action.deadline)).isValid()
                                        ? moment(action.deadline).format(
                                            "DD/MM/YYYY"
                                        )
                                        : action.deadline}
                                </span>
                                {action.reopened && (
                                    <DeadLineLabel color={"#FF5C69"}>
                                        Reaberto
                                    </DeadLineLabel>
                                )}
                            </Flex>
                        </ActionLabel>
                    )}
                </>
            )}
            {action?.relatedRecords && action.relatedRecords.length > 0 && (
                <RelatedRecordsContainer>
                    <RelatedRecordsLabel>
                        Registros relacionados
                    </RelatedRecordsLabel>
                    <RelatedRecordsList>
                        {action.relatedRecords.map((option, index) => {
                            const {
                                improvementActionId,
                                originDescription,
                                typeRelationship,
                            } = option;

                            return (
                                <RelatedRecord key={index} onClick={() => history.push(`/action/details/${improvementActionId}`)}>
                                    <RelatedRecordTitle>
                                        #{improvementActionId} -{" "}
                                        {originDescription}
                                    </RelatedRecordTitle>
                                    <RelatedRecordSubTitle>
                                        {typeRelationship === 1
                                            ? "Análise de Eficácia"
                                            : "Análise de Abrangência"}
                                    </RelatedRecordSubTitle>
                                </RelatedRecord>
                            );
                        })}
                    </RelatedRecordsList>
                </RelatedRecordsContainer>
            )}
            {action?.completed?.date && action?.completed?.comments && (
                <Fragment>
                    <SectionTitle>Detalhes da conclusão</SectionTitle>
                    <SectionDescription>Informe os detalhes</SectionDescription>
                    <ActionLabel noBorder={true}>
                        <span>Data de conclusão</span>
                        <span>{action.completed.date}</span>
                    </ActionLabel>
                    <ActionLabel>
                        <span>Observações</span>
                        <p>{action.completed.comments}</p>
                    </ActionLabel>
                    {action?.completed?.documents &&
                        action.completed.documents.length > 0 && (
                            <AttachedDocuments>
                                <SectionLabel>Documentos anexos</SectionLabel>
                                <AttachedDocumentsList>
                                    {action.completed.documents.map((item) => {
                                        return (
                                            <File
                                                key={item.id}
                                                filename={item.filename}
                                                size={item.size}
                                                url={item.url}
                                                showRemove={false}
                                            />
                                        );
                                    })}
                                </AttachedDocumentsList>
                            </AttachedDocuments>
                        )}
                    {action?.completed?.photos &&
                        action.completed.photos.length > 0 && (
                            <AttachedPhotos>
                                <SectionLabel>
                                    Fotos do resultado da ação
                                </SectionLabel>
                                <AttachedPhotosList>
                                    {action.completed.photos.map((item) => {
                                        return (
                                            <Photo
                                                src={item.url}
                                                key={item.id}
                                                onClickOptions={() => {
                                                    history.push(`/action-plan/${item.id}/view-photo`, {
                                                        photo: item,
                                                    });
                                                }}
                                            />
                                        );
                                    })}
                                </AttachedPhotosList>
                            </AttachedPhotos>
                        )}
                </Fragment>
            )}
        </Container>
    );
}

ActionDetails.propTypes = {
    action: PropTypes.shape({
        id: PropTypes.number,
        status: PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string,
            color: PropTypes.string,
        }),
        criticism: PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string,
            color: PropTypes.string,
        }),
        origin: PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string,
        }),
        type: PropTypes.shape({
            id: PropTypes.number,
            description: PropTypes.string,
        }),
        observedItem: PropTypes.string,
        responsible: PropTypes.shape({
            name: PropTypes.string,
        }),
        deadline: PropTypes.string,
        daysToExpire: PropTypes.number,
        daysLate: PropTypes.number,
        location: PropTypes.shape({
            fullAddress: PropTypes.string,
        }),
        description: PropTypes.string,
        date: PropTypes.string,
        user: PropTypes.shape({
            avatar: PropTypes.string,
            name: PropTypes.string,
        }),
        actionLocationDescription: PropTypes.string,
    }),
    backgroundColor: PropTypes.string,
};

export default ActionDetails;
