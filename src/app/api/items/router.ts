"use server"
import { NextResponse } from 'next/server';

export async function GET() {
  const items = JSON.parse(localStorage.getItem('items') || '[]');
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const newItem = await request.json();
  const items = JSON.parse(localStorage.getItem('items') || '[]');
  items.push(newItem);
  localStorage.setItem('items', JSON.stringify(items));
  return NextResponse.json(newItem, { status: 201 });
}
