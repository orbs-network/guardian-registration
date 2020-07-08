// import { log, TestkitDriver } from 'rewards-v2/dist/e2e/driver';

// import { log, TestkitDriver } from "rewards-v2/dist/e2e/driver";

const co = require("@orbs-network/orbs-ethereum-contracts-v2");
import { Driver as OrbsV2Driver } from "@orbs-network/orbs-ethereum-contracts-v2";
// import { Driver as OrbsV2Driver } from "@orbs-network/orbs-ethereum-contracts-v2/build/contracts/Rewards.json";
import fs from "fs";

const deployDriverScripts = async () => {
  try {
    console.log("deploying Orbs PoS V2 contracts");
    const driver = await OrbsV2Driver.new();
    console.log("After deploying Orbs PoS V2 contracts");

    const addresses = {
      validatorsRegistration: driver.validatorsRegistration.address,
    };

    console.log("Saving addresses to file");
    fs.writeFileSync(
      "./_out/addresses.json",
      JSON.stringify(addresses, null, 2)
    );
    fs.writeFileSync(
      "../src/local/addresses.json",
      JSON.stringify(addresses, null, 2)
    );

    // const driver = new TestkitDriver();

    // console.log("deploying Orbs PoS V2 contracts");
    // const addresses = await driver.new();
    //
    // console.log("preparing the scenario");
    // await driver.prepareScenario();
    //
    // fs.writeFileSync(
    //   "./_out/addresses.json",
    //   JSON.stringify(addresses, null, 2)
    // );
    // fs.writeFileSync(
    //   "../src/local/addresses.json",
    //   JSON.stringify(addresses, null, 2)
    // );
    // console.log({ addresses });
  } catch (e) {
    console.log("error");
    console.error(e);
  }
};

deployDriverScripts()
  .then(() => {
    console.log("script done");
  })
  .catch((e) => console.log("Script error"))
  .finally(() => {
    console.log("Finally");
    process.exit();
  });

export {};
