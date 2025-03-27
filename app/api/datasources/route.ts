import { supabase } from "app/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  const { data, error } = await supabase.from("datasources").select("*");

  if (error) {
    console.error("GET Error:", error.message);
    return NextResponse.json(
      { message: "Error fetching data", details: error.details },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("POST /api/datasources received body:", body);

    // Check required fields (optional, but helps)
    const required = ["datasource", "type", "status", "createdBy", "createdAt"];
    for (const field of required) {
      if (!body[field]) {
        console.error(`Missing required field: ${field}`);
        return NextResponse.json(
          { message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const { data, error } = await supabase.from("datasources").insert([body]);

    if (error) {
      console.error("Supabase INSERT Error:", error.message, error.details);
      return NextResponse.json(
        { message: error.message, details: error.details },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: "Data added", data }, { status: 200 });
  } catch (errror) {
    console.error("Unhandled POST Error:", errror);
    return NextResponse.json({ message: errror }, { status: 500 });
  }
}
