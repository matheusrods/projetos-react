import React, { Fragment, useEffect, useState } from "react";
import {
    FaCamera,
    FaExclamationTriangle,
    FaPaperclip,
    FaPlus,
    FaTimes,
    FaTrashAlt,
} from "react-icons/fa";
import { Redirect, useHistory } from "react-router";
import {
    TextAreaDefault,
    WhiteHeader,
    Photo,
    File,
    InputDatePicker,
} from "../../components/atoms";
import { ConfirmCancelFooter, Header } from "../../components/organisms";
import {
    LoadingContainer,
    ModalActions,
    ModalComplex,
    RadioButtonInlineGroup,
} from "../../components/molecules";
import {
    Container,
    Content,
    SectionTitle,
    SectionDescription,
    Label,
    InputFile,
    InputField,
    ListFiles,
    ContainerPhotos,
    LabelListPhotos,
    ListPhotos,
    AddPhotoButton,
    LoadingIcon,
} from "./styles";
import { useParams } from "react-router-dom";
import {
    createFile,
    deleteFile,
    getFilesByActionId,
    updateAction,
} from "../../services/endpoints/actions";
import { toast } from "react-toastify";
import Yup from "../../config/yup";
import { inject, observer } from "mobx-react";
import colors from "../../styles/colors";

