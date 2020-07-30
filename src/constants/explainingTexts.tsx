// DEV_NOTE : We will use this constants file until moving to i18n.

import { BoldText } from "../components/texts/boldText";
import React from "react";

export const GUARDIAN_ADDRESS_DETAILS_TEXTS = [
  "Represents the Guardian in the Guardians list",
  "Used by Delegators to delegate to the Guardian",
  "Holds the Guardian's self-delegated stake",
  "Receives the Guardians rewards",
];

export const NODE_ADDRESS_DETAILS_TEXTS = [
  <>
    Should be different from the <BoldText>Guardian address</BoldText>
  </>,
  "Used by the node to sign blocks on Orbs blockchain",
  "Holds ETH for node automated transactions gas",
  "A minimal balance of 1 ETH is required upon registration",
  "Does NOT hold your Guardian ORBS tokens",
];
