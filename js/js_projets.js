const projetsData = {
    mastermind: {
        titre: "Mastermind",
        image: "../image/img_projet/mastermind.png",
        description: "Jeu de déduction développé en Java où le joueur doit deviner une combinaison secrète de couleurs en un nombre limité d'essais. À chaque tentative, le programme indique le nombre de couleurs bien placées et mal placées. Ce projet m'a permis de pratiquer la logique algorithmique, les structures conditionnelles et la gestion de boucles en Java.",
        tags: ["Code Java", "Logique", "Jeu"]
    },
    mapping: {
        titre: "Mapping",
        image: "../image/img_projet/mapping.png",
        description: "Outil de traitement de données développé en Java permettant d'importer un fichier CSV, d'appliquer des filtres et des tris sur les colonnes, puis d'exporter le résultat. Réalisé en milieu professionnel, ce projet m'a appris à manipuler des fichiers texte, à parser des données structurées et à concevoir des algorithmes de traitement efficaces.",
        tags: ["Code Java", "CSV", "Traitement de données"]
    },
    rftg: {
        titre: "RFTG",
        image: "../image/img_projet/rftg.png",
        description: "Application web de gestion d'un parc de DVD développée avec le framework Laravel. Elle permet la gestion complète des stocks (ajout, modification, suppression). Ce projet m'a initié au développement MVC avec PHP, à l'utilisation de Blade et à la gestion d'une base de données.",
        tags: ["Laravel", "PHP", "MySQL", "MVC"]
    },
    structurall: {
        titre: "StructurallXweb",
        image: "../image/img_projet/structurall.png",
        description: "Application web de schématisation de code développée avec Angular en milieu professionnel pour la R&D. Elle permet de visualiser la structure d'un projet informatique sous forme de graphes et diagrammes interactifs. Ce projet m'a permis de découvrir Angular, le développement front-end en TypeScript et de travailler sur une vraie problématique d'entreprise.",
        tags: ["Angular", "TypeScript", "R&D"]
    },
    mtbeats: {
        titre: "MTBeats",
        image: "../image/img_projet/mtbeat.png",
        description: "Application de génération d'idées de repas développée en Java. L'outil propose des suggestions de restaurants et de plats selon des critères personnalisables (budget, type de cuisine, nombre de personnes). Réalisé dans le cadre d'un projet de groupe, ce projet m'a permis de travailler en équipe, de concevoir une interface graphique et de gérer la coordination entre développeurs.",
        tags: ["Code Java", "Interface graphique", "Projet de groupe"],
        lien: "https://canva.link/4kkotflc0xadbm9"
    },
    cybersecurite: {
        titre: "Certifications Cyber",
        image: "../image/img_projet/cybersecurite.png",
        description: "Obtention de certifications reconnues en cybersécurité. Certifié par l'ANSSI (Agence Nationale de la Sécurité des Systèmes d'Information) sur les bonnes pratiques de sécurité numérique, et par la CNIL (Commission Nationale de l'Informatique et des Libertés) sur la protection des données personnelles. Ces certifications ont renforcé mes connaissances en sécurité informatique et en conformité réglementaire.",
        tags: ["Cybersécurité", "ANSSI", "CNIL", "Certification"]
    },
    mario: {
        titre: "Mario",
        image: "../image/img_projet/img_mario.png",
        description: "L'application Mario Web est développée avec LARAVEL. Elle permet à l'administrateur de gérer les films et les locations via une interface web. Le projet repose sur une architecture MVC et communique avec une API REST pour la gestion des données. Les opérations CRUD (création, lecture, mise à jour, suppression) sont réalisées à travers des requêtes HTTP vers les routes définies pour chaque entité (films, clients, locations, etc.). Cette solution illustre la conception d'une application web professionnelle intégrant la gestion des données et la maintenance évolutive d'un service de location de films.",
        tags: ["Laravel", "PHP", "MySQL"],
        lien: "https://mtb849.sharepoint.com/:w:/r/sites/3-BTSSIOPromo2024-2026/Documents%20partages/Bloc2/Ann%C3%A9e_2/Fiches_projet/LRI/V2/Application_Mario_Web_BTS_SIO_fiche_projet_RFTG_LRI.docx?d=w5e90f9fd7b1c4153ab3b8e57eb950b83&csf=1&web=1&e=aAzLyw"
    },
    luigi: {
        titre: "Luigi",
        image: "../image/img_projet/img_luigi.png",
        description: "L'application Luigi Mobile est développée sous Android Studio dans le cadre du BTS SIO. Elle permet aux utilisateurs de réserver et gérer des DVD via une interface mobile intuitive. Le projet repose sur une architecture MVC et communique avec une API REST pour effectuer les opérations CRUD (création, lecture, mise à jour, suppression). Les échanges de données se font par des requêtes HTTP (GET, DELETE) vers des routes définies pour chaque entité : films, clients, locations, etc. Ce projet illustre la mise en œuvre de principes de modularité et de séparation des responsabilités, essentiels au développement d'applications professionnelles.",
        tags: ["Android Studio", "Java", "Mobile"],
        lien: "https://mtb849.sharepoint.com/:w:/r/sites/3-BTSSIOPromo2024-2026/Documents%20partages/Bloc2/Ann%C3%A9e_2/Fiches_projet/LRI/V2/Application_Luigi_Mobile_BTS_SIO_fiche_projet_RFTG_LRI.docx?d=w832e24c6110d42719e610622a902bd50&csf=1&web=1&e=SffrUa"
    },
    peach: {
        titre: "Peach",
        image: "../image/img_projet/img_peach.png",
        description: "La base de données PEACH est conçue en MySQL. Elle permet de stocker et gérer les informations liées aux films, aux clients et aux locations. Cette base de données sert de point central de communication entre l'application web et l'API REST, assurant la fiabilité et la sécurité des échanges.",
        tags: ["MySQL", "Base de données"]
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("Modal_Projet");
    const modalImageZone = document.getElementById("Modal_Image_Zone");
    const modalTitre = document.getElementById("Modal_Titre");
    const modalDescription = document.getElementById("Modal_Description");
    const modalTags = document.getElementById("Modal_Tags");
    const modalFermer = document.getElementById("Modal_Fermer");

    function ouvrirModal(projetKey) {
        const data = projetsData[projetKey];
        if (!data) return;

        modalImageZone.style.backgroundImage = `url(${data.image})`;
        modalTitre.textContent = data.titre;
        modalDescription.textContent = data.description;

        modalTags.innerHTML = "";
        data.tags.forEach(tag => {
            const btn = document.createElement("button");
            btn.className = "Categorie_Projet";
            btn.textContent = tag;
            modalTags.appendChild(btn);
        });

        const existing = document.getElementById("Modal_Lien");
        if (existing) existing.remove();
        if (data.lien) {
            const lien = document.createElement("a");
            lien.id = "Modal_Lien";
            lien.href = data.lien;
            lien.target = "_blank";
            lien.textContent = "Voir la documentation";
            lien.className = "BTN_Projet";
            document.querySelector(".Modal_Contenu").appendChild(lien);
        }

        modal.classList.add("active");
    }

    function fermerModal() {
        modal.classList.remove("active");
    }

    document.querySelectorAll(".BTN_Detail").forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation();
            ouvrirModal(this.dataset.projet);
        });
    });

    modalFermer.addEventListener("click", fermerModal);

    modal.addEventListener("click", function (e) {
        if (e.target === modal) fermerModal();
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") fermerModal();
    });
});
