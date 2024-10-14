import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { AiFillDashboard } from "react-icons/ai";
import user from '../img/testimonial-1.jpg'; // Ensure correct path
import './sidebar.css';
const Adminpanel = () => {
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const adminPanelData = {
    name: "Administration",
    demouserimage: user,
    demousername: "demo user",
    button: "logout",
    fields: [
      { id: "1", button: "Dashboard" },
      { id: "2", button: "Users", dropdown: [
          { id: "1", label: "Add User", icon: faAngleRight },
          { id: "2", label: "Manage User", icon: faAngleRight },
        ]
      },
      { id: "3", button: "Projects" },
      { id: "4", button: "Company" },
      { id: "5", button: "Comments" },
    ],
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    if (buttonName !== "Logout") {
      setOpenDropdown(null); // Ensure dropdowns close when a new button is clicked
    }
  };

  const handleDropdownToggle = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const renderContent = () => {
    switch (activeButton) {
      case "Dashboard":
        return <DashboardContent />;
      case "Add User":
        return <div>Add User Content</div>; // Placeholder for actual content
      case "Manage User":
        return <div>Manage User Content</div>; // Placeholder for actual content
      // Add cases for other buttons here
      default:
        return <div>Select an option from the sidebar.</div>;
    }
  };

  return (
   
    <Container fluid className="lg:block">
        <Row className="bg-black text-white">
        <Col xs lg="3" className="p-3">
          <h1 className="text-3xl font-bold text-center">{adminPanelData.name}</h1>
        </Col>
        <Col xs lg="6" className="p-3">
          {/* Additional content here */}
        </Col>
        <Col xs lg="2" className="p-3 d-flex align-items-center">
          <img
            src={adminPanelData.demouserimage}
            alt="Demo User"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <p>{adminPanelData.demousername}</p>
        </Col>
        <Col xs lg="1" className="p-3">
          <Button
            className="text-white border-white bg-black"
            onClick={() => handleButtonClick("Logout")}
          >
            {adminPanelData.button}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs lg="2" className="bg-black text-white" style={{ height: "680px" }}>
          {adminPanelData.fields.map((field) => (
            <div key={field.id} className="mb-2">
              <div
                className={`w-100 rounded-0 py-3 d-flex align-items-center ${
                  activeButton === field.button ? "bg-gray-800" : "bg-black"
                } text-white border-b border-gray-700 ${field.dropdown ? "cursor-pointer" : ""}`}
                onClick={() =>
                  field.dropdown
                    ? handleDropdownToggle(field.id)
                    : handleButtonClick(field.button)
                }
                style={{ cursor: "pointer" }}
              >
                {field.button === "Dashboard" ? (
                  <AiFillDashboard
                    style={{ marginRight: "10px", fontSize: "20px" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faBars}
                    style={{ marginRight: "10px" }}
                  />
                )}
                {field.button}
                {field.dropdown && (
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    style={{
                      marginLeft: "auto",
                      
                      transition: "transform 0.4s ease",
                      transform:
                        openDropdown === field.id
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                    }}
                  />
                )}
              </div>
              {openDropdown === field.id && field.dropdown && (
                <div
                  className="custom-dropdown-menu text-white bg-black rounded-md"
                  style={{ paddingLeft: "20px", display: "block", position: "relative" }}
                  ref={dropdownRef}
                >
                  {field.dropdown.map((item) => (
                    <Button
                      key={item.id}
                      className={`dropdown-item text-white hover:bg-gray-700 ${
                        activeButton === item.label ? "bg-gray-800" : ""
                      }`}
                      style={{ padding: "10px", width: "100%", textAlign: "left", position: "relative" }}
                      onClick={() => handleButtonClick(item.label)}
                    >
                      <FontAwesomeIcon
                        icon={item.icon || faUser} // Default icon if none provided
                        style={{ marginRight: "10px" }}
                      />
                      {item.label}
                      <FontAwesomeIcon
                        style={{
                          position: "absolute",
                          right: "10px",
                          color: "white",
                          display:"block",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Col>
        <Col xs lg="10" className="p-0">
          {renderContent()}
        </Col>
      </Row>
      
      
    </Container>
  );
};

// Dummy DashboardContent component for rendering
const DashboardContent = () => (
  <Col xs lg="12" className="p-5" style={{ backgroundColor: '#4bf828' }}>
    <Row className="g-5">
      <Col lg={4}>
        <Card className="bg-white" style={{ width: "100%", height: "250px" }}>
          <Card.Img variant="top" src="https://via.placeholder.com/150" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="bg-white" style={{ width: "100%", height: "250px" }}>
          <Card.Img variant="top" src="https://via.placeholder.com/150" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="bg-white" style={{ width: "100%", height: "250px" }}>
          <Card.Img variant="top" src="https://via.placeholder.com/150" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Col>
);

export default Adminpanel;
