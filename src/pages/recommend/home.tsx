import React, { useState } from "react";
import "./style.css";
import { getBookRecommendations } from "../../apis/recommend";
import { Box, Grid, Typography } from "@mui/material";
import Loader from "../../components/Loader/Loader";
import Popup from "../../components/Popup";

function RecommendV2() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill("")); // Initialize answers array with empty strings
  const [validationError, setValidationError] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state for API requests
  const [results, setResults] = useState([]); // Array to store book recommendations
  const [genere, setGenere] = useState("")

  const handleAnswerChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    setValidationError(false); // Reset validation error when a new answer is selected
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handlePrevQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    setLoading(true);
    if (answers.some((answer) => answer === "")) {
      setValidationError(true);
    } else {
      //   const csvContent = generateCSV();
      //   const encodedUri = encodeURI(csvContent);
      //   const link = document.createElement('a');
      //   link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedUri);
      //   link.setAttribute('download', 'questionnaire.csv');
      //   document.body.appendChild(link);
      //   link.click();
      console.log(answers);
      const v = answers.map((answer) => (answer === "yes" ? 1 : 0));
      console.log(v);

      try {
        const results = await getBookRecommendations(v);
        console.log(results.data);
        
        setResults(results.data);
        setGenere(results.data[0].class)
        setLoading(false);
        
      } catch (error) {
        console.log(error);
        
        setValidationError(true);
      }
    }
  };

  const handleReset = () => {
    setAnswers(Array(10).fill("")); // Reset answers to empty strings
    setCurrentQuestionIndex(0); // Reset to first question
    setValidationError(false); // Reset validation error
  };


  return (
    <div className="App">
      <h1>Questionnaire</h1>
      <div className="question-box">
        <div className="question">
          <p>Question {currentQuestionIndex + 1}:</p>
          <p>{questions[currentQuestionIndex]}</p>
        </div>
        <div className="options">
          <label>
            <input
              type="radio"
              name="answer"
              value="yes"
              checked={answers[currentQuestionIndex] === "yes"}
              onChange={() => handleAnswerChange("yes")}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="answer"
              value="no"
              checked={answers[currentQuestionIndex] === "no"}
              onChange={() => handleAnswerChange("no")}
            />
            No
          </label>
        </div>
        {/* {validationError && (
          <p className="error-message">Please answer this question.</p>
        )} */}
        <div className="nav-buttons">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
          >
            Next
          </button>
        </div>
      </div>
      {currentQuestionIndex === questions.length - 1 && (
        <div className="buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleReset} style={{ color: "red" }}>
            Reset
          </button>
        </div>
      )}

      {validationError && (
        <Popup
          message="Please answer all questions before submitting."
          onClose={() => {
            setValidationError(false);
          
            setLoading(false);
          }}
          severity="warning"
          icon="❌"
        />
      )}

      {loading && !validationError ? (
        <Loader />
      ) : (
        <Box sx={{ mt: 5 }}>
          {/* <h2>class : </h2><div>{genere}</div> */}

          <Grid container spacing={5}>
            {results.map((book) => (
              <Grid item xs={12} sm={3} key={book.id}>
                <Box
                  // onClick={() => onBookClick(book.id)}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    p: 2,
                    borderRadius: "8px",
                    backgroundColor: "#424242",
                    height: "100%",
                    width: "100%",
                  }}
                >
                  <img
                    loading="lazy"
                    src={book.image}
                    alt={"book.title"}
                    width={"100%"}
                    height={"100%"}
                  />
                  <Typography variant="body2" align="center">
                    {book.book_name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </div>
  );
}

const questions = [
  "Do you enjoy reading about real people's lives?", //biography
  "Are you interested in famous people's stories?", //biography
  "Do you prefer true stories over made-up ones?",
  "Do you enjoy learning about past events?", //history
  "Are you interested in how societies have changed over time?",
  "Do you like reading about what actually happened in the past?", //history
  "Do you like looking at pictures while you read?", //comic
  "Do you enjoy stories with both words and pictures?", //comic
  "Would you like to read a story in comic book form?", //comic
  "Do you like reading poems?" //poetry
];

export default RecommendV2;
