import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import mergeImages from 'merge-images';
import CanvasDraw from 'react-canvas-draw';
import { Header as HeaderMain } from '../../../../../../../../components/organisms';
import {
    Container,
    Header,
    Footer,
    Color,
    Button,
    DotButton,
    ContainerActions,
    WeightLine
} from './styles';
import { inject, observer } from 'mobx-react';

const colors = [
    '#000000',
    '#FF0000',
    '#00FFFF',
    '#0000FF',
    '#0000A0',
    '#ADD8E6',
    '#800080',
    '#FFFF00',
    '#00FF00',
    '#FF00FF'
];

const sizeLines = [5, 7, 9, 11, 13];

const AuditingEditPhoto = ({ AuditProfileAuditorStore }) => {
    const history = useHistory();

    const {
        programmingInEditing = null,
        themesInAuditing = [],
        stepThemeIndex = 0,
        titlePhotoInEditingIndex = 0,
        requirementPhotoInEditingIndex = 0,
        photoInEditingIndex = 0,
        addOrUpdatePhoto: handleAddOrUpdatePhoto
    } = AuditProfileAuditorStore;

    const refCanvas = useRef(null);

    const [color, setColor] = useState('#000000');
    const [size, setSize] = useState(0);
    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(() => {
        if (
            !programmingInEditing
            || !(themesInAuditing[stepThemeIndex]
                ?.titles[titlePhotoInEditingIndex]
                ?.requirements[requirementPhotoInEditingIndex]
                ?.photos[photoInEditingIndex])
        ) {
            history.push('/audit/profile-auditor');
            return;
        }

        getDimensionsDraw(
            themesInAuditing[stepThemeIndex]
                .titles[titlePhotoInEditingIndex]
                .requirements[requirementPhotoInEditingIndex]
                .photos[photoInEditingIndex]
        );

        window.addEventListener('resize', () => {
            getDimensionsDraw(
                themesInAuditing[stepThemeIndex]
                    .titles[titlePhotoInEditingIndex]
                    .requirements[requirementPhotoInEditingIndex]
                    .photos[photoInEditingIndex]
            );
        });
    }, [themesInAuditing, stepThemeIndex, photoInEditingIndex, programmingInEditing, history, titlePhotoInEditingIndex, requirementPhotoInEditingIndex]);

    const getDimensionsDraw = async (base64) => {
        function getDimensionsBase64(file) {
            return new Promise(function (resolved) {
                const image = new Image();

                image.onload = function () {
                    resolved({ widthImage: image.width, heightImage: image.height });
                };

                image.src = file;
            });
        }

        const { widthImage = 0, heightImage = 0 } = await getDimensionsBase64(base64);

        if (
            widthImage !== 0
            && heightImage !== 0
            && (
                widthImage > window.innerWidth
                || heightImage > (window.innerHeight - (window.innerWidth <= 768 ? 80 : 159))
            )
        ) {
            const proportion = widthImage > heightImage ? heightImage / widthImage : widthImage / heightImage;

            if (window.innerWidth > (window.innerHeight - (window.innerWidth <= 768 ? 80 : 159))) {
                if (widthImage > heightImage) {
                    setWidth(window.innerHeight - (window.innerWidth <= 768 ? 80 : 159));
                    setHeight((window.innerHeight - (window.innerWidth <= 768 ? 80 : 159)) * proportion);
                } else {
                    setWidth((window.innerHeight - (window.innerWidth <= 768 ? 80 : 159)) * proportion);
                    setHeight(window.innerHeight - (window.innerWidth <= 768 ? 80 : 159));
                }
            } else {
                if (widthImage > heightImage) {
                    setWidth(window.innerWidth);
                    setHeight(window.innerWidth * proportion);
                } else {
                    setWidth(window.innerWidth * proportion);
                    setHeight(window.innerWidth);
                }
            }
        } else {
            setWidth(widthImage > window.innerWidth ? window.innerWidth : widthImage);
            setHeight(
                heightImage > (window.innerHeight - 80 - (window.innerWidth <= 768 ? 0 : 79))
                    ? (window.innerHeight - 80 - (window.innerWidth <= 768 ? 0 : 79))
                    : heightImage
            );
        }
    };

    return (
        <Fragment>
            <HeaderMain hiddenMobile={true} />
            <Container>
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Header>
                        <Button onClick={() => history.goBack()}>Fechar</Button>
                        <ContainerActions>
                            <DotButton
                                onClick={() =>
                                    setSize(sizeLines[size + 1] ? size + 1 : 0)
                                }
                            >
                                <WeightLine size={sizeLines[size]} />
                            </DotButton>
                            <Button onClick={() => refCanvas.current.undo()}>
                                Desfazer
                            </Button>
                            <Button onClick={() => refCanvas.current.clear()}>
                                Limpar
                            </Button>
                            <Button
                                onClick={() => {
                                    mergeImages(
                                        [
                                            {
                                                src: refCanvas.current.canvas.grid.toDataURL()
                                            },
                                            {
                                                src: refCanvas.current.canvas.drawing.toDataURL()
                                            }
                                        ],
                                        {
                                            format: "image/png",
                                            quality: 1,
                                            height: height,
                                            width: width,
                                        }
                                    ).then((b64) => {
                                        handleAddOrUpdatePhoto(stepThemeIndex, b64, titlePhotoInEditingIndex, requirementPhotoInEditingIndex, photoInEditingIndex);

                                        history.goBack();
                                    });
                                }}
                            >
                                Salvar
                            </Button>
                        </ContainerActions>
                    </Header>
                    <div style={{ flex: 1, backgroundColor: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CanvasDraw
                            hideGrid
                            ref={refCanvas}
                            canvasHeight={height}
                            canvasWidth={width}
                            brushColor={color}
                            lazyRadius={10}
                            brushRadius={sizeLines[size]}
                            imgSrc={
                                themesInAuditing[stepThemeIndex]
                                    .titles[titlePhotoInEditingIndex]
                                    .requirements[requirementPhotoInEditingIndex]
                                    .photos[photoInEditingIndex]
                            }
                        />
                    </div>
                    <Footer>
                        {colors.map((colorHex, index) => {
                            return (
                                <Color
                                    key={index.toString()}
                                    color={colorHex}
                                    onClick={() => setColor(colorHex)}
                                />
                            );
                        })}
                    </Footer>
                </div>
            </Container>
        </Fragment>
    );
};

export default inject('AuditProfileAuditorStore')(observer(AuditingEditPhoto));
