const appId = "304B71svY6bTC8doQS3bWDZXaiaaNqY1WVKhv9mb";
const serverUrl = "https://acy4vcywgg7l.usemoralis.com:2053/server";

Moralis.start({ serverUrl, appId });

async function initialiseApp() {
  let currentUser = Moralis.User.current();
  if (!currentUser) {
    currentUser = await Moralis.Web3.authenticate();
  }
  alert("user is signed in");
}

initialiseApp();
