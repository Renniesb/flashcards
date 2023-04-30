import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Card } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FormControl } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button, Collapse } from "react-bootstrap";
import EditCard from "./editCard.jsx";
import ReactAudioPlayer from "react-audio-player";

// import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import env from "../config.js";

function EditDeck({
  currentDeck,
  deckHash,
  cardsHash,
  onHandleDeckChange,
  onHandleCardChange,
  onDeleteCard,
  newCardFront,
  newCardBack,
  onNewCardChange,
  onCardAdd,
}) {
  const [filteredQuizzes, setQuizzes] = useState([
    { id: 1, quizname: "Loading..." },
  ]);

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const [ttext, changettext] = useState("");
  const [timage, changetimage] = useState("");
  const [tsound, changetsound] = useState("");
  const [dtext, changedtext] = useState("");
  const [dimage, changedimage] = useState("");
  const [dsound, changedsound] = useState("");

  console.log("the current deck", currentDeck);
  const [quizid, setQuizId] = useState(Number(deckHash[currentDeck].quizid));

  useEffect(() => {
    Promise.all([fetch(`${env.Quizzes}quiz`), fetch(`${env.ENDPOINT}decks`)])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([quizzes, decks]) => {
        let quizIdsList = decks.map((deck) => deck.quizid);
        let quizList = quizzes.filter(
          (quiz) =>
            !quizIdsList.includes(quiz.id) || quizIdsList.includes(quizid)
        );
        // let quizList = quizzes.filter(quiz=>!quizIdsList.includes(quiz.id));

        setQuizzes(quizList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [quizid]);

  const addMedia = () => {
    const fCardValue = {
      target: {
        name: "newCardFront",
        value: [ttext, timage, tsound].join("^"),
      },
    };
    const bCardValue = {
      target: {
        name: "newCardBack",
        value: [dtext, dimage, dsound].join("^"),
      },
    };
    onNewCardChange(fCardValue);
    onNewCardChange(bCardValue);
  };

  // const [state, setState] = useState([])
  // const [query, setQuery] = useState()
  // useEffect(() => {
  //     fetch("/api/data?q=" + query).then(
  //         res => setState(res.data)
  //     )
  // }, [query])
  // console.log(deckHash[currentDeck].deckdescription)
  // onChange={(e)=>{onHandleDeckChange(e,currentDeck)}
  const changeQuizId = (e) => {
    setQuizId(e.target.value.replace("^", ""));
    onHandleDeckChange(e, currentDeck);
  };
  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <InputGroup className="mb-3 mt-3">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <strong>Deck Name:</strong>{" "}
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              name="deckname"
              value={deckHash[currentDeck].deckname}
              onChange={(e) => {
                onHandleDeckChange(e, currentDeck);
              }}
            />
          </InputGroup>
          <InputGroup className="mb-4">
            <InputGroup.Prepend>
              <InputGroup.Text>
                <strong>Deck Description:</strong>{" "}
              </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              as="textarea"
              name="deckdescription"
              value={deckHash[currentDeck].deckdescription}
              onChange={(e) => {
                onHandleDeckChange(e, currentDeck);
              }}
            />
          </InputGroup>
        </Col>
      </Row>

      {cardsHash[currentDeck] &&
        cardsHash[currentDeck].map((card, i) => {
          const frontContents = card.front?.split("^") || [];
          const backContents = card.back?.split("^") || [];
          return (
            <EditCard
              key={card.id}
              cardkey={i}
              card={card}
              onHandleCardChange={onHandleCardChange}
              frontContents={frontContents}
              backContents={backContents}
              currentDeck={currentDeck}
              onDeleteCard={onDeleteCard}
            />
          );
        })}

      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <form className="newCard">
            <h3>Add a Card to the Deck</h3>
            <h4
              style={{
                marginTop: "20px",
                textAlign: "center",
                textDecoration: "underline",
              }}
            >
              Front
            </h4>

            <div className="form-group">
              {/* add term */}
              <div className="d-flex flex-column align-items-between">
                {timage?.trim() !== "" && (<p>
                  <strong>Image/Gif:</strong>
                </p>)}
                {timage?.trim() !== "" && (
                  <img
                    style={{ marginBottom: "1rem" }}
                    height="100px"
                    width="150px"
                    alt="flashcard content"
                    className="quizimg"
                    src={timage}
                  />
                )}
                {ttext?.trim() !== "" && (<p>
                  <strong>Text: </strong> {ttext}
                </p>)}
                {tsound?.trim() !== "" && (<p>
                  <strong>Sound:</strong>
                </p>)}

                {tsound?.trim() !== "" && (<ReactAudioPlayer
                  style={{ marginBottom: "1rem" }}
                  src={tsound}
                  controls
                />)}
              </div>
              <Button
                style={{ marginBottom: "10px" }}
                onClick={() => setOpen1(!open1)}
                aria-controls="collapse-side-1"
                aria-expanded={open1}
              >
                Front Fields
              </Button>
              <Collapse in={open1}>
                <ListGroup id="collapse-side-1">
                  <ListGroup.Item>
                    Text{" "}
                    <textarea
                      data-gramm="false"
                      data-gramm_editor="false"
                      data-enable-grammarly="false"
                      type="text"
                      className="form-control"
                      placeholder="text"
                      name="text front"
                      value={ttext}
                      onChange={(e) =>
                        changettext(e.target.value.replace("^", ""))
                      }
                    />{" "}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Image/Gif link{" "}
                    <input
                      type="text"
                      className="form-control"
                      value={timage}
                      placeholder="gif or image link"
                      name="image front"
                      onChange={(e) =>
                        changetimage(e.target.value.replace("^", ""))
                      }
                    />{" "}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Sound link{" "}
                    <input
                      type="text"
                      value={tsound}
                      className="form-control"
                      placeholder="sound link"
                      name="sound front"
                      onChange={(e) =>
                        changetsound(e.target.value.replace("^", ""))
                      }
                    />{" "}
                  </ListGroup.Item>
                </ListGroup>
              </Collapse>
            </div>
            <div className="form-group">
              <hr />
              {/* add definition */}
              <h4
                style={{
                  marginTop: "20px",
                  textAlign: "center",
                  textDecoration: "underline",
                }}
              >
                Back
              </h4>
              <div className="d-flex flex-column align-items-between">
                {dimage?.trim() !== "" && (<p>
                  <strong>Image/Gif:</strong>
                </p>)}
                {dimage?.trim() !== "" && (
                  <img
                    style={{ marginBottom: "1rem" }}
                    height="100px"
                    width="150px"
                    alt="flashcard content"
                    className="quizimg"
                    src={dimage}
                  />
                )}
                {dtext?.trim() !== "" && (<p>
                  <strong>Text: </strong> {dtext}
                </p>)}
                {dsound?.trim() !== "" && (<p>
                  <strong>Sound:</strong>
                </p>)}

                {dsound?.trim() !== "" && (<ReactAudioPlayer
                  style={{ marginBottom: "1rem" }}
                  src={dsound}
                  controls
                />)}
              </div>
              <Button
                style={{ marginBottom: "10px" }}
                onClick={() => setOpen2(!open2)}
                aria-controls="collapse-side-2"
                aria-expanded={open2}
              >
                Back Fields
              </Button>
              <Collapse in={open2}>
                <ListGroup id="collapse-side-2">
                  <ListGroup.Item>
                    Text{" "}
                    <textarea
                      data-gramm="false"
                      data-gramm_editor="false"
                      data-enable-grammarly="false"
                      type="text"
                      value={dtext}
                      className="form-control"
                      placeholder="text"
                      name="text back"
                      onChange={(e) =>
                        changedtext(e.target.value.replace("^", ""))
                      }
                    />{" "}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Image/Gif link{" "}
                    <input
                      type="text"
                      className="form-control"
                      placeholder="gif or image link"
                      value={dimage}
                      name="image back"
                      onChange={(e) =>
                        changedimage(e.target.value.replace("^", ""))
                      }
                    />{" "}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Sound link{" "}
                    <input
                      type="text"
                      value={dsound}
                      className="form-control"
                      placeholder="sound link"
                      name="sound back"
                      onChange={(e) =>
                        changedsound(e.target.value.replace("^", ""))
                      }
                    />{" "}
                  </ListGroup.Item>
                </ListGroup>
              </Collapse>
            </div>
            <Button
              variant="secondary"
              className="mb-3"
              type="submit"
              onClick={(e) => {
                addMedia();

                const frontCard = [ttext, timage, tsound].join("^");
                const backCard = [dtext, dimage, dsound].join("^");

                onCardAdd(e, frontCard, backCard, currentDeck);
                changettext("");
                changetimage("");
                changetsound("");
                changedtext("");
                changedimage("");
                changedsound("");
              }}
            >
              Add Card
            </Button>
            <h2 style={{ paddingTop: "10px" }}>Link to a quiz</h2>
            <select
              name="quizid"
              onChange={(e) => changeQuizId(e)}
              id="select"
              value={quizid}
            >
              {filteredQuizzes.map((quiz) => (
                <option key={quiz.id + 1} value={quiz.id}>
                  {quiz.quizname}
                </option>
              ))}
            </select>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditDeck;