const CompleteAction = ({
    CompleteActionStore,
    PermissionStore: { hasPermission }
}) => {
    const history = useHistory();

    const { getData, setData, reset } = CompleteActionStore;

    const { id } = useParams();

    const [modalConfirmConcludeVisible, setModalConfirmConcludeVisible] = useState(false);
    const [modalActionsVisible, setModalActionsVisible] = useState(false);
    const [modalConfirmDeleteVisible, setModalConfirmDeleteVisible] = useState(false);
    const [modalExitPage, setModalExitPage] = useState({ visible: false, path: null });
    const [modalOptions, setModalOptions] = useState({
        fileId: null,
        fileType: null,
    });

    const [completedAction, setCompletedAction] = useState(null);
    const [conclusionDate, setConclusionDate] = useState(new Date());
    const [conclusionComments, setConclusionComments] = useState('');
    const [files, setFiles] = useState([]);
    const [photos, setPhotos] = useState([]);

    const [loading, setLoading] = useState(true);
    const [loadingFileId, setLoadingFileId] = useState(false);
    const [loadingUpdating, setLoadingUpdating] = useState(false);
    const [inputLoading, setInputLoading] = useState(false);

    const [errors, setErrors] = useState({});

    const handleSubmit = async () => {
        const data = {
            conclusionComments,
            conclusionDate,
        };

        try {
            setLoadingUpdating(true);

            const schema = Yup.object().shape({
                conclusionDate: Yup.date()
                    .required()
                    .label("Data de conclusão")
                    .transform((curr, orig) => (orig === "" ? null : curr))
                    .typeError('O campo precisa ser uma data válida.'),
                conclusionComments: Yup.string()
                    .required()
                    .label("Observações"),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            setErrors({});

            const response = await updateAction(id, {
                conclusionDate: data.conclusionDate,
                conclusionComments: data.conclusionComments,
                statusId: 5,
            });

            if (response) {
                reset();

                history.push("/action-plan");
            } else {
                setModalConfirmConcludeVisible(false);
                setLoadingUpdating(false);
            }
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                setModalConfirmConcludeVisible(false);
                setLoadingUpdating(false);

                const errorMessages = {};

                error.inner.forEach((err) => {
                    errorMessages[err.path] = err.message;
                });

                setErrors(errorMessages);
            }
        }
    };

    const renderPhotos = () => {
        return photos?.map((item) => (
            <Photo
                src={item.url}
                key={item.id}
                loading={item.id === loadingFileId}
                onClickOptions={() => {
                    setModalOptions({
                        fileId: item.id,
                        fileType: 1,
                    });
                    setModalActionsVisible(true);
                }}
            />
        ));
    };

    const renderFiles = () => {
        return files?.map((item) => (
            <File
                key={item.id}
                filename={item.filename}
                size={item.size}
                url={item.url}
                loading={item.id === loadingFileId}
                onClickRemove={() => {
                    setModalOptions({
                        fileId: item.id,
                        fileType: 2,
                    });
                    setModalConfirmDeleteVisible(true);
                }}
            />
        ));
    };

    const handleFileInputChange = async (e, fileType) => {
        const file = e.target.files[0];

        if (file) {
            if (file.size > 5000000) {
                toast.error("O limite máximo para envio de arquivos é de 5 MB!");
                return;
            }

            if (fileType === 1 && !file.name.match(/.(jpg|jpeg|png|gif)$/i)) {
                toast.error("O arquivo selecionado não é uma imagem válida!");
                return;
            } else if (fileType === 2 && !file.name.match(/.(jpg|jpeg|png|gif|pdf)$/i)) {
                toast.error("O arquivo selecionado precisa ter uma das seguintes extensões: .jpg, .jpeg, .png, .gif, .pdf");
                return;
            }

            setInputLoading(true);

            const createdFile = await createFile({
                file: file,
                actionId: id,
                fileType: fileType,
            });

            if (createdFile) {
                if (fileType === 1) {
                    setPhotos((old) => [...old, createdFile]);

                    document.getElementById('upload-photo').value = '';
                } else if (fileType === 2) {
                    setFiles((old) => [...old, createdFile]);

                    document.getElementById('upload-file').value = '';
                }
            }

            setInputLoading(false);
        }
    };

    const handleDeleteFile = async (id, fileType) => {
        setLoadingFileId(id);
        setModalActionsVisible(false);
        setModalConfirmDeleteVisible(false);
        setModalOptions({
            fileId: null,
        });

        const deleted = await deleteFile(id);

        if (deleted) {
            if (fileType === 1) {
                setPhotos((old) => old.filter((item) => item.id !== id));
            } else if (fileType === 2) {
                setFiles((old) => old.filter((item) => item.id !== id));
            }
        }
        setLoadingFileId(false);
    };

    useEffect(() => {
        const getFiles = async () => {
            setLoading(true);

            const { files, images } = await getFilesByActionId(id);

            setFiles(files);
            setPhotos(images);

            setLoading(false);
        };

        getFiles();
    }, [id, getData]);

    useEffect(() => {
        const response = getData();

        setCompletedAction(response.completedAction);
        setConclusionDate(response.conclusionDate);
        setConclusionComments(response.conclusionComments);
    }, [getData]);

    return hasPermission(5) ? (
        <Fragment>
            <Header hiddenMobile={true} />
            <Container>
                <WhiteHeader
                    title={"Concluir ação"}
                    onClose={() => setModalExitPage({ visible: true, path: `/action-plan` })}
                />
                <Content>
                    {loading ? (
                        <LoadingContainer />
                    ) : (
                        <Fragment>
                            <SectionTitle>
                                Informe os detalhes da conclusão
                            </SectionTitle>
                            <InputField>
                                <RadioButtonInlineGroup
                                    label={"Você conseguiu concluir esta ação?"}
                                    options={[
                                        {
                                            id: 1,
                                            label: "Sim",
                                        },
                                        {
                                            id: 0,
                                            label: "Não",
                                        },
                                    ]}
                                    selected={completedAction}
                                    onSelect={(reference) => {
                                        setCompletedAction(reference);
                                        setData({ completedAction: reference });
                                    }}
                                />
                            </InputField>
                            <InputField>
                                <InputDatePicker
                                    name={"conclusionDate"}
                                    label={"Data de conclusão"}
                                    maxDate={new Date()}
                                    error={errors?.conclusionDate}
                                    clearIcon={<FaTimes color={colors.gray4_2} />}
                                    initialValue={conclusionDate}
                                    onChange={(value) => {
                                        setConclusionDate(value);
                                        setData({ conclusionDate: value });
                                    }}
                                />
                            </InputField>
                            <InputField>
                                <TextAreaDefault
                                    name={"conclusionComments"}
                                    label={"Observações"}
                                    placeholder={"Complemente com suas observações"}
                                    value={conclusionComments}
                                    error={errors?.conclusionComments}
                                    onChange={(e) => {
                                        setConclusionComments(e.target.value);
                                        setData({ conclusionComments: e.target.value });
                                    }}
                                />
                            </InputField>
                            <SectionTitle hasBorderBottom>
                                Anexar documentos
                            </SectionTitle>
                            <SectionDescription>
                                Adicione arquivos e documentos que ilustrem
                                o resultado da ação (opcional). As extensões aceitas são: jpg, jpeg, png, gif, pdf. E o tamanho máximo para upload é de 5 MB.
                            </SectionDescription>
                            <ListFiles>{renderFiles()}</ListFiles>
                            <Label
                                htmlFor={"upload-file"}
                                disabled={inputLoading}
                            >
                                {inputLoading ? (
                                    <LoadingIcon />
                                ) : (
                                    <FaPaperclip />
                                )}
                                Anexar arquivos
                            </Label>
                            <InputFile
                                onChange={(e) =>
                                    handleFileInputChange(e, 2)
                                }
                                id={"upload-file"}
                                type={"file"}
                                accept={'application/pdf,image/*'}
                                disabled={inputLoading}
                            />
                            <SectionTitle hasBorderBottom>
                                Fotos do resultado da ação
                            </SectionTitle>
                            <SectionDescription>
                                Adicione fotos que ilustrem o resultado da
                                ação (opcional). As extensões aceitas são: jpg, jpeg, png, gif. E o tamanho máximo para upload é de 5 MB.
                            </SectionDescription>
                            {photos?.length === 0 && (
                                <Label
                                    htmlFor={"upload-photo"}
                                    disabled={inputLoading}
                                >
                                    {inputLoading ? (
                                        <LoadingIcon />
                                    ) : (
                                        <FaCamera />
                                    )}
                                    Adicionar fotos
                                </Label>
                            )}
                            <InputFile
                                id={"upload-photo"}
                                type={"file"}
                                onChange={(e) => handleFileInputChange(e, 1)}
                                disabled={inputLoading}
                                accept={"image/*"}
                            />
                            <ContainerPhotos>
                                {photos?.length !== 0 && (
                                    <Fragment>
                                        <LabelListPhotos>
                                            Fotos adicionadas
                                        </LabelListPhotos>
                                        <ListPhotos>
                                            {renderPhotos()}
                                            <AddPhotoButton
                                                htmlFor={"upload-photo"}
                                                disabled={inputLoading}
                                            >
                                                <FaPlus />
                                            </AddPhotoButton>
                                        </ListPhotos>
                                    </Fragment>
                                )}
                            </ContainerPhotos>
                        </Fragment>
                    )}
                </Content>
                <ConfirmCancelFooter
                    confirmButtonLabel={"Confirmar"}
                    confirmButtonDisabled={!completedAction || loadingUpdating || loading || loadingFileId || inputLoading}
                    confirmButtonLoading={loadingUpdating}
                    cancelButtonLabel={"Cancelar"}
                    onConfirm={() => setModalConfirmConcludeVisible(true)}
                    onCancel={() => setModalExitPage({ visible: true, path: `/action/details/${id}` })}
                />
            </Container>
            <ModalActions
                title={"Imagem"}
                nameModal={"modal-actions"}
                visible={modalActionsVisible}
                onClose={() => setModalActionsVisible(false)}
                options={[
                    {
                        label: "Editar item",
                        onPress: () =>
                            history.push(`${id}/view-photo`, {
                                photo: photos.find(
                                    (item) => item.id === modalOptions.fileId
                                ),
                            }),
                    },
                    {
                        label: "Excluir item",
                        onPress: () => setModalConfirmDeleteVisible(true),
                        icon: "FaTrashAlt",
                        color: "#FF5C69",
                    },
                ]}
            />
            <ModalComplex
                title={"Excluir"}
                description={"Ao prosseguir, o item selecionado será excluído. Deseja excluir?"}
                nameModal={"delete"}
                visible={modalConfirmDeleteVisible}
                onCancel={() => {
                    setModalConfirmDeleteVisible(false);
                    setModalOptions({
                        fileId: null,
                        fileType: null,
                    });
                }}
                onConfirm={() => handleDeleteFile(modalOptions.fileId, modalOptions.fileType)}
                icon={<FaTrashAlt size={32} />}
                confirmButtonLabel={"Sim, excluir"}
                cancelButtonLabel={"Não, cancelar"}
            />
            <ModalComplex
                title={"Atenção"}
                description={"Ao prosseguir, a ação será concluída. Este ato não pode ser revertido. Tem certeza que deseja dar esta ação como concluída?"}
                nameModal={"conclude"}
                visible={modalConfirmConcludeVisible}
                onCancel={() => setModalConfirmConcludeVisible(false)}
                onConfirm={() => handleSubmit()}
                icon={<FaExclamationTriangle size={40} color={"#5CB3FF"} />}
                confirmButtonLabel={"Sim, concluir"}
                confirmButtonLoading={loadingUpdating}
                cancelButtonLabel={"Não, cancelar"}
            />
            <ModalComplex
                title={"Atenção"}
                description={"Ao sair, você perdera todos os dados preenchidos. Este ato não pode ser revertido. Tem certeza que deseja sair?"}
                nameModal={"exit-page"}
                visible={modalExitPage.visible}
                onCancel={() => setModalExitPage({ visible: false, path: null })}
                onConfirm={() => {
                    if (modalExitPage.path.includes('/action/details/')) {
                        history.push(modalExitPage.path, { hasBackToCompleteAction: true });
                    } else {
                        history.push(modalExitPage.path);
                    }
                }}
                icon={<FaExclamationTriangle size={40} color={"#FF5C69"} />}
                confirmButtonLabel={"Sair"}
                confirmButtonLoading={loadingUpdating}
                cancelButtonLabel={"Cancelar"}
            />
        </Fragment>
    ) : <Redirect to={'/action-plan'} />;
};

export default inject('CompleteActionStore', 'PermissionStore')(observer(CompleteAction));
