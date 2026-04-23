// Gestion des onglets pour la page Veille

document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll('.Tab_Button');
    const tabContents = document.querySelectorAll('.Tab_Content');

    document.getElementById('Content_Container').style.overflowY = 'hidden';

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Récupère l'ID de l'onglet à afficher
            const targetTab = button.getAttribute('data-tab');

            // Retire la classe 'active' de tous les boutons et contenus
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Ajoute la classe 'active' au bouton cliqué et au contenu correspondant
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');

            const contentContainer = document.getElementById('Content_Container');
            contentContainer.style.overflowY = targetTab === 'presentation' ? 'hidden' : 'auto';
        });
    });
});
