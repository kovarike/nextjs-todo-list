import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
const itemsSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  id: z.string().uuid(),
  completed: z.boolean().default(false)
});

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.item.findMany();
  return NextResponse.json(items);
}


export async function POST(request: NextRequest) {
  
    try {
      const items = await request.json();
      const { id, name, completed } = itemsSchema.parse(items);
      const newItem = await prisma.item.create({
        data: { id, name, completed},
      });
      return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 400 });
    }
  
}

export async function PUT(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const idParams  = params.get('id')
  if(!idParams){return NextResponse.json({ error: "ID is required" }, { status: 400 });}
  try {
    const json = await request.json();
    const {id, name, completed } = itemsSchema.parse(json);
    
    const updatedItem = await prisma.item.update({
      where: { id: idParams },
      data: { id, name, completed },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json({ error: error}, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const id  = params.get('id')
  

  if(!id){return NextResponse.json({ error: "ID is required" }, { status: 400 });}
  try {
    await prisma.item.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Item deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Item not found' }, { status: 404 });
  }
}