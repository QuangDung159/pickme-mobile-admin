import { TopTabBar } from '@components/uiComponents';
import { ToastHelpers } from '@helpers/index';
import UserServices from '@services/UserServices';
import React, { useEffect, useState } from 'react';
import { SceneMap } from 'react-native-tab-view';
import ListVerificationForApplyCustomer from './ListVerificationForApplyCustomer';
import ListVerificationForApplyPartner from './ListVerificationForApplyPartner';

export default function VerificationRequest({ navigation, route }) {
    const [routes] = useState([
        { key: 'listVerificationForApplyCustomer', title: 'Cho Customer' },
        { key: 'listVerificationForApplyPartner', title: 'Cho Host' },
    ]);
    const [listVerificationForPartner, setListVerificationForPartner] = useState();
    const [listVerificationForCustomer, setListVerificationForCustomer] = useState();
    const [isShowSpinner, setIsShowSpinner] = useState(false);

    useEffect(
        () => {
            const onFocus = navigation.addListener('focus', () => {
                setIsShowSpinner(true);
                getListWaitingVerificationRequestForPartner();
                getListWaitingVerificationRequestForCustomer();
            });

            return onFocus;
        }, []
    );

    const getListWaitingVerificationRequestForPartner = async () => {
        const res = await UserServices.fetchListVerificationRequestAsync({
            isApplyForPartner: true,
        });
        const { data } = res;

        if (data) {
            setListVerificationForPartner(data.data);
        }
    };

    const getListWaitingVerificationRequestForCustomer = async () => {
        const res = await UserServices.fetchListVerificationRequestAsync({
            isApplyForPartner: false,
        });
        const { data } = res;

        if (data) {
            setListVerificationForCustomer(data.data);
            setIsShowSpinner(false);
        }
    };

    const listVerificationForApplyPartnerRoute = () => (
        <ListVerificationForApplyPartner
            navigation={navigation}
            listVerificationForPartner={listVerificationForPartner}
            isShowSpinner={isShowSpinner}
        />
    );

    const listVerificationForApplyCustomerRoute = () => (
        <ListVerificationForApplyCustomer
            navigation={navigation}
            listVerificationForCustomer={listVerificationForCustomer}
            isShowSpinner={isShowSpinner}
        />
    );

    const renderScene = SceneMap({
        listVerificationForApplyCustomer: listVerificationForApplyCustomerRoute,
        listVerificationForApplyPartner: listVerificationForApplyPartnerRoute,
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
