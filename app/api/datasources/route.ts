// app/api/datasources/route.ts
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

type Datasource = {
  name: string;
  type: string;
  status: string;
  createdAt: string;
  createdBy: string;
};

const DATA_FILE = path.join(
  process.cwd(),
  "app",
  "public",
  "datasource-data.json"
);

export async function GET() {
  try {
    const file = await fs.readFile(DATA_FILE, "utf-8");
    const data: Datasource[] = JSON.parse(file);
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET API Error:", error);
    return NextResponse.json(
      { message: "Error fetching data", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const newEntry = await req.json();
    const file = await fs.readFile(DATA_FILE, "utf-8");
    const json: Datasource[] = JSON.parse(file);

    json.push(newEntry);
    await fs.writeFile(DATA_FILE, JSON.stringify(json, null, 2));

    return NextResponse.json(
      { message: "Data added successfully", data: newEntry },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST API Error:", error);
    return NextResponse.json(
      { message: "Error processing request", error },
      { status: 500 }
    );
  }
}
