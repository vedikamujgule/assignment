import { supabase } from "app/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("datasources").select("*");

  if (error) {
    return NextResponse.json(
      { message: "Error fetching data", details: error.details },
      { status: 500 }
    );
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const requiredFields = [
      "datasource",
      "type",
      "status",
      "createdBy",
      "createdAt",
    ];

    const missingField = requiredFields.find((field) => !body[field]);
    if (missingField) {
      return NextResponse.json(
        { message: `Missing required field: ${missingField}` },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("datasources").insert([body]);

    if (error) {
      return NextResponse.json(
        { message: "Failed to insert data", details: error.details },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Data added", data }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Unexpected server error", error: (err as Error).message },
      { status: 500 }
    );
  }
}
