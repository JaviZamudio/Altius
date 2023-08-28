import { events } from "@/configs/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    // const eventsResult = await events.find().toArray()
    // ordered by date, with the most recent event first
    // const eventsResult = await events.find().sort({ date: -1 }).toArray()

    // get events with a date greater than or equal to today
    const nextEvents = await events.find({ date: { $gte: new Date() } }).sort({ date: 1 }).toArray()
    const pastEvents = await events.find({ date: { $lt: new Date() } }).sort({ date: -1 }).toArray()
    const eventsResult = { nextEvents, pastEvents }
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