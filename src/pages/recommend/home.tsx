import React, { useState } from 'react';
import './style.css';

function RecommendV2() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill('')); // Initialize answers array with empty strings
  const [validationError, setValidationError] = useState(false);

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

  const handleSubmit = () => {
    // Check if all questions are answered
    if (answers.some(answer => answer === '')) {
      setValidationError(true);
    } else {
    //   const csvContent = generateCSV();
    //   const encodedUri = encodeURI(csvContent);
    //   const link = document.createElement('a');
    //   link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedUri);
    //   link.setAttribute('download', 'questionnaire.csv');
    //   document.body.appendChild(link);
    //   link.click();
    console.log(answers)
    }
  };

  const handleReset = () => {
    setAnswers(Array(20).fill('')); // Reset answers to empty strings
    setCurrentQuestionIndex(0); // Reset to first question
    setValidationError(false); // Reset validation error
  };

  const generateCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13,q14,q15,q16,q17,q18,q19,q20\n';
    csvContent += answers.map(answer => answer === 'yes' ? '1' : '0').join(',') + '\n';
    return csvContent;
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
              checked={answers[currentQuestionIndex] === 'yes'}
              onChange={() => handleAnswerChange('yes')}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="answer"
              value="no"
              checked={answers[currentQuestionIndex] === 'no'}
              onChange={() => handleAnswerChange('no')}
            />
            No
          </label>
        </div>
        {validationError && <p className="error-message">Please answer this question.</p>}
        <div className="nav-buttons">
          <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
          <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
        </div>
      </div>
      {currentQuestionIndex === questions.length - 1 && (
        <div className="buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={handleReset} style={{ color: 'red' }}>Reset</button>
        </div>
      )}
    </div>
  );
}

const questions = [
  'Is the story mainly about characters having experiences and adventures in imaginary places?',
  'Does the plot revolve around a central mystery or puzzle that characters need to solve?',
//   'Does the story involve historical events or provide an account of the past?',
//   'Is there a strong emphasis on the development of romantic relationships?',
//   'Does the book give a detailed account of a real person\'s life and experiences?',
//   'Does the plot include technological advancements and their impact on society?',
//   'Is there a significant element of fear or horror meant to create suspense?',
//   'Is the storytelling presented in a sequential, illustrated format with speech bubbles?',
//   'Do the characters embark on a journey or adventure throughout the narrative?',
//   'Does the narrative incorporate elements of poetry and rhythmic language?',
//   'Does the plot involve magical elements, mythical creatures, or alternate worlds?',
//   'Is there a focus on musical or performance-related content?',
//   'Does the narrative aim to evoke tension and anticipation?',
//   'Is the storyline primarily centered around solving a crime or uncovering hidden truths?',
//   'Does the work provide an account of significant events in the past?',
//   'Does the plot revolve around personal relationships and emotional struggles?',
//   'Is the narrative set in a futuristic world with advanced technology?',
//   'Does the story involve characters facing supernatural or paranormal phenomena?',
//   'Is there a central element of surprise or unexpected twists in the plot?',
//   'Does the work include elements that create a sense of awe and wonder?'
];

export default RecommendV2;