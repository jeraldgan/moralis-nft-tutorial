const appId = "304B71svY6bTC8doQS3bWDZXaiaaNqY1WVKhv9mb";
const serverUrl = "https://acy4vcywgg7l.usemoralis.com:2053/server";

Moralis.start({ serverUrl, appId });

const contractOptions = {
  address: "0x9c25c77d6b6c3A5E66AA8E9D69C343F8E8A575C9",
  chain: "rinkeby",
};

function fetchNFTMetadata(NFTs) {
  let promises = [];
  for (const nft of NFTs.result) {
    promises.push(
      fetchNFTOwners(nft).then((res) => {
        nft.owners = [];
        res.result.forEach((element) => {
          nft.owners.push(element.owner_of);
        });
        nft.metadata = JSON.parse(nft.metadata);
        return nft;
      })
    );
  }
  return Promise.all(promises);
}

function fetchNFTOwners(nft) {
  const options = { ...contractOptions, token_id: nft.token_id };
  return Moralis.Web3API.token.getNFTOwners(options);
}

function renderInventory(NFTs) {
  const parent = document.getElementById("app");
  console.log(NFTs);
  return NFTs.map((nft) => {
    const htmlString = `
    <div class="card">
      <img class="card-img-top" src="${nft.metadata.external_url}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nft.metadata.name}</h5>
        <p class="card-text">${nft.metadata.description}</p>
        <p class="card-text">Tokens in circulation: ${nft.amount}</p>
        <p class="card-text">Number of owners: ${nft.owners.length}</p>
        <a href="/dashboard/mint.html?nftId=${nft.token_id}" class="btn btn-primary">Mint</a>
      </div>
    </div>
    `;
    const col = document.createElement("div");
    col.className = "col col-md-4";
    col.innerHTML = htmlString;
    parent.appendChild(col);
  });
}

async function initialiseApp() {
  let currentUser = Moralis.User.current();
  if (!currentUser) {
    currentUser = await Moralis.Web3.authenticate();
  }
  const NFTs = await Moralis.Web3API.token.getAllTokenIds(contractOptions);
  const nftMetadata = await fetchNFTMetadata(NFTs);
  renderInventory(nftMetadata);
}

initialiseApp();
