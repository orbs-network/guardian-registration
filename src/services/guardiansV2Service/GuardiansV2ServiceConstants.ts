export const REWARDS_FREQUENCY_KEY = "REWARDS_FREQUENCY_SEC";
export const DELEGATORS_CUT_KEY = "DELEGATORS_CUT_PERCENTAGE";
export const GUARDIAN_ID_KEY = "GUARDIAN_ID";

/**
 * The value that will return for a guardian that did not change its distribution frequency.
 */
export const EMPTY_GUARDIAN_REWARDS_FREQUENCY_VALUE = 14 * 24 * 60 * 60; // 14 days

export const GUARDIAN_REWARDS_FREQUENCY_MINIMUM_VALUE_IN_HOURS = 12;

export const DELGATORS_SHARE_PERCENTAGE_PRECISION = 3;
export const DELGATORS_SHARE_MAX_PERCENTAGE_VALUE = 66.666;
export const DELGATORS_SHARE_DEFAULT_PERCENTAGE_VALUE = DELGATORS_SHARE_MAX_PERCENTAGE_VALUE;
