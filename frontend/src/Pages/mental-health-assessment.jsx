import { useState } from "react"

const questions = [
  "Little interest or pleasure in doing things?",
  "Feeling down, depressed, or hopeless?",
  "Trouble falling or staying asleep, or sleeping too much?",
  "Feeling tired or having little energy?",
  "Poor appetite or overeating?",
  "Feeling bad about yourself or that you are a failure or have let yourself or your family down?",
  "Trouble concentrating on things, such as reading the newspaper or watching television?",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
  "Thoughts that you would be better off dead, or of hurting yourself in some way?",
]

export const MentalHealthAssessment = ({ saveResult }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(0))
  const [result, setResult] = useState(null)

  const handleAnswer = (index, value) => {
    const newAnswers = [...answers]
    newAnswers[index] = value
    setAnswers(newAnswers)
  }

  const calculateScore = () => {
    const score = answers.reduce((a, b) => a + b, 0)
    let interpretation = ""
    if (score <= 4) {
      interpretation = "Minimal depression"
    } else if (score <= 9) {
      interpretation = "Mild depression"
    } else if (score <= 14) {
      interpretation = "Moderate depression"
    } else if (score <= 19) {
      interpretation = "Moderately severe depression"
    } else {
      interpretation = "Severe depression"
    }
    setResult(`Your score is ${score}. Interpretation: ${interpretation}`)
    saveResult("MentalHealth", score)
  }

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index} className="mb-4">
          <p className="text-lg mb-2">{question}</p>
          <select
            value={answers[index]}
            onChange={(e) => handleAnswer(index, Number.parseInt(e.target.value))}
            className="w-full p-2 border rounded"
          >
            <option value={0}>Not at all</option>
            <option value={1}>Several days</option>
            <option value={2}>More than half the days</option>
            <option value={3}>Nearly every day</option>
          </select>
        </div>
      ))}
      <button
        onClick={calculateScore}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600 transition-colors hover:cursor-pointer"
      >
        Calculate Score
      </button>
      {result && (
        <div className="mt-6 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Result:</h2>
          <p className="text-lg">{result}</p>
        </div>
      )}
    </div>
  )
}

