const closers = document.querySelectorAll('#messageCloser')

closers.forEach((element) => {
    element.addEventListener('click', () => {
        messagesCloser()
    })
})