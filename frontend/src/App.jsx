import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [answerText, setAnswerText] = useState({}); // প্রতিটি প্রশ্নের উত্তর আলাদা করে রাখবো

  // Backend URL
  const API_URL = import.meta.env.VITE_BACKEND_URL;

  // সব প্রশ্ন লোড করা
  const fetchQuestions = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/questions/`);
      setQuestions(res.data);
    } catch (err) {
      console.error("Error fetching questions:", err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // নতুন প্রশ্ন যোগ করা
  const addQuestion = async () => {
    if (!newQuestion.trim()) return;
    try {
      await axios.post(`${API_URL}/api/questions/`, { text: newQuestion });
      setNewQuestion("");
      fetchQuestions(); // আবার রিলোড
    } catch (err) {
      console.error("Error adding question:", err);
    }
  };

  // উত্তর যোগ করা
  const addAnswer = async (qid) => {
    if (!answerText[qid]?.trim()) return;
    try {
      await axios.post(`${API_URL}/api/questions/${qid}/answers/`, {
        text: answerText[qid],
      });
      setAnswerText((prev) => ({ ...prev, [qid]: "" }));
      fetchQuestions(); // আবার রিলোড
    } catch (err) {
      console.error("Error adding answer:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Teacher–Student Q&A</h1>

      {/* Teacher Add Question */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Add Question</h2>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          placeholder="Write a question..."
          style={{ padding: "8px", width: "300px" }}
        />
        <button onClick={addQuestion} style={{ marginLeft: "10px", padding: "8px" }}>
          Submit
        </button>
      </div>

      {/* Question List */}
      <h2>All Questions</h2>
      {questions.length === 0 && <p>No questions yet.</p>}
      <ul>
        {questions.map((q) => (
          <li key={q.id} style={{ marginBottom: "20px" }}>
            <strong>{q.text}</strong>

            {/* Show answers */}
            <ul>
              {q.answers.length === 0 ? (
                <li>No answers yet.</li>
              ) : (
                q.answers.map((a) => (
                  <li key={a.id} style={{ marginLeft: "15px" }}>
                    {a.text}
                  </li>
                ))
              )}
            </ul>

            {/* Student add answer */}
            <input
              type="text"
              value={answerText[q.id] || ""}
              onChange={(e) =>
                setAnswerText((prev) => ({ ...prev, [q.id]: e.target.value }))
              }
              placeholder="Write your answer..."
              style={{ padding: "6px", width: "250px" }}
            />
            <button
              onClick={() => addAnswer(q.id)}
              style={{ marginLeft: "10px", padding: "6px" }}
            >
              Answer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
