"use client";
import React, { useState, useEffect } from "react";

const AddUserModal = ({ onClose }: any) => {
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "",
        status: "Active",
    });

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("/api/roles");
            const data = await response.json();
            setRoles(data.roles);
        }
        fetchData();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggleStatus = () => {
        setFormData((prev) => ({
            ...prev,
            status: prev.status === "Active" ? "Inactive" : "Active",
        }));
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        onClose()
    };

    return (
        <div
            style={{ zIndex: 99999 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-md">
                <div className="bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Add New User
                        </h3>
                        <span onClick={onClose} className="cursor-pointer">X</span>
                    </div>

                    <form className="p-4" onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Role
                                </label>
                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:text-white"
                                    required
                                >
                                    <option value="">Select a role</option>
                                    {roles.map((role: any) => (
                                        <option key={role?.id} value={role?.name}>
                                            {role?.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex items-center">
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    Status:
                                </span>
                                <label className="inline-flex items-center ml-2 me-5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.status === "Active"}
                                        onChange={handleToggleStatus}
                                    />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                        {formData.status === "Active" ? "Active" : "Inactive"}
                                    </span>
                                </label>

                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Add User
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUserModal;
