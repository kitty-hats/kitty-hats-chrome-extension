import * as _ from 'lodash';

export const isNull = (v: any) => v === undefined || v === null;

export const isNonNull = (v: any) => !isNull(v);

export const isInIframe = () => window && window.self !== window.top;
