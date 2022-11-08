import MaterialTable from "@material-table/core";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const columns = [
    {
        field: "name",
        title: "Name",
        width: "22%",
        render: (row: any) => (
            <Typography variant="body2" className="flex" style={{ width: "260px" }}>
                {row.market_cap_rank}
                &nbsp;
                <img src={row.image} alt="" style={{ height: "30px", width: "30px", margin: "0 10px" }} />
                &nbsp;
                <h2 style={{ fontWeight: "600" }}>
                    {row.name}
                </h2>
            </Typography>
        ),
    },
    {
        field: "symbol",
        title: "Symbol",
        width: "10%",
        render: (row: any) => (
            <Typography variant="body2" className="uppercase">{row.symbol}</Typography>
        ),
    },
    {
        field: "current_price",
        title: "price (USD)",
        width: "20%",
        render: (row: any) => (
            <Typography variant="body2">${row.current_price}</Typography>
        ),
    },
    {
        field: "total_volume",
        title: "volume (USD)",
        width: "20%",
        render: (row: any) => (
            <Typography variant="body2">${row.total_volume.toLocaleString()}</Typography>
        ),
    },
    {
        field: "price_change_percentage_24h",
        title: "24h",
        width: "10%",
        render: (row: any) => (
            <Typography variant="body2">
                {row.price_change_percentage_24h > 0 ? (
                    <div style={{ color: "#00d395" }}>
                        {row.price_change_percentage_24h.toFixed(2)}%
                    </div>
                ) : (
                    <div style={{ color: "#f00606" }}>
                        {row.price_change_percentage_24h.toFixed(2)}%
                    </div>
                )}
            </Typography>
        ),
    },
    {
        field: "value",
        title: "Market Cap",
        width: "10%",
        render: (row: any) => (
            <Typography variant="body2">${row.market_cap.toLocaleString()}</Typography>
        ),
    },
];

const options: any = {
    addRowPosition: 'first',
    actionsColumnIndex: -1,
    tableLayout: 'fixed',
};

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
            <MaterialTable
                title="Cryptocurrency Rates"
                columns={columns}
                options={options}
                data={moedas}
            />
            {/* <h1 className="moeda-text">Crypto</h1>
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
            </div> */}
        </div>
    );
};


export default CryptoRate;