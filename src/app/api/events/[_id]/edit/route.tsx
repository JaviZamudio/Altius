import { events } from "@/configs/database";
import { hasIncompleteFields } from "@/utils/utils";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

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