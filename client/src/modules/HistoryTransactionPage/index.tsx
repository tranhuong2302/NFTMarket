import classNames from "classnames";
import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import useSigner from "state/signer";
import { minifyAddress } from "../../helpers";

const HistoryTransactionPage = () => {
  const convertTimeStamp = (unix_timestamp: number) => {
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var formattedTime = date.toLocaleDateString() + " " + hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);
    return formattedTime;
  };
  const { address } = useSigner();
  const [search, setSearch] = useState("");
  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);
  let minDate = new Date;
  let maxDate = new Date;
  const [transactions, setTransactions] = useState([] as any);
  useEffect(() => {
    fetch(
      `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=7700000&endblock=99999999&sort=desc&apikey=3CZCJNKD2YE1PMHQ3TVEWNPWUDJ45ICADN`
    )
      .then((response) => response.json())
      .then((data) => setTransactions(data.result))
  }, []);
  // console.log(dateFilter);
  const convertFunction = (unix_function: any) => {
    if (unix_function.includes("create")) return "Create";
    else if (unix_function.includes("buy")) return "Buy";
    else if (unix_function.includes("list")) return "List";
  }
  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };
  const filteredMoedas = transactions.filter((transaction: any) =>
    transaction.functionName.toLowerCase().includes(search.toLowerCase())
  );
  const copyToClipboard = (e: any) => {
    var copyText = document.getElementById("myInput") as HTMLInputElement;
    copyText.select();
    document.execCommand("copy");
  };
  return (
    <div className={classNames("flex h-full w-full flex-col")} style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1 className="his-transaction-text">Function: </h1>
        <form>
          <input
            className="his-transaction-input"
            type="text"
            onChange={handleChange}
            placeholder="Search for a Cryptocurrency"
          />
        </form>

      </div>
      <div className={classNames("flex h-full w-full flex-col")}>
        <table>
          <thead>
            <tr style={{
              borderBottom: "1px solid #d7d7d7",
              height: "80px",
            }}>
              <th>Number</th>
              <th>Function</th>
              <th>Time</th>
              {/* <th>TxnHash</th> */}
              <th>From</th>
              <th>ETH</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {filteredMoedas && (
              filteredMoedas.map((transaction: any, index: number) => {
                return (
                  <tr key={index} style={{ borderTop: "1px solid #d7d7d7", height: "40px", textAlign: "center" }}>
                    <td> {index + 1}</td>
                    <td> {convertFunction(transaction.functionName)}</td>
                    <td style={{ width: "100px" }}> {convertTimeStamp(transaction.timeStamp)}</td>
                    <td>
                      <button type="button" className="leading-tight rounded transition duration-20 ease-in-out" data-bs-toggle="tooltip" data-bs-placement="bottom" title={transaction.from}>
                        {minifyAddress(transaction.from)}
                      </button>
                    </td>
                    <td> {ethers.utils.formatEther(transaction.value)} ETH</td>
                    <td>
                      <button
                        type="button"
                        className="leading-tight rounded transition duration-20 ease-in-out"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title={transaction.to}
                        onClick={copyToClipboard}
                        ref={textAreaRef}
                      >
                        {minifyAddress(transaction.to)}
                      </button>
                    </td>
                  </tr>
                );
              }))}
            {!filteredMoedas && (
              <p>loading</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default HistoryTransactionPage;
