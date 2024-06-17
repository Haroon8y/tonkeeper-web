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

import { mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface GaslessSendRequest
 */
export interface GaslessSendRequest {
    /**
     * hex encoded public key
     * @type {string}
     * @memberof GaslessSendRequest
     */
    walletPublicKey: string;
    /**
     * 
     * @type {string}
     * @memberof GaslessSendRequest
     */
    boc: string;
}

/**
 * Check if a given object implements the GaslessSendRequest interface.
 */
export function instanceOfGaslessSendRequest(value: object): value is GaslessSendRequest {
    if (!('walletPublicKey' in value) || value['walletPublicKey'] === undefined) return false;
    if (!('boc' in value) || value['boc'] === undefined) return false;
    return true;
}

export function GaslessSendRequestFromJSON(json: any): GaslessSendRequest {
    return GaslessSendRequestFromJSONTyped(json, false);
}

export function GaslessSendRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): GaslessSendRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'walletPublicKey': json['wallet_public_key'],
        'boc': json['boc'],
    };
}

export function GaslessSendRequestToJSON(value?: GaslessSendRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'wallet_public_key': value['walletPublicKey'],
        'boc': value['boc'],
    };
}

