import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [input, setInput] = useState<string>("");
  const [characters, setCharacters] = useState([]);
  const [results, setResults] = useState(<h2>results</h2>);

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (typeof value === "string") {
      setInput(value);
    }
  };

  useEffect(() => {
    const newChars = Array.from(input);
    const charItems = newChars.map((character) => (
      <ListGroup.Item>{character}</ListGroup.Item>
    ));
    setResults(<ListGroup>{charItems}</ListGroup>);
  }, [input]);

  return (
    <div className="App">
      <Jumbotron className="center">
        <h1>Write chinese here:</h1>
        <Form>
          <Form.Group controlId="sentence">
            <Form.Control
              size="lg"
              type="text"
              value={input}
              onChange={handleChange}
              placeholder="Enter sentence"
              maxLength={20}
              // style={{ maxWidth: "20rem", justifySelf: "center" }}
            />
          </Form.Group>
        </Form>
        {results}
      </Jumbotron>
    </div>
  );
}

export default App;
