/** @format */

import axios from "axios"

const URL = "https://peaceful-badlands-13132.herokuapp.com"

export const post = async (apiURL, data) => {
	return axios.post(`${URL}/${apiURL}`, data, {
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
		},
	})
}

export const get = async (apiURL, params, data) => {
	return axios.get(`${URL}/${apiURL}`, {
		params,
		headers: {
			"Content-Type": "application/json;charset=UTF-8",
		},
		data: data,
	})
}
