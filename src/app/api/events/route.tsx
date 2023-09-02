import { events } from "@/configs/database";
import { Event } from "@/types/types";
import { hasIncompleteFields } from "@/utils/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    // get events with a date greater than or equal to today
    const nextEvents = await events.find({ date: { $gte: new Date() } }).sort({ date: 1 }).toArray()
    const pastEvents = await events.find({ date: { $lt: new Date() } }).sort({ date: -1 }).toArray()

    const eventsResult = { nextEvents, pastEvents }
    return NextResponse.json({ message: 'Events found', data: eventsResult, code: "OK" })
}

export async function POST(request: NextRequest) {
    const reqBody = await request.json()

    const newEvent: Event = {
        title: reqBody.title,
        description: reqBody.description,
        date: new Date(reqBody.date),
        stravaLink: reqBody.stravaLink,
        difficulty: reqBody.difficulty,
        takeOffTime: reqBody.takeOffTime,
        meetingPoint: reqBody.meetingPoint,
        finishTime: reqBody.finishTime,
        attendees: [] as string[],
    }

    if (hasIncompleteFields(newEvent))
        return NextResponse.json({ message: 'Incomplete fields', code: "INCOMPLETE_FIELDS" })

    const result = await events.insertOne(newEvent)

    return NextResponse.json({ message: 'Event created', data: result, code: "OK" })
}