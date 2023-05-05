import { Tendermint34Client, pubkeyToAddress } from "@cosmjs/tendermint-rpc";
import { toHex, toBech32, fromHex } from "@cosmjs/encoding";

const rpc = "https://osmosis-rpc.polkachu.com";

const runAll = async () => {
  console.log("connection to", rpc);

  const tendermintClient = await Tendermint34Client.connect(rpc);
  const validators2 = await tendermintClient.validatorsAll();

  const val = validators2.validators[0];

  console.log("[SSA] validators: ", val);
  console.log("[SSA] validator0 hex: ", toHex(val.address));
  console.log("[SSA] validator0: pub", toBech32("osmovaloper", fromHex(pubkeyToAddress("ed25519", val.pubkey!.data))));
  console.log("[SSA] validator0: address", toBech32("osmovaloper", val.address));
};

try {
  runAll();
} catch (e) {
  console.log(e);
}
