import { useState } from "react";
import useNFTMarket from "state/nft-market";
import ErrorMessage from "../../components/ErrorMessage";
import TxList from "../../components/TxList";

const SendTransactionPage = () => {
  const { startPayment } = useNFTMarket();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [txs, setTxs] = useState([]);

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
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form className="m-4" onSubmit={handleSubmit}>
      <div className="credit-card mx-auto w-full rounded-xl bg-white shadow-lg sm:w-auto lg:w-1/2">
        <main className="mt-4 p-4">
          <h1 className="text-center text-xl font-semibold text-gray-700">
            Send ETH payment
          </h1>
          <div className="">
            <div className="my-3">
              <input
                type="text"
                name="addr"
                className="input input-bordered block w-full focus:outline-none focus:ring"
                placeholder="Recipient Address"
              />
            </div>
            <div className="my-3">
              <input
                name="ether"
                type="text"
                className="input input-bordered block w-full focus:outline-none focus:ring"
                placeholder="Amount in ETH"
              />
            </div>
          </div>
        </main>
        <footer className="p-4">
          <button
            type="submit"
            className="btn btn-primary submit-button w-full focus:outline-none focus:ring"
          >
            {loading && "Busy..."}
            {!loading && "Pay now"}
          </button>
          <ErrorMessage message={error} />
          <TxList txs={txs} />
        </footer>
      </div>
    </form>
  );
};

export default SendTransactionPage;
