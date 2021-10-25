/** @format */

import React, { useState, useEffect } from "react"
import { MuiAppBar } from "./Containers/MuiAppBar"
import { LoanTable } from "./Containers/LoanTable"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import { get, post } from "./Config/axiosClient"
import TextField from "@mui/material/TextField"
import { Notification } from "./Components/Notification"
import { getDateObjToInput, getDateFromString } from "./Config/supports"

function App() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [id, setId] = useState("")
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	const [notification, setNotification] = useState(false)
	const [notificationType, setNotificationType] = useState("")
	const [notificationMessage, setNotificationMessage] = useState("")

	const closeNotification = () => setNotification(false)
	const newNotification = (severity, message) => {
		setNotification(true)
		setNotificationType(severity)
		setNotificationMessage(message)
	}

	const [modalOpen, setModalOpen] = useState(false)
	const handleModalOpen = () => setModalOpen(true)
	const handleModalClose = () => {
		setModalOpen(false)
		setAddress("")
		setNumber("")
		setAmount("")
		setStartDate(new Date())
		setEndDate(new Date())
		setEmi("")
		setExchangeRate("")
	}

	const [loans, setLoans] = useState([])

	// Date pickers
	const [startDate, setStartDate] = useState(new Date())
	const [endDate, setEndDate] = useState(new Date())

	const handleStartDate = (newValue) => {
		const newDate = getDateFromString(newValue)
		setStartDate(newDate)
	}
	const handleEndDate = (newValue) => {
		const newDate = getDateFromString(newValue)
		setEndDate(newDate)
	}

	const [exchangeRate, setExchangeRate] = useState("")

	const setNameAndMail = (response) => {
		setName(response.profileObj.name)
		setEmail(response.profileObj.email)
		setId(response.profileObj.googleId)
		setIsLoggedIn(true)
	}

	const [address, setAddress] = useState("")
	const [number, setNumber] = useState("")
	const [amount, setAmount] = useState("")
	const [emi, setEmi] = useState("")

	const fetchLoans = async () => {
		try {
			const response = await get(`loans/${id}`)
			if (response.status === 200) {
				setLoans(response.data)
			}
		} catch (e) {
			// newNotification("error", e.message())
		}
	}

	const getAllUserLoans = async () => {
		try {
			const response = await get(`loans/${id}`)
			if (response.status === 200) {
				fetchLoans()
			}
		} catch (e) {
			// newNotification("error", e.toString())
		}
	}

	const getUserDetails = async () => {
		try {
			const response = await post("users", {
				userId: id,
				username: name,
				email,
			})
			if (response.status === 200) {
				getAllUserLoans()
			}
		} catch (e) {
			// newNotification("error", e.toString())
		}
	}

	const handleAddLoan = async () => {
		try {
			const loanData = {
				name,
				address,
				number,
				amount,
				startDate: new Date(),
				endDate: new Date(),
				emi,
				exchangeRate,
			}
			// if (!loanData.address) throw new Error("Check address and try again")
			// if (!loanData.number) throw new Error("Check Number and try again")
			// if (!loanData.amount) throw new Error("Check amount and try again")
			// if (!loanData.emi) throw new Error("Check EMI and try again")
			// if (!loanData.exchangeRate)
			// 	throw new Error("Check Exchange Rate and try again")

			const response = await post(`loans/${id}`, loanData)
			if (response.status === 200) {
				handleModalClose()
				getAllUserLoans()
				setAddress("")
				setNumber("")
				setAmount("")
				newNotification("success", "A new loan added successfully")
				setStartDate(new Date())
				setEndDate(new Date())
				setEmi("")
				setExchangeRate("")
			}
		} catch (e) {
			console.log(e.response.data, "Look here ")
			newNotification("error", e.response.data)
		}
	}

	useEffect(() => {
		if (isLoggedIn) {
			getUserDetails()
		}
	}, [isLoggedIn])

	return (
		<div className='App'>
			<MuiAppBar
				newNotification={newNotification}
				isLoggedIn={isLoggedIn}
				setIsLoggedIn={setIsLoggedIn}
				updateDetails={setNameAndMail}
			/>
			<Notification
				notification={notification}
				severity={notificationType}
				message={notificationMessage}
				closeNotification={closeNotification}
			/>
			<div>
				<Dialog
					open={modalOpen}
					onClose={handleModalClose}
					aria-labelledby='alert-dialog-title'
					aria-describedby='alert-dialog-description'>
					<DialogTitle style={{ textAlign: "center" }} id='alert-dialog-title'>
						{"ADD LOAN"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id='alert-dialog-description'>
							<div style={{ textAlign: "center" }}>
								<span>
									(Contact Number format (123) 456-7890 or 123-456-7890)
								</span>
								<TextField
									style={{ margin: "2rem" }}
									value={number}
									onChange={(e) => setNumber(e.target.value)}
									id='outlined-basic'
									label='Contact Number'
									variant='outlined'
								/>
								<TextField
									style={{ margin: "2rem" }}
									value={amount}
									onChange={(e) => setAmount(e.target.value)}
									id='outlined-basic'
									label='Amount'
									variant='outlined'
								/>
								<TextField
									style={{ margin: "2rem" }}
									value={emi}
									onChange={(e) => setEmi(e.target.value)}
									id='outlined-basic'
									label='EMI'
									variant='outlined'
								/>
								<br />
								<TextField
									style={{ width: "100%", margin: "2rem 0" }}
									value={address}
									onChange={(e) => setAddress(e.target.value)}
									id='outlined-basic'
									label='Address'
									multiline
									rows={3}
									variant='outlined'
								/>
							</div>
							<div style={{ textAlign: "center" }}>
								<label for='start'>Start Date</label>
								<input
									style={{ margin: "2rem" }}
									type='date'
									id='start'
									value={getDateObjToInput(startDate)}
									min={getDateObjToInput(startDate)}
									onChange={handleStartDate}
									name='startDate'
								/>
								<br />
								<label for='end'>Expiry Date</label>
								<input
									style={{ margin: "2rem" }}
									type='date'
									id='end'
									value={getDateObjToInput(endDate)}
									min={getDateObjToInput(endDate)}
									onChange={handleEndDate}
									name='endDate'
								/>
							</div>
						</DialogContentText>
						<div style={{ textAlign: "center" }}>
							<span>Exchange Rate:</span>
							<label style={{ margin: "2rem 0 2rem 2rem" }} for='Fixed'>
								Fixed
							</label>
							<input
								checked={exchangeRate === "fixed"}
								onChange={(e) => setExchangeRate("fixed")}
								type='checkbox'
								name='fixed'
								id='fixed'
							/>
							<label style={{ margin: "2rem 0 2rem 2rem" }} for='Floating'>
								Foating
							</label>
							<input
								checked={exchangeRate === "floating"}
								onChange={(e) => setExchangeRate("floating")}
								type='checkbox'
								name='floating'
								id='floating'
							/>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleModalClose}>Cancel</Button>
						<Button onClick={handleAddLoan} autoFocus>
							Add Loan
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			{isLoggedIn ? (
				<div style={{ alignItems: "center", textAlign: "center" }}>
					<div style={{ margin: "2rem" }}>
						<h1>Loan Details</h1>
						<Button onClick={handleModalOpen} variant='contained'>
							Add Loan
						</Button>
					</div>

					<LoanTable loans={loans} />
				</div>
			) : (
				<h1 style={{ textAlign: "center" }}>Please log in</h1>
			)}
		</div>
	)
}

export default App
