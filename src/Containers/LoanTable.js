/** @format */

import * as React from "react"
import { DataGrid } from "@mui/x-data-grid"

const columns = [
	{ field: "amount", headerName: "Loan Amount", width: 150 },
	{
		field: "name",
		headerName: "Name",
		width: 200,
	},
	{
		field: "address",
		headerName: "Address",
		width: 350,
	},
	{
		field: "number",
		headerName: "Contact Number",
		width: 150,
	},
	{
		field: "email",
		headerName: "Email address",
		width: 250,
	},
	{
		field: "startDate",
		headerName: "Start Date",
		width: 200,
	},
	{
		field: "endDate",
		headerName: "Expiry Date",
		width: 200,
	},
	{
		field: "emi",
		headerName: "EMI",
		width: 150,
	},
	{
		field: "exchangeRate",
		headerName: "Exchange Rate",
		width: 150,
	},
]

export const LoanTable = ({ loans }) => {
	const loansWithIds = loans.map((loan) => {
		return {
			id: loan._id,
			...loan,
		}
	})

	return (
		<div style={{ height: 400, width: "100%" }}>
			<DataGrid
				rows={loansWithIds}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				disableSelectionOnClick
			/>
		</div>
	)
}
