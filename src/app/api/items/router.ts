// src/app/api/items/route.ts

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.item.findMany();
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const { name, id } = await request.json();
  const newItem = await prisma.item.create({
    data: { name, id },
  });
  return NextResponse.json(newItem, { status: 201 });
}
