import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, { answers } from '../database/data.js'

/** get all questions */
export async function getQuestions(req, res){
    try {
        const q = await Questions.find();
        res.json(q)
    } catch (error) {
        res.json({ error })
    }
}

/** insert all questinos */
export async function insertQuestions(req, res){
    try {
        Questions.insertMany({ questions, answers }, function(err, data){
            res.json({ msg: "Data Saved Successfully...!"})
        })
    } catch (error) {
        res.json({ error })
    }
}

/** Delete all Questions */
export async function dropQuestions(req, res){
   try {
        await Questions.deleteMany();
        res.json({ msg: "Questions Deleted Successfully...!"});
   } catch (error) {
        res.json({ error })
   }
}

/** Get all results or a specific result for the logged-in user */
export async function getResults(req, res) {
    try {
        const { username } = req.query; // Assuming you pass userId as a query parameter

        if (username) {
            // Fetch the result for the specific user by their userId (or username)
            const result = await Results.findOne({ username });

            if (!result) {
                return res.status(404).json({ msg: "No result found for this user" });
            }

            return res.json(result);
        }

        // Fetch all results if no userId is provided
        const r = await Results.find();
        res.json(r);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


/** post all result */
export async function storeResult(req, res) {
    try {
        const { username, result, attempts, points, achived } = req.body;

        if (!username || !result) {
            throw new Error("Data Not Provided...!");
        }

        // 🔍 Check if user result already exists
        const existingResult = await Results.findOne({ username });

        if (existingResult) {
            // ✅ Update existing result instead of inserting duplicate
            await Results.updateOne(
                { username },
                { $set: { result, attempts, points, achived } }
            );
            return res.json({ msg: "Result Updated Successfully...!" });
        }

        // ✅ If not exists, insert new result
        const newResult = new Results({ username, result, attempts, points, achived });
        await newResult.save();

        return res.json({ msg: "Result Saved Successfully...!" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


/** delete all result */
export async function dropResult(req, res){
    try {
        await Results.deleteMany();
        res.json({ msg : "Result Deleted Successfully...!"})
    } catch (error) {
        res.json({ error })
    }
}