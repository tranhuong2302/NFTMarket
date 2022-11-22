import { useState } from "react";
import useNFTMarket from "state/nft-market";
import ErrorMessage from "../../components/ErrorMessage";
import TxList from "../../components/TxList";
import { getResult } from "helpers";

const SendTransactionPage = () => {
  const { startPayment } = useNFTMarket();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [txs, setTxs] = useState([]);
  const [address, setAddress] = useState('');
  const [eth, setEth] = useState('');

  const handleSubmit = async (e: any) => {
    setLoading(true);
    try {
      e.preventDefault();
      setError("");
      setTxs([]);
      const data = new FormData(e.target);
      await startPayment({
        setError,
        setTxs,
        ether: data.get("ether"),
        addr: data.get("addr"),
      });
      setAddress('');
      setEth('');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleChange = (e: any) => {
    if(e.target.name === 'addr') setAddress(e.target.value);
    else if(e.target.name === 'ether') setEth(e.target.value);
  }

  return (
    <form className="m-4" onSubmit={handleSubmit} style={{ width: "100%" }}>
      <div
        className="credit-card mx-auto w-full rounded-xl bg-white shadow-lg sm:w-auto lg:w-1/3 sm:h-auto lg:h-2/3 bg-gray-200"
        style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
      >
        <main className="mt-4 p-4">
          <h1 className="text-center text-xl font-semibold">
            Send ETH payment
          </h1>
          <div style={{ borderTop: "2px solid #353535", margin: "20px" }}></div>
          <div className="">
            <div className="my-3">
            <p className="text-lg">Recipient Address: </p>
              <input
                name="addr"
                type="text"
                value={address}
                onChange={handleChange}
                className="input input-bordered rounded-lg px-4 py-2 block w-full focus:outline-none focus:ring text-input"
                placeholder=""
              />
            </div>
            <div className="my-3">
            <p className="text-lg">Amount in ETH: </p>
              <input
                name="ether"
                type="text"
                value={eth}
                onChange={handleChange}
                className="input input-bordered rounded-lg px-4 py-2 block w-full focus:outline-none focus:ring text-input"
                placeholder=""
              />
            </div>
          </div>
        </main>
        <div className="px-4">
          <ErrorMessage message={getResult(error)} />
          {/* <TxList txs={txs} /> */}
        </div>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary h-12 rounded-lg text-xl font-semibold text-white bg-black px-4 py-2 submit-button w-full focus:outline-none focus:ring btn-create"
          >
            {loading && "Busy..."}
            {!loading && "Pay now"}
          </button>

        </footer>
      </div>
    </form>
  );
};

export default SendTransactionPage;
