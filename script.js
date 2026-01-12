document.addEventListener("DOMContentLoaded", function () {
    let overlay = document.querySelector(".page-overlay");
    let scene = document.getElementById("Container");
    let videoBg = document.getElementById("background_video");
    let body = document.body;

    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;
    let zoom = 1.2;

    setTimeout(() => {
        overlay.classList.add("hidden");
    }, 300);

    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let href = this.href;
            overlay.classList.remove("hidden");

            setTimeout(() => {
                overlay.classList.add("transition-active");
            }, 10);

            setTimeout(() => {
                window.location.href = href;
            }, 800);
        });
    });

    document.addEventListener("mousemove", (event) => {
        targetX = -(event.clientX / window.innerWidth - 0.5) * 2;
        targetY = -(event.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        currentX += (targetX - currentX) * 0.1;
        currentY += (targetY - currentY) * 0.1;

        let moveX = currentX * 50;
        let moveY = currentY * 30;

        videoBg.style.transform = `
            translate(${moveX}px, ${moveY}px) 
            scale(${zoom})
        `;

        scene.style.transform = `
            rotateY(${currentX * 6}deg) 
            rotateX(${-currentY * 4}deg) 
            translateX(${-currentX * 14}px) 
            translateY(${-currentY * 10}px)
        `;
        requestAnimationFrame(animate);
    }
    animate();
});


