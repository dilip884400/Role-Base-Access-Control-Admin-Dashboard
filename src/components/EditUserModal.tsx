"use client";
import React, { useState, useEffect } from "react";

const EditUserModal = ({ onClose, userData, view }: any) => {
    const [roles, setRoles] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        type: "User",
        id: "",
        name: "",
        email: "",
        role: "",
        status: "",
    });

    useEffect(() => {
        console.log("Received userData:", userData);
        if (userData) {
            setFormData({
                type: "User",
                id: userData.id || "",
                name: userData.name || "",
                email: userData.email || "",
                role: userData.role || "",
                status: userData.status || "",
            });
        }
    }, [userData]);

    useEffect(() => {
        async function fetchRoles() {
            const response = await fetch("/api/roles");
            const data = await response.json();
            setRoles(data.roles);
        }
        fetchRoles();
    }, []);

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleToggleStatus = () => {
        if (!view) {
            setFormData((prev) => ({
                ...prev,
                status: prev.status === "Active" ? "Inactive" : "Active",
            }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = await fetch("/api/users", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        console.log(data.message);
        onClose();
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
                            {view ? "View User" : "Edit User"}
                        </h3>
                        <span onClick={onClose} className="cursor-pointer">
                            X
                        </span>
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
                                    disabled={view}
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
                                    disabled={view}
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
                                    disabled={view}
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
                                <label className="inline-flex items-center ml-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.status === "Active"}
                                        onChange={handleToggleStatus}
                                        disabled={view}
                                    />
                                    <div
                                        className={`relative w-10 h-6 bg-gray-300 rounded-full peer-focus:ring-4 peer-focus:ring-green-300 peer-checked:bg-green-500`}
                                    >
                                        <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></div>
                                    </div>
                                    <span className="ml-3 text-sm font-medium">
                                        {formData.status}
                                    </span>
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            disabled={view}
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditUserModal;
