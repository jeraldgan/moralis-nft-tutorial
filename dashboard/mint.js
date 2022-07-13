const appId = "304B71svY6bTC8doQS3bWDZXaiaaNqY1WVKhv9mb";
const serverUrl = "https://acy4vcywgg7l.usemoralis.com:2053/server";

Moralis.start({ serverUrl, appId });

let web3;

const contractOptions = {
  address: "0x9c25c77d6b6c3A5E66AA8E9D69C343F8E8A575C9",
  chain: "rinkeby",
};

async function init() {
  let currentUser = Moralis.User.current();
  if (!currentUser) {
    window.location.pathname = "/dashboard/index.html";
  }

  web3 = await Moralis.Web3.enableWeb3();
  let accounts = await web3.eth.getAccounts();

  const urlParams = new URLSearchParams(window.location.search);
  const nftId = urlParams.get("nftId");
  document.getElementById("token_id_input").value = nftId;
  mint();
}

async function mint() {
  const tokenId = parseInt(document.getElementById("token_id_input").value);
  const address = document.getElementById("address_input");
  const amount = parseInt(document.getElementById("amount_input").value);
  const contract = new web3.eth.Contract(
    contractAbi,
    "0x9c25c77d6b6c3A5E66AA8E9D69C343F8E8A575C9"
  );
  contract.methods
    .mint(address, tokenId, amount)
    .send({ from: "0x3dB716519Db5CfCaD3d591606e0E2c7D944668eE", value: 0 })
    .on("receipt", function (receipt) {
      alert("Mint done");
    });
}

document.getElementById("submit_mint").onclick = mint;

init();
