import classNames from "classnames";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import useSigner from "state/signer";
import { convertTimeStamp, minifyAddress, convertFunction } from "../../helpers";
import MaterialTable from "@material-table/core";
import { Typography, Alert } from "@mui/material";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
const columns = [
  {
    field: "hash",
    title: "TxnHash",
    width: "20%",
    render: (row: any) => (
      <Typography variant="body2" className="text-address rounded leading-tight transition duration-150 ease-in-out">{row.hash}</Typography>
    ),
  },
  {
    field: "functionName",
    title: "Function Name",
    width: "10%",
    render: (row: any) => (
      <Typography variant="body2">{convertFunction(row.functionName)}</Typography>
    ),
  },
  {
    field: "from",
    title: "From",
    width: "20%",
    render: (row: any) => (
      <Typography variant="body2" className="text-address rounded leading-tight transition duration-150 ease-in-out">{row.from}</Typography>
    ),
  },
  {
    field: "to",
    title: "To",
    width: "20%",
    render: (row: any) => (
      <Typography variant="body2" className="text-address rounded leading-tight transition duration-150 ease-in-out">{row.to}</Typography>
    ),
  },
  {
    field: "timeStamp",
    title: "Time",
    width: "10%",
    render: (row: any) => (
      <Typography variant="body2">{convertTimeStamp(row.timeStamp)}</Typography>
    ),
  },
  {
    field: "value",
    title: "Value (ETH)",
    width: "10%",
    render: (row: any) => (
      <Typography variant="body2">
        {ethers.utils.formatEther(row.value)} ETH
      </Typography>
    ),
  },
];

const options: any = {
  // selection: true,
  addRowPosition: 'first',
  actionsColumnIndex: -1,
  tableLayout: 'fixed',
  exportMenu: [{
    label: 'Export PDF',
    exportFunc: (cols: any, datas: any) => ExportPdf(cols, datas, 'HistoryPDF')
  }, {
    label: 'Export CSV',
    exportFunc: (cols: any, datas: any) => ExportCsv(cols, datas, 'HistoryCSV')
  }]
};

const HistoryTransactionPage = () => {
  const { address } = useSigner();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch(
      `https://api-goerli.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=7700000&endblock=99999999&sort=desc&apikey=3CZCJNKD2YE1PMHQ3TVEWNPWUDJ45ICADN`
    )
      .then((response) => response.json())
      .then((data) => setTransactions(data.result));
  }, []);

  return (
    <div
      className={classNames("flex h-full w-full flex-col")}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <MaterialTable
        title="History Transaction"
        columns={columns}
        options={options}
        data={transactions}
      />
      {/* <div style={{ display: "flex", justifyContent: "center" }}>
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
            <tr
              style={{
                borderBottom: "1px solid #d7d7d7",
                height: "80px",
              }}
            >
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
            {filteredMoedas &&
              filteredMoedas.map((transaction: any, index: number) => {
                return (
                  <tr
                    key={index}
                    style={{
                      borderTop: "1px solid #d7d7d7",
                      height: "75px",
                      textAlign: "center",
                    }}
                  >
                    <td> {index + 1}</td>
                    <td> {convertFunction(transaction.functionName)}</td>
                    <td style={{ width: "120px" }}>
                      {" "}
                      {convertTimeStamp(transaction.timeStamp)}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="text-address rounded leading-tight transition duration-150 ease-in-out"
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
                        className="duration-20 text-address rounded leading-tight transition ease-in-out"
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
                        className="duration-20 text-address rounded leading-tight transition ease-in-out"
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
              })}
            {!filteredMoedas && <p>loading</p>}
          </tbody>
        </table>
      </div> */}
    </div>
  );
};

export default HistoryTransactionPage;
