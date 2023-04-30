import { Collapse, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { FormControl } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ReactAudioPlayer from "react-audio-player";

export default function EditCard({
  cardkey,
  card,
  onHandleCardChange,
  frontContents,
  backContents,
  currentDeck,
  onDeleteCard,
}) {
  const [ftext, changeftext] = useState(frontContents[0]);
  const [fimage, changefimage] = useState(frontContents[1]);
  const [fsound, changefsound] = useState(frontContents[2]);
  const [btext, changebtext] = useState(backContents[0]);
  const [bimage, changebimage] = useState(backContents[1]);
  const [bsound, changebsound] = useState(backContents[2]);

  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Card className="mb-4">
          <Card.Header>
            <strong>Card {cardkey + 1}</strong>
          </Card.Header>
          <Card.Body>
            <h4 style={{ textAlign: "center", textDecoration: "underline" }}>
              Front
            </h4>
            <div className="d-flex flex-column align-items-between">
              {fimage?.trim() !== "" && (<p>
                <strong>Image/Gif:</strong>
              </p>)}
              {fimage?.trim() !== "" && typeof fimage !== "undefined" && (
                <img
                  style={{ marginBottom: "1rem" }}
                  height="100px"
                  width="150px"
                  alt="flashcard content"
                  className="quizimg"
                  src={fimage}
                />
              )}
              {ftext?.trim() !== "" && (<p>
                <strong>Text: </strong> {ftext}
              </p>)}
              {fsound?.trim() !== "" && (<p>
                <strong>Sound:</strong>
              </p>)}

              {fsound?.trim() !== "" && typeof fsound !== "undefined" && (
                <ReactAudioPlayer
                  style={{ marginBottom: "1rem" }}
                  src={fsound}
                  controls
                />
              )}
            </div>
            <Button
              className="align-self-end"
              style={{ marginBottom: "10px", marginTop: "10px" }}
              onClick={() => setOpen1(!open1)}
              aria-controls={"collapse-side-1" + cardkey}
              aria-expanded={open1}
            >
              Edit Front
            </Button>

            <Collapse in={open1}>
              <ListGroup id={"collapse-side-1" + cardkey}>
                <FormControl
                  hidden
                  as="textarea"
                  name="front"
                  value={card.front}
                  onChange={(e) => onHandleCardChange(e, currentDeck, card.id)}
                  aria-label="With textarea"
                />
                <ListGroup.Item>
                  Text{" "}
                  <textarea
                    data-gramm="false"
                    data-gramm_editor="false"
                    data-enable-grammarly="false"
                    type="text"
                    className="form-control"
                    placeholder="text"
                    value={ftext}
                    onChange={(e) => {
                      const frontarray = card.front?.split("^") || [];
                      frontarray[0] = e.target.value.replace("^", "");
                      const newCardValue = {
                        target: {
                          name: "front",
                          value: frontarray.join("^"),
                        },
                      };
                      onHandleCardChange(newCardValue, currentDeck, card.id);
                      changeftext(e.target.value.replace("^", ""));
                    }}
                  />{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  Image/Gif link{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="gif or image link"
                    value={fimage}
                    onChange={(e) => {
                      const frontarray = card.front?.split("^") || [];
                      frontarray[1] = e.target.value.replace("^", "");
                      const newCardValue = {
                        target: {
                          name: "front",
                          value: frontarray.join("^"),
                        },
                      };
                      onHandleCardChange(newCardValue, currentDeck, card.id);
                      changefimage(e.target.value.replace("^", ""));
                    }}
                  />{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  Sound link{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="sound link"
                    value={fsound}
                    onChange={(e) => {
                      const frontarray = card.front?.split("^") || [];
                      frontarray[2] = e.target.value.replace("^", "");
                      const newCardValue = {
                        target: {
                          name: "front",
                          value: frontarray.join("^"),
                        },
                      };
                      onHandleCardChange(newCardValue, currentDeck, card.id);
                      changefsound(e.target.value.replace("^", ""));
                    }}
                  />{" "}
                </ListGroup.Item>
              </ListGroup>
            </Collapse>
            <hr />
            <InputGroup style={{ marginTop: "10px" }} className="mb-3">
              <FormControl
                hidden
                name="back"
                value={card.back}
                onChange={(e) => onHandleCardChange(e, currentDeck, card.id)}
                as="textarea"
                aria-label="With textarea"
              />
            </InputGroup>
            {/* Edit Definition  */}
            <div className="d-flex flex-column align-items-between">
              <h4 style={{ textAlign: "center", textDecoration: "underline" }}>
                Back
              </h4>
              {bimage?.trim() !== "" && (<p>
                <strong>Image/Gif:</strong>
              </p>)}
              {bimage?.trim() !== "" && typeof bimage !== "undefined" && (
                <img
                  style={{ marginBottom: "1rem" }}
                  height="100px"
                  width="150px"
                  alt="flashcard content"
                  className="quizimg"
                  src={bimage}
                />
              )}
              {btext?.trim() !== "" && (<p>
                <strong>Text: </strong> {btext}
              </p>)}
              {bsound?.trim() !== "" && (<p>
                <strong>Sound:</strong>
              </p>)}

              {bsound?.trim() !== "" && typeof bsound !== "undefined" && (
                <ReactAudioPlayer
                  style={{ marginBottom: "1rem" }}
                  src={bsound}
                  controls
                />
              )}
            </div>
            <Button
              style={{ marginBottom: "10px" }}
              onClick={() => setOpen2(!open2)}
              aria-controls={"collapse-side-2" + cardkey}
              aria-expanded={open2}
            >
              Edit Back
            </Button>
            <Collapse in={open2}>
              <ListGroup id={"collapse-side-2" + cardkey}>
                <ListGroup.Item>
                  Text{" "}
                  <textarea
                    name="back"
                    data-gramm="false"
                    data-gramm_editor="false"
                    data-enable-grammarly="false"
                    type="text"
                    className="form-control"
                    placeholder="text"
                    value={btext}
                    onChange={(e) => {
                      const backarray = card.back?.split("^") || [];
                      backarray[0] = e.target.value.replace("^", "");
                      const newCardValue = {
                        target: {
                          name: "back",
                          value: backarray.join("^"),
                        },
                      };
                      onHandleCardChange(newCardValue, currentDeck, card.id);
                      changebtext(e.target.value.replace("^", ""));
                    }}
                  />{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  Image/Gif link{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="gif or image link"
                    value={bimage}
                    height="150px"
                    weight="150px"
                    onChange={(e) => {
                      const backarray = card.back?.split("^") || [];
                      backarray[1] = e.target.value.replace("^", "");
                      const newCardValue = {
                        target: {
                          name: "back",
                          value: backarray.join("^"),
                        },
                      };
                      onHandleCardChange(newCardValue, currentDeck, card.id);
                      changebimage(e.target.value.replace("^", ""));
                    }}
                  />{" "}
                </ListGroup.Item>
                <ListGroup.Item>
                  Sound link{" "}
                  <input
                    type="text"
                    className="form-control"
                    placeholder="sound link"
                    value={bsound}
                    onChange={(e) => {
                      const backarray = card.back?.split("^") || [];
                      backarray[2] = e.target.value.replace("^", "");
                      const newCardValue = {
                        target: {
                          name: "back",
                          value: backarray.join("^"),
                        },
                      };
                      onHandleCardChange(newCardValue, currentDeck, card.id);
                      changebsound(e.target.value.replace("^", ""));
                    }}
                  />{" "}
                </ListGroup.Item>
              </ListGroup>
            </Collapse>
            <Button
              style={{ display: "block", marginTop: "10px" }}
              variant="outline-dark"
              onClick={(e) => {
                if (
                  window.confirm("Are you sure you wish to delete this item?")
                ){
                  onDeleteCard(e, card, currentDeck);
                }
              }}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
