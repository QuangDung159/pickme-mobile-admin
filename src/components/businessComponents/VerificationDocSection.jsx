/* eslint-disable max-len */
import {
    CustomButton, CustomText
} from '@components/uiComponents';
import DocumentType from '@constants/DocumentType';
import Theme from '@constants/Theme';
import VerificationStatus from '@constants/VerificationStatus';
import MediaHelpers from '@helpers/MediaHelpers';
import ToastHelpers from '@helpers/ToastHelpers';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ImageScalable from 'react-native-scalable-image';
import { useSelector } from 'react-redux';

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

    const currentUser = useSelector((state) => state.userReducer.currentUser);

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

    const onPickVerificationDoc = (docType) => {
        MediaHelpers.pickImage(
            false,
            [4, 3],
            (result) => {
                handleOnPickVerificationDoc(result.uri, docType);
            },
            0.6
        );
    };

    const handleOnPickVerificationDoc = (uri, docType) => {
        switch (docType) {
            case DocumentType.FACE_IMAGE: {
                setFaceUrl(uri);
                break;
            }
            case DocumentType.ID_CARD_FRONT: {
                setFrontUrl(uri);
                break;
            }
            case DocumentType.ID_CARD_BACK: {
                setBackUrl(uri);
                break;
            }
            case DocumentType.GREEN_CARD: {
                setGreenUrl(uri);
                break;
            }
            default: {
                break;
            }
        }
    };

    const renderUploadDocForm = (docType, buttonText) => {
        let isDisabled = false;
        if (currentUser?.verifyStatus !== VerificationStatus.NONE
            && currentUser?.verifyStatus !== VerificationStatus.REJECT) {
            isDisabled = true;
        }
        return (
            <View style={{
                alignItems: 'center',
            }}
            >
                <CustomButton
                    onPress={() => onPickVerificationDoc(docType)}
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
                    disabled={isDisabled}
                />
            </View>
        );
    };

    const renderDocSection = () => (
        <View
            style={{
                marginVertical: 10
            }}
        >
            {renderUploadDocForm(DocumentType.FACE_IMAGE, 'Ảnh chụp chính diện')}
            {renderDocImage(faceUrl)}
            <View
                style={styles.docFormContainer}
            >
                {renderUploadDocForm(DocumentType.ID_CARD_FRONT, 'Ảnh chụp nhìn sang phải')}
                {renderDocImage(frontUrl)}
            </View>
            <View
                style={styles.docFormContainer}
            >
                {renderUploadDocForm(DocumentType.ID_CARD_BACK, 'Ảnh chụp mặt trước giấy phép lái xe')}
                {renderDocImage(backUrl)}
            </View>
            <View
                style={styles.docFormContainer}
            >
                {renderUploadDocForm(DocumentType.GREEN_CARD, 'Thẻ xanh COVID')}
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
