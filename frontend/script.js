const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://127.0.0.1:5000"
        : "https://ai-code-intelligence-qqjc.onrender.com";

const fileInput = document.getElementById("fileInput");
const browseButton = document.getElementById("browseButton");
const dropZone = document.getElementById("dropZone");
const selectedFile = document.getElementById("selectedFile");
const analyzeButton = document.getElementById("analyzeButton");
const result = document.getElementById("result");
const loading = document.getElementById("loading");
const filename = document.getElementById("filename");
const probability = document.getElementById("probability");
const probabilityFill = document.getElementById("probability-fill");
const prediction = document.getElementById("prediction");
const metricsContainer = document.getElementById("metrics");

const complexityHealth = document.getElementById("complexityHealth");
const complexityFill = document.getElementById("complexityFill");
const sizeHealth = document.getElementById("sizeHealth");
const sizeFill = document.getElementById("sizeFill");
const couplingHealth = document.getElementById("couplingHealth");
const couplingFill = document.getElementById("couplingFill");
const nestingHealth = document.getElementById("nestingHealth");
const nestingFill = document.getElementById("nestingFill");

function isValidFile(file) {
    if (!file) {
        return false;
    }

    const extension = file.name
        .split(".")
        .pop()
        .toLowerCase();

    return ["cpp", "cc", "cxx"].includes(extension);
}

function setSelectedFile(file) {
    if (!isValidFile(file)) {
        alert("Please select a C++ file (.cpp, .cc, or .cxx).");
        fileInput.value = "";
        selectedFile.textContent = "No file selected";
        return;
    }

    selectedFile.textContent = `Selected: ${file.name}`;
}

browseButton.addEventListener("click", (event) => {
    event.stopPropagation();
    fileInput.click();
});

dropZone.addEventListener("click", (event) => {
    if (
        event.target === browseButton ||
        event.target === analyzeButton ||
        event.target === fileInput
    ) {
        return;
    }

    fileInput.click();
});

fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    setSelectedFile(file);
});

dropZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    dropZone.classList.add("drag-over");
});

dropZone.addEventListener("dragleave", (event) => {
    if (!dropZone.contains(event.relatedTarget)) {
        dropZone.classList.remove("drag-over");
    }
});

dropZone.addEventListener("drop", (event) => {
    event.preventDefault();

    dropZone.classList.remove("drag-over");

    const file = event.dataTransfer.files[0];

    if (!isValidFile(file)) {
        alert("Please drop a C++ file (.cpp, .cc, or .cxx).");
        return;
    }

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    fileInput.files = dataTransfer.files;

    setSelectedFile(file);
});

function setHealth(label, fill, score) {
    const health = Math.max(
        0,
        Math.round(100 - score)
    );

    label.textContent = `${health}%`;
    fill.style.width = `${health}%`;
}

function calculateHealth(metrics) {
    const complexityScore = Math.min(
        (
            Number(metrics.wmc) +
            Number(metrics.loopQty) +
            Number(metrics.comparisonsQty)
        ) * 2,
        100
    );

    const sizeScore = Math.min(
        Number(metrics.loc) / 10,
        100
    );

    const couplingScore = Math.min(
        Number(metrics.cbo) * 2,
        100
    );

    const nestingScore = Math.min(
        Number(metrics.maxNestedBlocks) * 5,
        100
    );

    setHealth(
        complexityHealth,
        complexityFill,
        complexityScore
    );

    setHealth(
        sizeHealth,
        sizeFill,
        sizeScore
    );

    setHealth(
        couplingHealth,
        couplingFill,
        couplingScore
    );

    setHealth(
        nestingHealth,
        nestingFill,
        nestingScore
    );
}

function displayMetrics(metrics) {
    metricsContainer.innerHTML = "";

    for (const [name, value] of Object.entries(metrics)) {
        const metric = document.createElement("div");

        metric.className = "metric";

        const percentage = Math.min(
            Math.max(Number(value), 0),
            100
        );

        metric.innerHTML = `
            <div class="metric-header">
                <span>${name}</span>
                <strong>${value}</strong>
            </div>

            <div class="bar">
                <div
                    class="bar-fill"
                    style="width: ${percentage}%"
                ></div>
            </div>
        `;

        metricsContainer.appendChild(metric);
    }
}

analyzeButton.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select or drop a C++ file first.");
        return;
    }

    if (!isValidFile(file)) {
        alert("Please select a C++ file (.cpp, .cc, or .cxx).");
        return;
    }

    const formData = new FormData();

    formData.append("file", file);

    result.style.display = "none";
    loading.style.display = "block";
    analyzeButton.disabled = true;

    try {
        const response = await fetch(
            `${API_URL}/analyze`,
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok) {
            alert(data.error || "Analysis failed.");
            return;
        }

        filename.textContent = data.filename;

        probability.textContent =
            `${data.probability}%`;

        probabilityFill.style.width =
            `${data.probability}%`;

        prediction.textContent =
            data.prediction;

        prediction.className =
            data.prediction === "DEFECTIVE"
                ? "value defective"
                : "value non-defective";

        displayMetrics(data.metrics);

        calculateHealth(data.metrics);

        result.style.display = "block";

    } catch (error) {
        console.error(error);
        alert("Could not connect to the backend.");
    } finally {
        loading.style.display = "none";
        analyzeButton.disabled = false;
    }
});
