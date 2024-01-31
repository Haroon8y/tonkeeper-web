/* tslint:disable */
/* eslint-disable */
/**
 * REST api to TON blockchain explorer
 * Provide access to indexed TON blockchain
 *
 * The version of the OpenAPI document: 2.0.0
 * Contact: support@tonkeeper.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { EmulateMessageToWalletRequestParamsInner } from './EmulateMessageToWalletRequestParamsInner';
import {
    EmulateMessageToWalletRequestParamsInnerFromJSON,
    EmulateMessageToWalletRequestParamsInnerFromJSONTyped,
    EmulateMessageToWalletRequestParamsInnerToJSON,
} from './EmulateMessageToWalletRequestParamsInner';

/**
 * 
 * @export
 * @interface EmulateMessageToWalletRequest
 */
export interface EmulateMessageToWalletRequest {
    /**
     * 
     * @type {string}
     * @memberof EmulateMessageToWalletRequest
     */
    boc: string;
    /**
     * additional per account configuration
     * @type {Array<EmulateMessageToWalletRequestParamsInner>}
     * @memberof EmulateMessageToWalletRequest
     */
    params?: Array<EmulateMessageToWalletRequestParamsInner>;
}

/**
 * Check if a given object implements the EmulateMessageToWalletRequest interface.
 */
export function instanceOfEmulateMessageToWalletRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "boc" in value;

    return isInstance;
}

export function EmulateMessageToWalletRequestFromJSON(json: any): EmulateMessageToWalletRequest {
    return EmulateMessageToWalletRequestFromJSONTyped(json, false);
}

export function EmulateMessageToWalletRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): EmulateMessageToWalletRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'boc': json['boc'],
        'params': !exists(json, 'params') ? undefined : ((json['params'] as Array<any>).map(EmulateMessageToWalletRequestParamsInnerFromJSON)),
    };
}

export function EmulateMessageToWalletRequestToJSON(value?: EmulateMessageToWalletRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'boc': value.boc,
        'params': value.params === undefined ? undefined : ((value.params as Array<any>).map(EmulateMessageToWalletRequestParamsInnerToJSON)),
    };
}

