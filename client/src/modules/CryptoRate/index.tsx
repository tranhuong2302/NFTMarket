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
    useEffect(() => {
        fetch(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        )
            .then((response) => response.json())
            .then((data) => setMoedas(data))
    }, []);
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
        </div>
    );
};


export default CryptoRate;