import React, { useEffect, useState } from "react";

const CryptoRate = () => {
    const [moedas, setMoedas] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
            fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
              )
                .then((response) => response.json())
                .then((data) => setMoedas(data))
    }, []);

    const handleChange = (e: any) => {
        setSearch(e.target.value);
    };
    const filteredMoedas = moedas.filter((moeda: any) =>
        moeda.name.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            width: "100vw",
        }}>
            <h1 className="moeda-text">Crypto</h1>
            <form>
                <input
                    className="moeda-input"
                    type="text"
                    onChange={handleChange}
                    placeholder="Search for a Cryptocurrency"
                />
            </form>
            <div className="flex h-full w-full flex-col">
                <table>
                    <thead>
                        <tr style={{
                            borderBottom: "1px solid #d7d7d7",
                            height: "80px",
                        }}>
                            <th># Name</th>
                            <th>SYMBOL</th>
                            <th>price(USD)</th>
                            <th>volume(USD)</th>
                            <th>24h</th>
                            <th>Market Cap</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredMoedas && (
                            filteredMoedas.map((moeda: any) => {
                                return (
                                    <tr style={{ borderTop: "1px solid #d7d7d7", height: "80px" }}>
                                        <td>
                                            <div style={{ display: "flex" }}>
                                                {moeda.market_cap_rank}
                                                &nbsp;
                                                <img src={moeda.image} alt="" style={{ height: "30px", width: "30px", margin: "0 10px" }} />
                                                &nbsp;
                                                <h2 style={{ fontWeight: "600" }}>
                                                    {moeda.name}
                                                </h2>
                                            </div>
                                        </td>
                                        <td style={{ textTransform: "uppercase" }}>{moeda.symbol}</td>
                                        <td>${moeda.current_price}</td>
                                        <td>${moeda.total_volume.toLocaleString()}</td>
                                        {moeda.price_change_percentage_24h > 0 ? (
                                            <td style={{ color: "#00d395" }}>
                                                {moeda.price_change_percentage_24h.toFixed(2)}%
                                            </td>
                                        ) : (
                                            <td style={{ color: "#f00606" }}>
                                                {moeda.price_change_percentage_24h.toFixed(2)}%
                                            </td>
                                        )}
                                        <td>Mkt Cap: ${moeda.market_cap.toLocaleString()}</td>
                                    </tr>
                                );
                            }))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};


export default CryptoRate;