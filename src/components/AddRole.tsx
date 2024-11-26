"use client";
import React, { useState, useEffect } from "react";

const AddRoleModal = ({ onClose }: any) => {
    const [permissions, setPermissions] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        type:"Role",
        name: "",
        permission: [] as string[],
    });

    useEffect(() => {
        // Fetch available permissions from the API
        async function fetchPermissions() {
            const response = await fetch("/api/roles");
            const data = await response.json();
            setPermissions(data.permissions || []);
        }
        fetchPermissions();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePermissionToggle = (permission: string) => {
        setFormData((prev) => ({
            ...prev,
            permission: prev.permission.includes(permission)
                ? prev.permission.filter((perm) => perm !== permission)
                : [...prev.permission, permission],
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("formdata",formData)
        const response = await fetch("/api/roles", {
            method: "POST",
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
                            Add New Role
                        </h3>
                        <span onClick={onClose} className="cursor-pointer">
                            X
                        </span>
                    </div>

                    <form className="p-4" onSubmit={handleSubmit}>
                        <div className="grid gap-4 mb-4">
                            <div>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Role Name
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
                                    Permissions
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {permissions.map((perm) => (
                                        <label
                                            key={perm}
                                            className="inline-flex items-center space-x-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            <input
                                                type="checkbox"
                                                value={perm}
                                                checked={formData.permission.includes(perm)}
                                                onChange={() => handlePermissionToggle(perm)}
                                            />
                                            <span>{perm}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                            Add Role
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRoleModal;
