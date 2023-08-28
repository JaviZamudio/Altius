import { events } from "@/configs/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const eventsResult = await events.find().toArray()
    return NextResponse.json(eventsResult)
}

export async function POST(request: NextRequest) {
    const reqBody = await request.json()

    const newEvent = {
        title: reqBody.title,
        description: reqBody.description,
        date: new Date(reqBody.date),
        stravaLink: reqBody.stravaLink,
        difficulty: reqBody.difficulty,
        takeOffTime: reqBody.takeOffTime,
        meetingPoint: reqBody.meetingPoint,
        finishTime: reqBody.finishTime,
    }

    const result = await events.insertOne(newEvent)

    return NextResponse.json(result)
}