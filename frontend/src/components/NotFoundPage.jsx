import React from "react";
//import picture from "../assets/notFoundPicture.svg";

const NotFoundPage = () => {
    return (
        <div className="text-center">
            <img alt="NotFound" height={200} width={200} className="img-fluid h-25" src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg" />
            <h1 className="h4 text-muted">
                NOT FOUND. Header
            </h1>
            <p className="text-muted">
                Not found. Message
                <a href="/">Not found. Link</a>
            </p>
        </div>
    );
};

export default NotFoundPage;