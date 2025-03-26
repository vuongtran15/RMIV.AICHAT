// Format timestamp
export const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Convert new line characters to <br> elements
export const formatMessageWithLineBreaks = (text) => {
    return text.split('\n').map((line, i) => (
        <span key={i}>
            {line}
            {i < text.split('\n').length - 1 && <br />}
        </span>
    ));
};
