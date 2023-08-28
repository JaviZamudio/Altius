import { NextRequest, NextResponse } from "next/server";

export async function GET(resquest: NextRequest) {
    return NextResponse.json({ message: "Welcome to the API!" });
}