import { Package } from '@/types/package';
import { NextResponse } from 'next/server';

let users: Package[] = [
    { id: "1", name: 'Vinit Makhan', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: "2", name: 'Joy Briden', email: 'editor@example.com', role: 'Editor', status: 'Inactive' },
    { id: "3", name: 'Vin Disel', email: 'user@example.com', role: 'User', status: 'Inactive' },
];


export async function GET() {
    return NextResponse.json({ users });
}

export async function POST(request: Request) {
    const newUser = await request.json();
    users.push({ id: users.length + 1, ...newUser });
    return NextResponse.json({ message: 'User added successfully', users });
}

export async function PUT(request: Request) {
    const { id, ...updatedUser } = await request.json();
    users = users.map((user) => (user.id === id ? { ...user, ...updatedUser } : user));
    return NextResponse.json({ message: 'User updated successfully', users });
}

export async function DELETE(request: Request) {
    const { id } = await request.json();
    users = users.filter((user) => user.id !== id);
    return NextResponse.json({ message: 'User deleted successfully', users });
}

