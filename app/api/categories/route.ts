import { prismaDB } from "@/lib/prismaDB";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const {name} = await req.json();
    if(!name) return new NextResponse("Category name is required.", {status: 404});
    const {userId} = auth();

    if(!userId) return redirect('/');

    const category = await prismaDB.category.create({
      data: {
        name,
        userId
      }

    })
    return NextResponse.json(category)
  } catch (error) {
    console.log('Error creating category');
    return new NextResponse("Failed to create category name.", { status: 404 });
    
  }
}

export const PATCH = async (req: Request) => {
  try {
    const { name, id } = await req.json();
    if (!name || !id) 
      return new NextResponse("Category name or ID is required.", { status: 404 });
    const { userId } = auth();

    if (!userId) return redirect("/");

    const category = await prismaDB.category.update({
      data: {
        name,
        userId,
      },
      where: {
        id
      }
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log("Error creating category");
    return new NextResponse("Failed to create category name.", { status: 404 });
  }
};