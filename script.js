const dropArea = document.getElementById("dropArea");
const imageInput = document.getElementById("imageInput");
const browseBtn = document.getElementById("browseBtn");

const originalPreview =
document.getElementById("originalPreview");

const compressedPreview =
document.getElementById("compressedPreview");

const originalSize =
document.getElementById("originalSize");

const compressedSize =
document.getElementById("compressedSize");

const compressBtn =
document.getElementById("compressBtn");

const downloadBtn =
document.getElementById("downloadBtn");

const qualitySlider =
document.getElementById("quality");

const qualityValue =
document.getElementById("qualityValue");

let selectedFile;

browseBtn.addEventListener("click", () => {
    imageInput.click();
});

qualitySlider.addEventListener("input", () => {
    qualityValue.textContent =
    qualitySlider.value + "%";
});

imageInput.addEventListener("change", (e) => {
    handleFile(e.target.files[0]);
});

dropArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("dragover");
});

dropArea.addEventListener("drop", (e) => {

    e.preventDefault();

    dropArea.classList.remove("dragover");

    const file = e.dataTransfer.files[0];

    handleFile(file);

});

function handleFile(file){

    if(!file) return;

    selectedFile = file;

    const reader = new FileReader();

    reader.onload = function(event){

        originalPreview.src =
        event.target.result;

    };

    reader.readAsDataURL(file);

    originalSize.textContent =
    `Size: ${(file.size/1024).toFixed(2)} KB`;

}

compressBtn.addEventListener("click", () => {

    if(!selectedFile){

        alert("Please upload an image.");

        return;
    }

    const img = new Image();

    img.src =
    URL.createObjectURL(selectedFile);

    img.onload = () => {

        const canvas =
        document.createElement("canvas");

        const ctx =
        canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(
            img,
            0,
            0,
            canvas.width,
            canvas.height
        );

        const quality =
        qualitySlider.value / 100;

        canvas.toBlob(

            (blob) => {

                const compressedURL =
                URL.createObjectURL(blob);

                compressedPreview.src =
                compressedURL;

                compressedSize.textContent =
                `Size: ${(blob.size/1024).toFixed(2)} KB`;

                downloadBtn.href =
                compressedURL;

                downloadBtn.style.display =
                "block";

            },

            "image/jpeg",
            quality

        );

    };

});


const themeToggle =
document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark");

    themeToggle.textContent =
    "☀️ Light Mode";
}

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem(
            "theme",
            "dark"
        );

        themeToggle.textContent =
        "☀️ Light Mode";

    }else{

        localStorage.setItem(
            "theme",
            "light"
        );

        themeToggle.textContent =
        "🌙 Dark Mode";
    }

});