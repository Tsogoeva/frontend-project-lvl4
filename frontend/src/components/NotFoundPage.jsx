import React from "react";
import picture from "../assets/notFoundPicture.svg";

const NotFoundPage = () => {
    return (
        <div className="text-center">
            <img alt={'NotFound'} className="img-fluid h-25" src={picture} />
            <h1 className="h4 text-muted">
                {'NOT FOUND. Header'}
            </h1>
            <p className="text-muted">
                {'Not found. Message'}
                <a href="/">{'Not found. Link'}</a>
            </p>
        </div>
    );
};

export default NotFoundPage;