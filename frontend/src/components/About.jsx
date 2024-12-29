import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import team from "../assets/teams.png";
import aboutUs from "../assets/about-us-bg.jpg";
import "../style.css/aboutUs.css";
import NavBar from "./NavBar";

const About = () => {
  return (
    <>
      <NavBar />
      <div className="container mt-5 text-white smooth-scroll">
        <section className="mb-5">
          <div className="row">
            <div className="col-md-6">
              <h2>Our Mission</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Possimus iure vel nulla, repellat temporibus vitae nam illum
                tempore voluptatem officiis odit totam perspiciatis ad. Vero
                voluptates suscipit soluta perspiciatis minima?.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src={aboutUs}
                className="img-fluid rounded"
                alt="Our Mission"
              />
            </div>
          </div>
        </section>
        <section className="mb-5">
          <div className="row">
            <div className="col-md-6 order-md-2">
              <h2>Our Vision</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                earum, exercitationem quis deserunt recusandae error saepe ad at
                quo eius reprehenderit natus pariatur consequuntur alias eaque
                rem, eveniet non cumque..
              </p>
            </div>
            <div className="col-md-6 order-md-1">
              <img
                src={aboutUs}
                className="img-fluid rounded"
                alt="Our Vision"
              />
            </div>
          </div>
        </section>
        <section className="mb-5">
          <div className="row">
            <div className="col-md-6">
              <h2>Our Team</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus
                praesentium vero adipisci quas minus sint quasi, alias eum enim
                maxime voluptate, quidem officiis delectus aliquid molestiae
                labore nisi amet nesciunt?.
              </p>
            </div>
            <div className="col-md-6">
              <img src={team} className="img-fluid rounded" alt="Our Team" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
