import Quiz from "../models/Quiz.model.js";

export const getquestions= async (req, res) => {
    try {
        const quiz = await Quiz.find();
        res.status(200).send(quiz);
    }
    catch (error) {
        res.status(404).send({ message: error.message });
    }
}

export const addquestions = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const newQuiz = new Quiz({ question, answer });
        await newQuiz.save();
        res.status(201).send({ message: "Question added successfully" });
    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
}

export const updatequestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;
        const quiz = await Quiz.findById(id);
        if (!quiz) return res.status(404).send(`No question with id: ${id}`);
        const updatedQuiz = { question, answer};   
        await Quiz.findByIdAndUpdate(id, updatedQuiz, { new: true });
        res.status(200).send({ message: "Question updated successfully" });
    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }
}

export const deletequestion = async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = await Quiz.findById(id);
        if (!quiz) return res.status(404).send(`No question with id: ${id}`);
        await Quiz.findByIdAndDelete(id);
        res.status(200).send({ message: "Question deleted successfully" });
    }
    catch (error) {
        res.status(500).send({ message: "Something went wrong" });
    }   
}