import classNames from "classnames";
import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import useSigner from "state/signer";
import { convertTimeStamp } from "../../helpers";

const HistoryTransactionPage = () => {

  const { address } = useSigner();
  const [search, setSearch] = useState("");
  const [copySuccess, setCopySuccess] = useState('');
  const [transactions, setTransactions] = useState([] as any);

  useEffect(() => {
    fetch(
      `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=7700000&endblock=99999999&sort=desc&apikey=3CZCJNKD2YE1PMHQ3TVEWNPWUDJ45ICADN`
    )
      .then((response) => response.json())
      .then((data) => setTransactions(data.result))
  }, []);

  const convertFunction = (unix_function: any) => {
    if (unix_function.includes("create")) return "Create";
    else if (unix_function.includes("buy")) return "Buy";
    else if (unix_function.includes("list")) return "List";
  };

  const handleChange = (e: any) => {
    setSearch(e.target.value);
  };

  const filteredMoedas = transactions.filter((transaction: any) =>
    transaction.functionName.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (e: any) => {
    setCopySuccess(e.target.value);
  };

  navigator.clipboard.writeText(copySuccess);

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
              <th>TxnHash</th>
              <th>From</th>
              <th>ETH</th>
              <th>To</th>
            </tr>
          </thead>
          <tbody>
            {filteredMoedas && (
              filteredMoedas.map((transaction: any, index: number) => {
                return (
                  <tr key={index} style={{ borderTop: "1px solid #d7d7d7", height: "75px", textAlign: "center" }}>
                    <td> {index + 1}</td>
                    <td> {convertFunction(transaction.functionName)}</td>
                    <td style={{ width: "120px" }}> {convertTimeStamp(transaction.timeStamp)}</td>
                    <td>
                      <button
                        type="button"
                        className="leading-tight rounded transition duration-20 ease-in-out text-address"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Click to copy"
                        onClick={copyToClipboard}
                        value={transaction.hash}
                      >
                        {transaction.hash}
                      </button>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="leading-tight rounded transition duration-20 ease-in-out text-address"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Click to copy"
                        onClick={copyToClipboard}
                        value={transaction.from}
                      >
                        {transaction.from}
                      </button>
                    </td>
                    <td> {ethers.utils.formatEther(transaction.value)} ETH</td>
                    <td>
                      <button
                        type="button"
                        className="leading-tight rounded transition duration-20 ease-in-out text-address"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Click to copy"
                        onClick={copyToClipboard}
                        value={transaction.to}
                      >
                        {transaction.to}
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
