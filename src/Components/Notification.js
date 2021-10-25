/** @format */

import React, { useState, useEffect } from "react"
import Alert from "@mui/material/Alert"
import Collapse from "@mui/material/Collapse"
import Stack from "@mui/material/Stack"

export const Notification = ({
	notification,
	severity,
	message,
	closeNotification,
}) => {
	useEffect(() => {
		if (notification) {
			setTimeout(() => {
				closeNotification()
			}, 3500)
		}
	}, [notification])
	return (
		<Stack sx={{ width: "100%" }} spacing={2}>
			<Collapse in={notification}>
				<Alert severity={severity} onClose={closeNotification}>
					{message}
				</Alert>
			</Collapse>
		</Stack>
	)
}
