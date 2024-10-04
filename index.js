const blurButton = document.getElementById('check');
const contentDiv = document.querySelector('.background-image');
const topel = document.querySelector('.top');
const bg2 = document.querySelector('.extra')

window.addEventListener('scroll', () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;

    if (window.scrollY > 30) {
        topel.classList.add("top-scrolled");
    } else if (window.scrollY <= 30) {
        topel.classList.remove("top-scrolled");
    } if (Math.round(scrolled) === scrollable) {
        topel.classList.add("top-bottom")
        console.log("hey")
    } else {
        topel.classList.remove('top-bottom')
    }

    console.log(topel)
});

blurButton.addEventListener('click', function() {
    contentDiv.classList.toggle('blur');
    bg2.classList.toggle('blur');
});
