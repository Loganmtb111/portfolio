// Gestion du flux RSS pour les actualités VR

document.addEventListener("DOMContentLoaded", function () {
    // Liste de plusieurs flux RSS
    const RSS_URLS = [
        "https://blog.laval-virtual.com/feed/",
        "https://www.realite-virtuelle.com/rss",
        "https://realitevirtuelle.com/feed/"
    ];

    const actusContainer = document.getElementById("Actus_Container");
    const rssInfo = document.getElementById("RSS_Info");

    // Mots-clés à filtrer (contenu adulte)
    const bannedKeywords = ["porno", "porn", "18+", "adulte", "xxx", "nsfw", "sexy", "hot", "sex"];

    // Extraire une image depuis le contenu HTML
    function extractImageFromHTML(html) {
        if (!html) return "";
        const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
        return match ? match[1] : "";
    }

    // Fonction pour récupérer et afficher les flux RSS
    async function fetchRSS() {
        console.log("Tentative de chargement des flux RSS...");
        try {
            const proxyUrl = "https://api.rss2json.com/v1/api.json?rss_url=";

            // Récupérer tous les flux en parallèle
            const promises = RSS_URLS.map(url =>
                fetch(proxyUrl + encodeURIComponent(url))
                    .then(res => res.json())
                    .catch(err => {
                        console.error(`Erreur pour ${url}:`, err);
                        return { items: [] };
                    })
            );

            const results = await Promise.all(promises);
            console.log("Résultats des flux:", results);

            // Combiner tous les articles
            let allItems = [];
            results.forEach(data => {
                if (data.items && data.items.length > 0) {
                    allItems = allItems.concat(data.items);
                }
            });

            console.log("Nombre total d'articles:", allItems.length);

            if (allItems.length === 0) {
                throw new Error("Aucun article trouvé dans les flux RSS");
            }

            // Filtrer le contenu adulte uniquement
            const filteredItems = allItems.filter(item => {
                const title = (item.title || "").toLowerCase();
                const containsBannedWord = bannedKeywords.some(keyword => title.includes(keyword));
                return !containsBannedWord;
            });

            console.log("Nombre d'articles après filtrage:", filteredItems.length);

            if (filteredItems.length === 0) {
                throw new Error("Aucun article trouvé après filtrage");
            }

            // Trier par date (plus récent en premier)
            filteredItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

            // Vider le conteneur
            actusContainer.innerHTML = "";

            // Afficher les 4 premiers articles
            const maxItems = Math.min(filteredItems.length, 4);

            for (let i = 0; i < maxItems; i++) {
                const item = filteredItems[i];
                const title = item.title || "Titre non disponible";
                const link = item.link || "#";
                const pubDate = item.pubDate || "";

                // Chercher une image : thumbnail, enclosure, ou dans le contenu HTML
                const thumbnail = item.thumbnail
                    || item.enclosure?.link
                    || extractImageFromHTML(item.content)
                    || extractImageFromHTML(item.description)
                    || "";

                // Formater la date
                let formattedDate = "Date inconnue";
                if (pubDate) {
                    const date = new Date(pubDate);
                    formattedDate = date.toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                    });
                }

                // Créer l'élément HTML
                const actuItem = document.createElement("div");
                actuItem.className = "Actu_Item";

                // Afficher avec ou sans image
                const imageHTML = thumbnail
                    ? `<img src="${thumbnail}" alt="${title}" class="Actu_Image">`
                    : `<div class="Actu_Image_Placeholder"><span>VR</span></div>`;

                actuItem.innerHTML = `
                    <a href="${link}" target="_blank" rel="noopener noreferrer" class="Actu_Link">
                        ${imageHTML}
                        <div class="Actu_Content">
                            <p class="Actu_Title">${title}</p>
                            <p class="Actu_Date">${formattedDate}</p>
                        </div>
                    </a>
                `;

                actusContainer.appendChild(actuItem);
            }

            // Mettre à jour le message d'info
            rssInfo.textContent = "Actualités en temps réel - VR & Technologies";
            rssInfo.style.color = "rgba(255, 255, 255, 0.5)";
            console.log("Flux RSS chargés avec succès!");

        } catch (error) {
            console.error("Erreur détaillée lors du chargement du flux RSS:", error);
            rssInfo.textContent = "Impossible de charger les actualités pour le moment";
            rssInfo.style.color = "rgba(255, 100, 100, 0.7)";

            // Garder les exemples par défaut si le RSS échoue
            console.log("Affichage des exemples par défaut");
        }
    }

    // Charger le RSS au chargement de la page
    fetchRSS();

    // Rafraîchir toutes les 5 minutes
    setInterval(fetchRSS, 5 * 60 * 1000);
});
