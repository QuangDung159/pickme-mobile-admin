import { CustomText } from '@components/uiComponents';
import { Theme } from '@constants/index';
import { ToastHelpers } from '@helpers/index';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';

const {
    SIZES,
    COLORS
} = Theme;

export default function CashInRequest() {
    try {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    width: SIZES.WIDTH_BASE * 0.9,
                    alignItems: 'center',
                    backgroundColor: COLORS.BASE,
                    marginTop: 5,
                    alignSelf: 'center'
                }}
            >
                <CustomText text="CashInRequest" />
            </ScrollView>
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
