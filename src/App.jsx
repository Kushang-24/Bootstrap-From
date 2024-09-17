import React, { useState, useEffect } from "react";
import { Container, Form, Row, Col, Button, Table } from "react-bootstrap";
import {
  BsEmojiAngry,
  BsEmojiAstonished,
  BsEmojiNeutral,
  BsEmojiSmile,
  BsEmojiWink,
} from "react-icons/bs";

const EmojiSelector = ({ emojis, name, value, onChange }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="emoji-selector">
      {emojis.map((emoji, index) => (
        <span
          key={index}
          onClick={() => onChange(name, index + 1)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            cursor: "pointer",
            color:
              hoveredIndex === index
                ? emoji.hoverColor
                : value === index + 1
                ? emoji.hoverColor
                : "inherit",
            fontSize: "2rem",
            marginRight: "0.5rem",
            padding: "0.5rem",
            borderRadius: "50%",
            display: "inline-block",
            textAlign: "center",
            width: "2rem",
            height: "2rem",
          }}
        >
          {emoji.icon}
        </span>
      ))}
    </div>
  );
};

const App = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    source: "",
    feedback: "",
    registrationRating: "",
    navigationRating: "",
  });
  const [records, setRecords] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedRecords = JSON.parse(
      localStorage.getItem("registrationFeedback") || "[]"
    );
    setRecords(storedRecords);
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target || {};
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRatingChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editIndex !== null) {
      const updatedRecords = [...records];
      updatedRecords[editIndex] = formData;
      setRecords(updatedRecords);
      localStorage.setItem(
        "registrationFeedback",
        JSON.stringify(updatedRecords)
      );
      setEditIndex(null);
    } else {
      const newRecords = [...records, formData];
      setRecords(newRecords);
      localStorage.setItem("registrationFeedback", JSON.stringify(newRecords));
    }
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      source: "",
      feedback: "",
      registrationRating: "",
      navigationRating: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(records[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedRecords = records.filter((_, i) => i !== index);
    setRecords(updatedRecords);
    localStorage.setItem(
      "registrationFeedback",
      JSON.stringify(updatedRecords)
    );
  };

  const emojis = [
    { icon: <BsEmojiAngry />, hoverColor: "#ef4623" },
    { icon: <BsEmojiAstonished />, hoverColor: "#f68e20" },
    { icon: <BsEmojiNeutral />, hoverColor: "#fecc08" },
    { icon: <BsEmojiSmile />, hoverColor: "#91e53e" },
    { icon: <BsEmojiWink />, hoverColor: "#0ec12f" },
  ];

  return (
    <Container className="mt-5">
      <Row>
        <Col md={5}>
          <h1>User Registration Feedback</h1>
          <Form onSubmit={handleSubmit} className="fw-bold">
            <Row>
              <Col md={6}>
                <Form.Group controlId="firstName" className="my-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="lastName" className="my-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </Form.Group>
            <Form.Group controlId="phone" className="my-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </Form.Group>
            <Form.Group controlId="source" className="my-3">
              <Form.Label>How did you hear about us?</Form.Label>
              <Form.Select
                name="source"
                value={formData.source}
                onChange={handleChange}
                aria-label="Source select"
              >
                <option>Select an option</option>
                <option value="internet">Internet</option>
                <option value="friend">Friend</option>
                <option value="advertisement">Advertisement</option>
              </Form.Select>
            </Form.Group>
            <fieldset>
              <Form.Group>
                <Form.Label className="my-3">Rate your experience</Form.Label>
                <Row>
                  <Col md={6}>
                    <Form.Label className="my-3">
                      Registration Process
                    </Form.Label>
                    <EmojiSelector
                      emojis={emojis}
                      name="registrationRating"
                      value={formData.registrationRating}
                      onChange={handleRatingChange}
                    />
                  </Col>
                  <Col md={6}>
                    <Form.Label className="my-3">Website Navigation</Form.Label>
                    <EmojiSelector
                      emojis={emojis}
                      name="navigationRating"
                      value={formData.navigationRating}
                      onChange={handleRatingChange}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </fieldset>
            <Form.Group controlId="feedback" className="my-3">
              <Form.Label>Feedback</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                placeholder="Please provide any feedback you have about your experience"
              />
            </Form.Group>
            <Form.Group controlId="terms" className="my-3">
              <Form.Check
                type="checkbox"
                label="I agree to the Terms and Conditions and acknowledge the Privacy Policy."
              />
            </Form.Group>
            <Button variant="primary" className="fw-bold" type="submit">
              {editIndex !== null ? "Update Feedback" : "Submit Feedback"}
            </Button>
            {editIndex !== null && (
              <Button
                variant="secondary"
                onClick={() => setEditIndex(null)}
                className="ml-2"
              >
                Cancel
              </Button>
            )}
          </Form>
        </Col>
        <Col md={7}>
          <h1 className="mb-5">Feedback Records</h1>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Source</th>
                <th>Feedback</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index}>
                  <td>{record.firstName}</td>
                  <td>{record.lastName}</td>
                  <td>{record.email}</td>
                  <td>{record.phone}</td>
                  <td>{record.source}</td>
                  <td>{record.feedback}</td>
                  <td>
                    <Button variant="info" onClick={() => handleEdit(index)}>
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
