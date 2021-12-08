import { Rx } from '@constants/index';
import { CommonHelpers } from '@helpers/index';
import Middlewares from '@middlewares/index';
import { RxUtil } from '@utils/index';

const rxFetchCashHistoryAsync = async (domain = null) => {
    const result = await RxUtil(
        Rx.CASH.GET_CASH_HISTORY,
        'GET',
        null, domain
    );
    return result;
};

const fetchCashHistoryAsync = async () => {
    let result = await rxFetchCashHistoryAsync();

    const handledResult = await Middlewares.handleResponseStatusMiddleware(result);
    if (handledResult) {
        result = await rxFetchCashHistoryAsync(handledResult.backupDomain);
    }

    return CommonHelpers.handleResByStatus(result);
};

const rxSubmitCashOutRequestAsync = async (body, domain = null) => {
    const result = await RxUtil(
        Rx.CASH.CREATE_CASH_OUT_REQUEST,
        'POST',
        body,
        domain
    );
    return result;
};

const submitCashOutRequestAsync = async (body) => {
    let result = await rxSubmitCashOutRequestAsync(body);
    const handledResult = await Middlewares.handleResponseStatusMiddleware(result);
    if (handledResult) {
        result = await rxSubmitCashOutRequestAsync(body, handledResult.backupDomain);
    }
    return CommonHelpers.handleResByStatus(result);
};

const rxFetchCashOutRequestAsync = async (domain = null) => {
    const result = await RxUtil(
        Rx.CASH.GET_CASH_OUT_REQUEST,
        'GET',
        null,
        domain
    );
    return result;
};

const fetchCashOutRequestAsync = async (body) => {
    let result = await rxFetchCashOutRequestAsync(body);
    const handledResult = await Middlewares.handleResponseStatusMiddleware(result);
    if (handledResult) {
        result = await rxFetchCashOutRequestAsync(handledResult.backupDomain);
    }
    return CommonHelpers.handleResByStatus(result);
};

const rxFetchCashInRequestAsync = async (domain = null) => {
    const result = await RxUtil(
        Rx.CASH.GET_CASH_IN_REQUEST,
        'GET',
        null,
        domain
    );
    return result;
};

const fetchCashInRequestAsync = async (body) => {
    let result = await rxFetchCashInRequestAsync(body);
    const handledResult = await Middlewares.handleResponseStatusMiddleware(result);
    if (handledResult) {
        result = await rxFetchCashInRequestAsync(handledResult.backupDomain);
    }
    return CommonHelpers.handleResByStatus(result);
};

export default {
    fetchCashHistoryAsync,
    submitCashOutRequestAsync,
    fetchCashOutRequestAsync,
    fetchCashInRequestAsync
};
