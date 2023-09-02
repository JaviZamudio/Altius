import { events } from "@/configs/database"
import { Event } from "@/types/types"
import { hasIncompleteFields } from "@/utils/utils"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

// Get a specific event by id
export async function GET(request: NextRequest, {params}: {params: {_id: string}}) {
    // get the event id from the request params
    const _id = new ObjectId(params._id)

    // find the event by id
    const event = await events.findOne({ _id })

    // return NextResponse.json({ message: 'Events found', data: eventsResult, code: "OK" })
    return NextResponse.json({ message: 'Events found', data: event, code: "OK" })
}

// Add a new attendee to an event
export async function POST(request: NextRequest, {params}: {params: {_id: string}}) {
    // get the event id from the request params
    const _id = new ObjectId(params._id)

    // get the attendee name from the request body
    const { name } = await request.json()

    // update the event with the new attendee
    const result = await events.updateOne({ _id }, {
        $push: {
            attendees: name
        }
    })

    return NextResponse.json({ message: 'Attendee added', data: result, code: "OK" })
}

// Remove an attendee from an event
export async function PUT(request: NextRequest, {params}: {params: {_id: string}}) {
    // get the event id from the request params
    const _id = new ObjectId(params._id)

    // get the attendee name from the request body
    const { name } = await request.json()

    // update the event with the new attendee
    const result = await events.updateOne({ _id }, {
        $pull: {
            attendees: name
        }
    })

    return NextResponse.json({ message: 'Attendee removed', data: result, code: "OK" })
}

// delete an event
export async function DELETE(request: NextRequest, {params}: {params: {_id: string}}) {
    // get the event id from the request params
    const _id = new ObjectId(params._id)

    // delete the event
    const result = await events.deleteOne({ _id })

    return NextResponse.json({ message: 'Event deleted', data: result, code: "OK" })
}

export async function PATCH(request: NextRequest, {params}: {params: {_id: string}}) {
    // get the event id from the request params
    const _id = new ObjectId(params._id)

    // get the event
    const event = await events.findOne({ _id });

    if (!event) {
        return NextResponse.json({ message: 'Event not found', code: "NOT_FOUND" })
    }

    // get the event data from the request body
    const reqBody = await request.json()
    const newData = {
        title: reqBody.title,
        stravaLink: reqBody.stravaLink,
        difficulty: reqBody.difficulty,
        date: new Date(reqBody.date),
        takeOffTime: reqBody.takeOffTime,
        finishTime: reqBody.finishTime,
        meetingPoint: reqBody.meetingPoint,
        description: reqBody.description,
        attendees: event.attendees,
    }

    if(hasIncompleteFields(newData)) {
        return NextResponse.json({ message: 'Incomplete fields', code: "INCOMPLETE_FIELDS" })
    }

    // update the event
    const result = await events.updateOne({ _id }, {
        $set: {
            ...newData
        }
    })

    return NextResponse.json({ message: 'Event updated', data: result, code: "OK" })
}