import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import './App.css'

function CodeReview() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)
  const [review, setReview] = useState(``)
  const [error, setError] = useState(null)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    try {
      const response = await axios.post('http://localhost:5000/ai/review', { code })

      // ✅ Make sure we extract the actual review text
      const reviewText = response.data?.review

      if (typeof reviewText === 'string') {
        setReview(reviewText)
        setError(null)
      } else {
        throw new Error("Unexpected response format from server.")
      }
    } catch (err) {
      console.error("Review request failed:", err)
      setError("Something went wrong while reviewing the code.")
    }
  }

  return (
    <main className="flex min-h-screen bg-gray-900 text-white p-6 gap-4">
      {/* Left Side - Code Editor and Button */}
      <div className="flex flex-col justify-between w-1/2 bg-gray-800 p-4 rounded-lg">
        <div className="flex-1 overflow-auto mb-4">
          <Editor
            value={code}
            onValueChange={setCode}
            highlight={code =>
              prism.highlight(code, prism.languages.javascript, "javascript")
            }
            padding={10}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              backgroundColor: "#2d2d2d",
              borderRadius: "5px",
              minHeight: "100%",
            }}
          />
        </div>
        <button
          onClick={reviewCode}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded w-fit"
        >
          Review
        </button>
      </div>

      {/* Right Side - Review Output */}
      <div className="w-1/2 bg-gray-800 p-4 rounded-lg overflow-auto">
        {error ? (
          <p className="text-red-400">{error}</p>
        ) : (
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {typeof review === 'string' ? review : ''}
          </Markdown>
        )}
      </div>
    </main>
  )
}

export default CodeReview
