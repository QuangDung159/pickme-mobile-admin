import { TopTabBar } from '@components/uiComponents';
import { ToastHelpers } from '@helpers/index';
import React, { useState } from 'react';
import { SceneMap } from 'react-native-tab-view';
import ListCashInRequest from './ListCashInRequest';
import ListCashOutRequest from './ListCashOutRequest';

export default function CashHistory({ navigation, route }) {
    const [routes] = useState([
        { key: 'cashInRequest', title: 'Nạp tiền' },
        { key: 'cashOutRequest', title: 'Rút tiền' },
    ]);

    const CashInRequestRoute = () => (
        <ListCashInRequest navigation={navigation} />
    );

    const CashOutRequestRoute = () => (
        <ListCashOutRequest navigation={navigation} />
    );

    const renderScene = SceneMap({
        cashInRequest: CashInRequestRoute,
        cashOutRequest: CashOutRequestRoute,
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
