import { connectToDb } from "@utils/database"
import Prompt from "@models/prompt";

export const GET = async(req, {params}) => {
    try {
        await connectToDb();
        const userData = await Prompt.find({creator: params.id}).populate('creator');

        return new Response(JSON.stringify(userData), {status: 200})
    } catch (error) {
        return new Response('Failed to fetch user Profile', {status: 500})
    }
}