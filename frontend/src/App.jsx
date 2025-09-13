import { useEffect, useState } from 'react'
import axios from 'axios'
function App(){
  const [questions, setQuestions] = useState([])
  const [newQ, setNewQ] = useState('')
  const [answers, setAnswers] = useState({})
  const [student, setStudent] = useState('')
  useEffect(()=>{
    axios.get(import.meta.env.VITE_BACKEND_URL + '/api/questions/')
      .then(res=> setQuestions(res.data))
      .catch(err=> console.error(err))
  },[])
  const handleAddQuestion = ()=>{
    if(!newQ.trim()) return
    axios.post(import.meta.env.VITE_BACKEND_URL + '/api/questions/', { text: newQ })
      .then(res=> setQuestions([res.data, ...questions]))
      .catch(err=> console.error(err))
      .finally(()=> setNewQ(''))
  }
  const handleAddAnswer = (qid)=>{
    const text = answers[qid]
    if(!text || !text.trim()) return
    axios.post(import.meta.env.VITE_BACKEND_URL + '/api/answers/', {
      question: qid,
      student_name: student || 'Anonymous',
      text
    }).then(()=> {
      return axios.get(import.meta.env.VITE_BACKEND_URL + '/api/questions/')
    }).then(res=> setQuestions(res.data))
      .catch(err=> console.error(err))
      .finally(()=> setAnswers(prev=> ({...prev, [qid]: ''})))
  }
  return (
    <div style={{maxWidth:800, margin:'20px auto', padding:10}}>
      <h1>Teacher - Student Q&A</h1>
      <div style={{marginBottom:20}}>
        <input placeholder="Your name (optional)" value={student} onChange={e=>setStudent(e.target.value)} />
      </div>
      <div style={{display:'flex', gap:8, marginBottom:20}}>
        <input style={{flex:1}} placeholder="Add a question..." value={newQ} onChange={e=>setNewQ(e.target.value)} />
        <button onClick={handleAddQuestion}>Add Question</button>
      </div>
      {questions.map(q=>(
        <div key={q.id} style={{border:'1px solid #ddd', padding:10, marginBottom:12}}>
          <h3>{q.text}</h3>
          <small>Created: {new Date(q.created_at).toLocaleString()}</small>
          <ul>
            {q.answers.map(a=>(
              <li key={a.id}><b>{a.student_name}:</b> {a.text}</li>
            ))}
          </ul>
          <div style={{display:'flex', gap:8, marginTop:8}}>
            <input style={{flex:1}} placeholder="Write answer..." value={answers[q.id]||''} onChange={e=>setAnswers({...answers, [q.id]: e.target.value})} />
            <button onClick={()=>handleAddAnswer(q.id)}>Submit</button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default App
