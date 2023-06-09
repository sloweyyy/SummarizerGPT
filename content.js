chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer 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");

    var raw = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{
            "role": "system",
            "content": "Tóm tắt văn bản sau bằng tiếng Việt: " + request.text
        }]
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then(response => response.json())
        .then(result => {
            const text = result.choices[0].message.content;

            const dialog = document.createElement('div');
            dialog.innerHTML = text;
            dialog.style.position = 'fixed';
            dialog.style.width = '400px';
            dialog.style.height = '300px';
            dialog.style.top = '50%';
            dialog.style.left = '50%';
            dialog.style.transform = 'translate(-50%, -50%)';
            dialog.style.backgroundColor = 'white';
            dialog.style.padding = '10px';
            dialog.style.boxShadow = '0 0 10px gray';
            dialog.style.zIndex = '9999';
            dialog.style.overflowY = 'auto';

            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = 'Đóng';
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(dialog);
            });
            dialog.appendChild(closeBtn);

            document.body.appendChild(dialog);
        })
        .catch(error => console.log('error', error));
});