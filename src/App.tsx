import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import Jumbotron from "react-bootstrap/Jumbotron";
import "bootstrap/dist/css/bootstrap.min.css";
import hanzi from "hanzi";
import * as _ from "lodash";

const hanCharacter = new RegExp("[\u4E00-\u9FCC]");

//what percentile of easiest words should be the sentence difficulty
const DIFFICULTY_THRESHOLD = 0.9;

type Frequency = {
  number: string;
  character: string;
  count: string;
  percentage: number;
  meaning: string;
};

const getHsk = (frequencyNumber: number): number => {
  if (frequencyNumber <= 178) return 1;
  if (frequencyNumber <= 485) return 2;
  if (frequencyNumber <= 623) return 3;
  if (frequencyNumber <= 1071) return 4;
  if (frequencyNumber <= 1709) return 5;
  if (frequencyNumber <= 2633) return 6;
  if (frequencyNumber <= 2633) return 7;
  return 1;
};

function App() {
  const [input, setInput] = useState<string>("");
  const [characters, setCharacters] = useState<string[]>([]);
  const [results, setResults] = useState(<h2></h2>);
  const [difficulty, setDifficulty] = useState<string | undefined>(undefined);
  const [frequencies, setFrequencies] = useState<Frequency[]>([]);

  const handleChange = (event: any) => {
    const value = event.target.value;
    if (typeof value === "string") {
      setInput(value);
    }
  };

  useEffect(() => {
    hanzi.start();
  }, []);

  useEffect(() => {
    const newFrequencies: Frequency[] = characters
      .filter((character) => {
        if (!hanCharacter.test(character)) {
          setFrequencies([]);
          return false;
        }
        return true;
      })
      .map((character) => {
        return hanzi.getCharacterFrequency(character);
      });
    const orderedFrequencies = _.sortBy(newFrequencies, (f: Frequency) =>
      parseInt(f.number)
    );

    if (newFrequencies.length > 0) {
      setFrequencies(orderedFrequencies);
    }
  }, [characters]);

  useEffect(() => {
    const newChars: string[] = _.uniqBy(Array.from(input), (e) => e);
    setCharacters(newChars);

    // setResults(<ListGroup>{charItems}</ListGroup>);
  }, [input]);

  useEffect(() => {
    const charItems = frequencies.map((frequency: Frequency) => {
      return (
        <ListGroup.Item key={frequency.number}>
          <h3>
            {frequency.character} - {frequency.number}{" "}
            {"(HSK " + getHsk(parseInt(frequency.number)) + ")"}
            {/* {Math.floor(frequency.percentage)}% */}
          </h3>
          <h5>{frequency.meaning}</h5>
        </ListGroup.Item>
      );
    });
    setResults(<ListGroup>{charItems}</ListGroup>);

    if (frequencies.length > 0) {
      const id = Math.floor(frequencies.length * DIFFICULTY_THRESHOLD - 1);
      setDifficulty(frequencies[id].number);
    } else {
      setDifficulty(undefined);
    }
  }, [frequencies]);

  return (
    <div className="App">
      <Jumbotron className="center">
        {/* <h1>How difficult?:</h1> */}
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
        <h2>
          Difficulty:{" "}
          {difficulty ? "HSK " + getHsk(parseInt(difficulty)) : "n/a"}{" "}
        </h2>
        {results}
      </Jumbotron>
    </div>
  );
}

export default App;
