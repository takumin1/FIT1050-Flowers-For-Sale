//code inspired by Hyperplexed
const browse = document.querySelector(".browse");
const track = document.getElementById("image-track");

let isDragging = false;


//track when mouse is clicked
browse.addEventListener("mousedown", e => {
    isDragging = true;
    track.dataset.mouseDownAt = e.clientX;
});

//track movement of mouse
browse.addEventListener("mousemove", e => {
    if (!isDragging || track.dataset.mouseDownAt === "0") return;

    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;

    let percentage = (mouseDelta / maxDelta) * -100;
    let nextPercentage = parseFloat(track.dataset.prevPercentage || "0") + percentage;

    nextPercentage = Math.min(nextPercentage, 0);
    nextPercentage = Math.max(nextPercentage, -45);

    track.dataset.percentage = nextPercentage;

    track.animate({
        transform: `translate(${nextPercentage}%, -10%)`
    }, { duration: 1200, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `${nextPercentage + 45}% center`
        }, { duration: 1200, fill: "forwards" });
    }
});

//end the sliding when mouse is up, while keeping the image track in place
browse.addEventListener("mouseup", () => {
    isDragging = false;
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
});

//for when the mouse is dragged outside of .browse
window.addEventListener("mouseup", () => {
    isDragging = false;
    track.dataset.mouseDownAt = "0";
    track.dataset.prevPercentage = track.dataset.percentage;
});
