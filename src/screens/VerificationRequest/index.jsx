import { TopTabBar } from '@components/uiComponents';
import { ToastHelpers } from '@helpers/index';
import React, { useState } from 'react';
import { SceneMap } from 'react-native-tab-view';
import ListVerificationForApplyCustomer from './ListVerificationForApplyCustomer';
import ListVerificationForApplyPartner from './ListVerificationForApplyPartner';

export default function VerificationRequest({ navigation, route }) {
    const [routes] = useState([
        { key: 'listVerificationForApplyCustomer', title: 'Cho Customer' },
        { key: 'listVerificationForApplyPartner', title: 'Cho Host' },
    ]);

    const listVerificationForApplyPartnerRoute = () => (
        <ListVerificationForApplyPartner navigation={navigation} />
    );

    const listVerificationForApplyCustomerRoute = () => (
        <ListVerificationForApplyCustomer navigation={navigation} />
    );

    const renderScene = SceneMap({
        listVerificationForApplyCustomer: listVerificationForApplyPartnerRoute,
        listVerificationForApplyPartner: listVerificationForApplyCustomerRoute,
    });

    try {
        return (
            <TopTabBar
                routes={routes}
                renderScene={renderScene}
                tabActiveIndex={route?.params?.tabActive || 0}
            />
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
