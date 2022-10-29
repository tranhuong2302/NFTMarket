import classNames from "classnames";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useSigner from "state/signer";

const HistoryTransactionPage = () => {
  const convertTimeStamp = (unix_timestamp: number) => {
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2) + " " + date.toLocaleDateString();
    return formattedTime;
  };
  const { address } = useSigner();
  const [transactions, setTransactions] = useState([] as any);
  useEffect(() => {
    fetch(
      `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=7700000&endblock=99999999&sort=desc&apikey=3CZCJNKD2YE1PMHQ3TVEWNPWUDJ45ICADN`
    )
      .then((response) => response.json())
      .then((data) => setTransactions(data.result))
  }, [transactions]);
  console.log(address);
  console.log(transactions);
  return (
    <div className={classNames("flex h-full w-full flex-col")}>
      <table>
        <thead>
          <tr style={{
            borderBottom: "1px solid #d7d7d7",
            height: "80px",
          }}>
            <th>TxnHash</th>
            <th>Age</th>
            <th>From</th>
            <th>To</th>
            <th>Token ID</th>
            <th>Token</th>
          </tr>
        </thead>
        <tbody>
          {transactions && (
            transactions.map((transaction: any) => {
              return (
                <tr style={{ borderTop: "1px solid #d7d7d7", height: "40px" }}>
                  <td> {transaction.hash}</td>
                  <td> {transaction.from}</td>
                  <td> {transaction.to}</td>
                  <td> {ethers.utils.formatEther(transaction.value)} ETH</td>
                  <td>Time: {convertTimeStamp(transaction.timeStamp)}</td>
                </tr>
              );
            }))}
          {!transactions && (
            <p>loading</p>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default HistoryTransactionPage;
