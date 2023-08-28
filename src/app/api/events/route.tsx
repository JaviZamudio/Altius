import { events } from "@/configs/database";
import { NextRequest, NextResponse } from "next/server";



export async function GET() {
    const eventsResult = await events.find().toArray()
    NextResponse.json(eventsResult);
}

export async function POST(request: NextRequest) {
    const body = await request.json()
    const result = await events.insertOne(body)
    // events.insertOne({
    //     title: "Laguna de Servín",
    //     description: "2 horas de rodada en la laguna de Servín",
    //     date: new Date("2023-08-19"),
    //     stravaLink: "https://www.strava.com/routes/284928",
    //     difficulty: 1,
    //     takeOffTime: "06:30",
    //     meetingPoint: "Laguna de Servín",
    //     finishTime: "08:30",
    // })

    return NextResponse.json(result)
}