document.addEventListener("DOMContentLoaded", () => {
    fetch("events.csv")
        .then(resp => resp.text())
        .then(text => {
            const data = parseCSV(text);
            scatterValues(data);
        })
        .catch(err => {
            console.error(err);
            document.body.innerHTML += "<p>Failed to fetch/parse CSV.</p>";
        });
});


// ---- Parse CSV (supports quoted fields) ----
function parseCSV(text) {
    const rows = text.trim().split("\n");
    const headers = rows.shift().split(",").map(h => h.trim());

    return rows.map(row => {
        const cols = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g)
                        .map(c => c.replace(/^"|"$/g, "").trim());
        let obj = {};
        headers.forEach((h, i) => obj[h] = cols[i]);
        return obj;
    });
}


// ---- Scatter values randomly around the page ----
function scatterValues(data) {
    const container = document.getElementById("container");
    const width = window.innerWidth - 100;
    const height = window.innerHeight - 100;

    data.forEach(row => {

        // ---- DEATHS ----
        const d = row["Deaths"];
        if (d !== "" && !isNaN(d)) {
            let div = document.createElement("div");
            div.className = "death";
            div.textContent = d;

            div.dataset.eventName = row["Name"];
            div.dataset.type = "death";   // <-- ADD TYPE

            div.style.left = Math.random() * width + "px";
            div.style.top = Math.random() * height + "px";

            div.addEventListener("click", () => {
                showPopup(div.dataset.type, div.dataset.eventName);
            });

            container.appendChild(div);
        }

        // ---- COST ----
        const cost = row[" Cost"] || row["Cost"] || "";
        if (cost.trim() !== "") {
            let div = document.createElement("div");
            div.className = "cost";
            div.textContent = cost;

            div.dataset.eventName = row["Name"];
            div.dataset.type = "cost";   // <-- ADD TYPE

            div.style.left = Math.random() * width + "px";
            div.style.top = Math.random() * height + "px";

            div.addEventListener("click", () => {
                showPopup(div.dataset.type, div.dataset.eventName);
            });

            container.appendChild(div);
        }
    });
}


// ---- Custom popup ----
function showPopup(type, eventName) {
    const popup = document.getElementById("popup");
    const content = document.getElementById("popup-content");

    let msg = "";

    if (type === "death") {
        msg = `Deaths from ${eventName}`;
    } else if (type === "cost") {
        msg = `The estimated cost of ${eventName}`;
    } else {
        msg = eventName;
    }

    content.textContent = msg;
    popup.classList.remove("hidden");

    popup.onclick = () => popup.classList.add("hidden");
}
