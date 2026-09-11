const chars = SplitText.create("p", {
    type: "chars",
    charsClass: "char",
}).chars;

chars.forEach((char) => (char.dataset.content = char.innerHTML));

document.querySelector(".text").onpointermove = (e) => {
    chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;
        const distance = Math.sqrt(x * x + y * y);

        if (distance < 100) {
            gsap.to(char, {
                overwrite: true,
                duration: 1 - distance / 100,
                scrambleText: {
                    text: char.dataset.content,
                    chars: ".:",
                    speed: 0.5,
                },
                onStart: () => {
                    char.classList.add("scrambling");
                },
                onComplete: () => {
                    char.classList.remove("scrambling");
                },
            });
        }
    });
};
