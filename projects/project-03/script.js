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


// ---- Scatter values randomly around the page (NOW CLICKABLE) ----
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

            // Store event name
            div.dataset.eventName = row["Name"];

            // Random position
            div.style.left = Math.random() * width + "px";
            div.style.top = Math.random() * height + "px";

            // Click reveals event name
            div.addEventListener("click", () => {
                alert(div.dataset.eventName);
            });

            container.appendChild(div);
        }

        // ---- COST ----
        const cost = row[" Cost"] || row["Cost"] || "";
        if (cost.trim() !== "") {
            let div = document.createElement("div");
            div.className = "cost";
            div.textContent = cost;

            // Store event name
            div.dataset.eventName = row["Name"];

            // Random position
            div.style.left = Math.random() * width + "px";
            div.style.top = Math.random() * height + "px";

            // Click reveals event name
            div.addEventListener("click", () => {
                alert(div.dataset.eventName);
            });

            container.appendChild(div);
        }
    });
}
