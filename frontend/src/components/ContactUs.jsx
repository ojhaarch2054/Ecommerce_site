import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import contact from "../assets/contactUs.svg";
import "../style.css/aboutUs.css";
import NavBar from './NavBar';

const Contact = () => {
    return (
        <>
        <NavBar/>
        <div className="container mt-5 text-white">
            <h1 className="text-center mb-4">Contact Us</h1>
            <section className="mb-5">
                <div className="row">
                    <div className="col-md-6 order-md-2">
                        <h2>Get in Touch</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora amet dolorem asperiores voluptatem nobis sapiente reprehenderit sit porro? Similique, quo. Amet unde ut omnis. Eveniet quisquam architecto iusto a eum?.
                        </p>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" placeholder="Your Name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input type="email" className="form-control" id="email" placeholder="Your Email" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea className="form-control" id="message" rows="4" placeholder="Your Message"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Send Message</button>
                        </form>
                    </div>
                    <div className="col-md-6 order-md-1">
                        <img src={contact} className="img-fluid rounded" alt="Contact Us" />
                    </div>
                </div>
            </section>
        </div>
        </>
    );
}

export default Contact;