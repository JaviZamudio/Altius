import { events } from "@/configs/database"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server"

// Get a specific event by id
export async function GET(request: NextRequest, {params}: {params: {_id: string}}) {
    // get the event id from the request params
    const _id = new ObjectId(params._id)
    console.log(_id)
    console.log(params)

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
export async function DELETE(request: NextRequest, {params}: {params: {_id: string}}) {
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