/** @format */

import React, { useState } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import { GoogleLogin, GoogleLogout } from "react-google-login"

export const MuiAppBar = ({
	newNotification,
	updateDetails,
	isLoggedIn,
	setIsLoggedIn,
}) => {
	const responseGoogleFailure = (response) => {
		newNotification("error", response)
	}
	const responseGoogleSuccess = (response) => {
		newNotification("success", "You have successfully logged in")
		updateDetails(response)
	}

	const logout = () => {
		newNotification("success", "You have successfully logged out")
		setIsLoggedIn(false)
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar>
					<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
						Tax Block
					</Typography>
					{isLoggedIn ? (
						<GoogleLogout
							clientId='554998784728-rve2bvqh0735jue8odqj6islsjv78h6q.apps.googleusercontent.com'
							buttonText='Logout'
							onLogoutSuccess={logout}></GoogleLogout>
					) : (
						<GoogleLogin
							clientId='554998784728-rve2bvqh0735jue8odqj6islsjv78h6q.apps.googleusercontent.com'
							buttonText='Login'
							onSuccess={responseGoogleSuccess}
							onFailure={responseGoogleFailure}
							cookiePolicy={"single_host_origin"}
						/>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}
