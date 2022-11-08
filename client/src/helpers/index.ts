export const ipfsToHTTPS = (url: string) => {
  if (!url.startsWith("ipfs://")) throw new Error("Not an IPFS url");
  const cid = url.substring(7);
  return `https://ipfs.io/ipfs/${cid}`;
};

export const minifyAddress = (address: string) => {
  const start = address.substring(0, 5);
  const end = address.substring(address.length - 5);
  return `${start}...${end}`;
};

export const convertTimeStamp = (unix_timestamp: number) => {
  var date = new Date(unix_timestamp * 1000);
  var hours = date.getHours();
  var minutes = "0" + date.getMinutes();
  var seconds = "0" + date.getSeconds();
  var formattedTime = date.toLocaleDateString() + " " + hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
  return formattedTime;
};

export const getResult = (err: string) => {
  var position = err.indexOf("(");
  err = err.substring(0, position);
  return err;
}

export const convertFunction = (unix_function: any) => {
  if (unix_function.includes("create")) return "Create";
  else if (unix_function.includes("buy")) return "Buy";
  else if (unix_function.includes("list")) return "List";
  else if (unix_function.includes("cancelListing")) return "Cancel List";
};