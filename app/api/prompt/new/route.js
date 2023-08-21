import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const {userID, prompt, tag} = await req.json();

    try {
        await connectToDb();
        const newPrompt = new Prompt({creator: userID, tag, prompt})
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})
    } catch (error) {
        return new Response(JSON.stringify('unable to fetch '), {status: 500})

    }
}