//Get //Patch 
import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req, {params}) => {
    try {
        await connectToDb();   
        const prompt = await Prompt.findById(params.id).populate('creator');
    
        if(!prompt) return new Response('Prompt not found', {status: 404})

        return new Response(JSON.stringify(prompt), {status: 200})
    } catch (error) {
        return new Response('Failed to fetch the user prompt', {status: 500})
    }
}

export const PATCH = async(req, {params}) => {
    const {prompt,tag} = await req.json();
    try {
        await connectToDb();
        const existingPrompt = await Prompt.findById(params.id);
        if(!existingPrompt) return new Response('Prompt does not exist', {status: 404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), {status: 200})
    } catch (error) {
        return new Response('Failed to update try later', {status: 500})
    } 
}
// Delete
// export const DELETE = async({params}) => {
//     try {
//         await connectToDb();
//         await Prompt.findByIdAndRemove(params.id);

//         return new Response('Prompt deleted', {status: 200})
//     } catch (error) {
//         return new Response('unable to delete at the moment try again later', {status: 500})        
//     }
// }

export const DELETE = async (req, { params }) => {
    try {
      await connectToDb();
      
      await Prompt.findByIdAndRemove(params.id);
      return new Response('Prompt deleted', { status: 200 });

    } catch (error) {
      return new Response('Unable to delete at the moment, please try again later', { status: 500 });
    }
  };
  