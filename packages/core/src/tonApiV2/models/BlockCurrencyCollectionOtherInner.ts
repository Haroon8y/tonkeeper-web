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
/**
 * 
 * @export
 * @interface BlockCurrencyCollectionOtherInner
 */
export interface BlockCurrencyCollectionOtherInner {
    /**
     * 
     * @type {number}
     * @memberof BlockCurrencyCollectionOtherInner
     */
    id: number;
    /**
     * 
     * @type {string}
     * @memberof BlockCurrencyCollectionOtherInner
     */
    value: string;
}

/**
 * Check if a given object implements the BlockCurrencyCollectionOtherInner interface.
 */
export function instanceOfBlockCurrencyCollectionOtherInner(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "value" in value;

    return isInstance;
}

export function BlockCurrencyCollectionOtherInnerFromJSON(json: any): BlockCurrencyCollectionOtherInner {
    return BlockCurrencyCollectionOtherInnerFromJSONTyped(json, false);
}

export function BlockCurrencyCollectionOtherInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlockCurrencyCollectionOtherInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'value': json['value'],
    };
}

export function BlockCurrencyCollectionOtherInnerToJSON(value?: BlockCurrencyCollectionOtherInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'value': value.value,
    };
}

