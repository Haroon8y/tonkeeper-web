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
import type { Validator } from './Validator';
import {
    ValidatorFromJSON,
    ValidatorFromJSONTyped,
    ValidatorToJSON,
} from './Validator';

/**
 * 
 * @export
 * @interface Validators
 */
export interface Validators {
    /**
     * 
     * @type {number}
     * @memberof Validators
     */
    electAt: number;
    /**
     * 
     * @type {number}
     * @memberof Validators
     */
    electClose: number;
    /**
     * 
     * @type {number}
     * @memberof Validators
     */
    minStake: number;
    /**
     * 
     * @type {number}
     * @memberof Validators
     */
    totalStake: number;
    /**
     * 
     * @type {Array<Validator>}
     * @memberof Validators
     */
    validators: Array<Validator>;
}

/**
 * Check if a given object implements the Validators interface.
 */
export function instanceOfValidators(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "electAt" in value;
    isInstance = isInstance && "electClose" in value;
    isInstance = isInstance && "minStake" in value;
    isInstance = isInstance && "totalStake" in value;
    isInstance = isInstance && "validators" in value;

    return isInstance;
}

export function ValidatorsFromJSON(json: any): Validators {
    return ValidatorsFromJSONTyped(json, false);
}

export function ValidatorsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Validators {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'electAt': json['elect_at'],
        'electClose': json['elect_close'],
        'minStake': json['min_stake'],
        'totalStake': json['total_stake'],
        'validators': ((json['validators'] as Array<any>).map(ValidatorFromJSON)),
    };
}

export function ValidatorsToJSON(value?: Validators | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'elect_at': value.electAt,
        'elect_close': value.electClose,
        'min_stake': value.minStake,
        'total_stake': value.totalStake,
        'validators': ((value.validators as Array<any>).map(ValidatorToJSON)),
    };
}

