/* eslint-disable max-len */
import {
    CustomButton, CustomText
} from '@components/uiComponents';
import DocumentType from '@constants/DocumentType';
import Theme from '@constants/Theme';
import ToastHelpers from '@helpers/ToastHelpers';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ImageScalable from 'react-native-scalable-image';

const {
    FONT: {
        TEXT_REGULAR,
    },
    SIZES,
    COLORS
} = Theme;

export default function UploadDocSection({ verificationDocuments }) {
    const [faceUrl, setFaceUrl] = useState('');
    const [frontUrl, setFrontUrl] = useState('');
    const [backUrl, setBackUrl] = useState('');
    const [greenUrl, setGreenUrl] = useState('');

    useEffect(
        () => {
            fillImage();
        }, []
    );

    const fillImage = () => {
        if (!verificationDocuments || !verificationDocuments.length === 0) return false;

        verificationDocuments.forEach((docItem) => {
            const docImage = docItem.url;
            switch (docItem.type) {
                case DocumentType.FACE_IMAGE: {
                    setFaceUrl(docImage);
                    break;
                }
                case DocumentType.ID_CARD_FRONT: {
                    setFrontUrl(docImage);
                    break;
                }
                case DocumentType.ID_CARD_BACK: {
                    setBackUrl(docImage);
                    break;
                }
                case DocumentType.GREEN_CARD: {
                    setGreenUrl(docImage);
                    break;
                }
                default: {
                    break;
                }
            }
        });
        return true;
    };

    const renderDocTitle = (docType, buttonText) => (
        <View style={{
            alignItems: 'center',
        }}
        >
            <CustomButton
                type="active"
                label={buttonText}
                buttonStyle={{
                    width: SIZES.WIDTH_BASE * 0.9,
                    marginBottom: 10
                }}
                labelStyle={{
                    fontFamily: TEXT_REGULAR,
                    fontSize: SIZES.FONT_H4
                }}
                disabled
            />
        </View>
    );

    const renderDocSection = () => (
        <View
            style={{
                marginVertical: 10
            }}
        >
            {renderDocTitle(DocumentType.FACE_IMAGE, 'Ảnh chụp chính diện')}
            {renderDocImage(faceUrl)}
            <View
                style={styles.docFormContainer}
            >
                {renderDocTitle(DocumentType.ID_CARD_FRONT, 'Ảnh chụp nhìn sang phải')}
                {renderDocImage(frontUrl)}
            </View>
            <View
                style={styles.docFormContainer}
            >
                {renderDocTitle(DocumentType.ID_CARD_BACK, 'Ảnh chụp mặt trước giấy phép lái xe')}
                {renderDocImage(backUrl)}
            </View>
            <View
                style={styles.docFormContainer}
            >
                {renderDocTitle(DocumentType.GREEN_CARD, 'Thẻ xanh COVID')}
                {renderDocImage(greenUrl)}
            </View>
        </View>
    );

    const renderDocImage = (imageUrl) => {
        if (imageUrl === '') {
            return (
                <View
                    style={{
                        alignItems: 'center',
                        marginVertical: 15
                    }}
                >
                    <CustomText text="Chưa có ảnh" />
                </View>
            );
        }

        return (
            <View
                style={{
                    alignSelf: 'center'
                }}
            >
                <ImageScalable
                    style={{
                        zIndex: 99
                    }}
                    width={SIZES.WIDTH_BASE * 0.9}
                    source={{ uri: imageUrl }}
                />
            </View>
        );
    };

    try {
        return (
            <View
                style={{
                    marginTop: 10
                }}
            >
                <View
                    style={{
                        marginTop: 10,
                        backgroundColor: COLORS.BASE,
                    }}
                >
                    {renderDocSection()}
                </View>
            </View>
        );
    } catch (exception) {
        console.log('exception :>> ', exception);
        return (
            <>
                {ToastHelpers.renderToast()}
            </>
        );
    }
}

const styles = StyleSheet.create({
    docFormContainer: {
        marginTop: 30
    }
});
