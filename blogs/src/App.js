import React, { useState, useEffect } from "react";
import Markdown from "markdown-to-jsx";
import "./App.css";

function App() {
    const file_name = "blog.md";
    const [post, setPost] = useState("");

    useEffect(() => {
        import(`./markdown/${file_name}`)
            .then((res) => {
                fetch(res.default)
                    .then((res) => res.text())
                    .then((res) => setPost(res))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }, []); // Empty dependency array to run the effect only once

    const options = {
        overrides: {
            // Define custom components for specific HTML elements or markdown tags
            h1: {
                component: (props) => (
                    <h1 className="custom-h1">{props.children}</h1>
                ),
            },
            p: {
                component: (props) => (
                    <p className="custom-paragraph">{props.children}</p>
                ),
            },
            // Add more overrides for other elements as needed
        },
    };

    return (
        <div className="App">
            <Markdown options={options}>{post}</Markdown>
        </div>
    );
}

export default App;
