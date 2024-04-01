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
import type { BlockParamLimits } from './BlockParamLimits';
import {
    BlockParamLimitsFromJSON,
    BlockParamLimitsFromJSONTyped,
    BlockParamLimitsToJSON,
} from './BlockParamLimits';

/**
 * 
 * @export
 * @interface BlockLimits
 */
export interface BlockLimits {
    /**
     * 
     * @type {BlockParamLimits}
     * @memberof BlockLimits
     */
    bytes: BlockParamLimits;
    /**
     * 
     * @type {BlockParamLimits}
     * @memberof BlockLimits
     */
    gas: BlockParamLimits;
    /**
     * 
     * @type {BlockParamLimits}
     * @memberof BlockLimits
     */
    ltDelta: BlockParamLimits;
}

/**
 * Check if a given object implements the BlockLimits interface.
 */
export function instanceOfBlockLimits(value: object): boolean {
    if (!('bytes' in value)) return false;
    if (!('gas' in value)) return false;
    if (!('ltDelta' in value)) return false;
    return true;
}

export function BlockLimitsFromJSON(json: any): BlockLimits {
    return BlockLimitsFromJSONTyped(json, false);
}

export function BlockLimitsFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlockLimits {
    if (json == null) {
        return json;
    }
    return {
        
        'bytes': BlockParamLimitsFromJSON(json['bytes']),
        'gas': BlockParamLimitsFromJSON(json['gas']),
        'ltDelta': BlockParamLimitsFromJSON(json['lt_delta']),
    };
}

export function BlockLimitsToJSON(value?: BlockLimits | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'bytes': BlockParamLimitsToJSON(value['bytes']),
        'gas': BlockParamLimitsToJSON(value['gas']),
        'lt_delta': BlockParamLimitsToJSON(value['ltDelta']),
    };
}
