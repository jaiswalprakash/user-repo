import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./CompStyles.css";

function UserView() {
	const [allUsers, setAllUsers] = useState([]);
	const [backedUpData, setBackedUpData] = useState({});
	const [allowAdd, setAllowAdd] = useState([]);

	const fetchUsers = () => {
		// http://localhost:3001/user/get-all
		axios
			.get("/user/get-all")
			.then((response) => {
				setAllUsers(response.data);
				setAllowAdd(Array(response.data.length).fill(false));
			})
			.catch((error) => {
				toast.error(error?.response?.data?.error ?? "Error while fetching all users!");
				console.log("Error while fetching all users! ", error);
			});
	};

	const addUser = (userData, index) => {
		let { name, email, phone, address } = userData;
		const updatedFlags = [...allowAdd];
		updatedFlags[index] = false;

		// http://localhost:3001/user/create
		axios
			.post(`/user/create`, { name, email, phone, address })
			.then((response) => {
				const updatedUsers = structuredClone(allUsers);
				updatedUsers.splice(index, 1, response.data.result);
				setAllUsers(updatedUsers);
				toast.success(response.data.message);
				setAllowAdd(updatedFlags);
			})
			.catch((error) => {
				toast.error(error?.response?.data?.error ?? "Error while adding new user!");
				console.log("Error while adding new user! ", error);
			});
	};

	const updateUser = (userData, index) => {
		let { _id, name, email, phone, address } = userData;
		const updatedFlags = [...allowAdd];
		updatedFlags[index] = false;

		// http://localhost:3001/user/update/${_id}
		axios
			.put(`/user/update/${_id}`, {
				name,
				email,
				phone,
				address
			})
			.then((response) => {
				const updatedUsers = structuredClone(allUsers);
				updatedUsers.splice(index, 1, response.data.result);
				setAllUsers(updatedUsers);
				toast.success(response.data.message);
			})
			.catch((error) => {
				const backup = structuredClone(backedUpData);
				if (backup.hasOwnProperty(index)) {
					const updatedUsers = structuredClone(allUsers);
					Object.keys(backup[index]).forEach((key) => {
						updatedUsers[index][key] = backup[index][key];
					});
					delete backup[index];
					setAllUsers(updatedUsers);
					setBackedUpData(backup);
				}
				toast.error(error?.response?.data?.error ?? "Error while updating user data!");
				console.log("Error while updating user data! ", error);
			})
			.finally(() => {
				setAllowAdd(updatedFlags);
			});
	};

	const deleteUser = (_id, index) => {
		// http://localhost:3001/user/delete/${_id}
		axios
			.delete(`/user/delete/${_id}`)
			.then((response) => {
				const updatedUsers = structuredClone(allUsers);
				const updatedFlags = [...allowAdd];
				updatedUsers.splice(index, 1);
				updatedFlags.splice(index, 1);
				setAllUsers(updatedUsers);
				setAllowAdd(updatedFlags);
				toast.success(response.data.message);
			})
			.catch((error) => {
				toast.error(error?.response?.data?.error ?? "Error while deleting user!");
				console.log("Error while deleting user! ", error);
			});
	};

	useEffect(() => {
		fetchUsers();
	}, []);

	const onAddNew = () => {
		const updatedUsers = structuredClone(allUsers);
		updatedUsers.push({
			name: "",
			email: "",
			phone: "",
			address: ""
		});
		setAllUsers(updatedUsers);

		const updatedFlags = [...allowAdd];
		updatedFlags.push(true);
		setAllowAdd(updatedFlags);
	};

	const onAdd = (index) => {
		if (allUsers[index].hasOwnProperty("_id")) {
			//Update user data
			updateUser(allUsers[index], index);
		} else {
			//Create a new user
			addUser(allUsers[index], index);
		}
	};

	const onEdit = (index) => {
		const updatedFlags = [...allowAdd];
		updatedFlags[index] = true;
		setAllowAdd(updatedFlags);
	};

	const onDelete = (index) => {
		deleteUser(allUsers[index]._id, index);
	};

	const handleValueChange = (index, property, value) => {
		const updatedUsers = structuredClone(allUsers);
		if (property === "phone" && value.length > 10) return;

		const backup = structuredClone(backedUpData);
		if (backup[index]) {
			if (!backup[index].hasOwnProperty(property)) {
				backup[index][property] = updatedUsers[index][property];
			}
		} else {
			backup[index] = {};
			backup[index][property] = updatedUsers[index][property];
		}
		setBackedUpData(backup);
		updatedUsers[index][property] = value;
		setAllUsers(updatedUsers);
	};

	return (
		<>
			<div className="container-lg">
				<div className="table-responsive">
					<div className="table-wrapper">
						<div className="table-title">
							<div className="row">
								<div className="col-sm-8">
									<h2>
										User <b>Details</b>
									</h2>
								</div>
								<div className="col-sm-4">
									<button type="button" className="btn btn-info add-new" onClick={onAddNew}>
										<i className="fa fa-plus"></i> Add New
									</button>
								</div>
							</div>
						</div>
						<table className="table table-bordered">
							<thead>
								<tr>
									<th>Name</th>
									<th>Email</th>
									<th>Phone</th>
									<th>Address</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{allUsers.map((user, idx) => (
									<tr key={idx}>
										<td>
											{!allowAdd[idx] ? user.name : <input type="text" className="form-control" id="name" value={user.name} onChange={(event) => handleValueChange(idx, "name", event.target.value)} />}
										</td>
										<td>
											{!allowAdd[idx] ? (
												user.email
											) : (
												<input type="text" className="form-control" id="email" value={user.email} onChange={(event) => handleValueChange(idx, "email", event.target.value)} />
											)}
										</td>
										<td>
											{!allowAdd[idx] ? (
												user.phone
											) : (
												<input type="number" className="form-control" id="phone" value={user.phone} onChange={(event) => handleValueChange(idx, "phone", event.target.value)} />
											)}
										</td>
										<td>
											{!allowAdd[idx] ? (
												user.address
											) : (
												<input type="text" className="form-control" id="address" value={user.address} onChange={(event) => handleValueChange(idx, "address", event.target.value)} />
											)}
										</td>
										<td>
											{allowAdd[idx] ? (
												<a className="add" title="Add" onClick={() => onAdd(idx)} data-toggle="tooltip">
													<i className="material-icons">&#xE03B;</i>
												</a>
											) : (
												<a className="edit" title="Edit" onClick={() => onEdit(idx)} data-toggle="tooltip">
													<i className="material-icons">&#xE254;</i>
												</a>
											)}
											<a className="delete" title="Delete" data-toggle="tooltip" disabled={!user.hasOwnProperty("_id")} onClick={() => onDelete(idx)}>
												<i className="material-icons">&#xE872;</i>
											</a>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</>
	);
}

export default UserView;
