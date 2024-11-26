import { Package } from '@/types/package';
import { NextResponse } from 'next/server';

let roles = [
    { id: "1", name: 'Admin', permission: ["View", "Add", "Edit", "Delete"] },
    { id: "2", name: 'Editor', permission: ["View", "Add", "Edit"] },
    { id: "3", name: 'User', permission: ["View"] }
];

let permissions = ["View", "Add", "Edit", "Delete"];


export async function GET() {
    return NextResponse.json({ roles, permissions });
}

export async function POST(request: Request) {
    const newRole = await request.json();
    roles.push({ id: roles.length + 1, ...newRole });
    return NextResponse.json({ message: 'User added successfully', roles });
}

export async function PUT(request: Request) {
    const { id, ...updatedRole } = await request.json();
    roles = roles.map((role) => (role.id === id ? { ...role, ...updatedRole } : role));
    return NextResponse.json({ message: 'role updated successfully', roles });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    roles = roles.filter((role) => role.id !== id);
    return NextResponse.json({ message: 'role deleted successfully', roles });
}
