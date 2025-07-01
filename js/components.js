AFRAME.registerComponent('tableau-click-listener', {
  init: function () {
    const el = this.el;

    // Debug : vérifie que le composant est bien initialisé
    console.log("✅ Composant 'tableau-click-listener' initialisé pour :", el);

    el.addEventListener('click', function () {
      const info = el.getAttribute('tableau-info');
      console.log("🖼️ Tableau cliqué ! Infos :", info);

      const guideTextBubble = document.querySelector('#guide-text-bubble');
      const guideTextBubbleOutline = document.querySelector('#guide-text-bubble-outline');

      if (info) {
        // Si le champ est une string, tu peux parser :
        // Format : title: xxx; artist: xxx; description: xxx;
        const parsedInfo = {};
        info.split(';').forEach(part => {
          const [key, value] = part.split(':').map(str => str.trim());
          if (key && value) parsedInfo[key] = value;
        });

        console.log("✅ Infos parsées :", parsedInfo);

        // Modifie le texte de la bulle
        guideTextBubble.setAttribute('text', 'value',
          `${parsedInfo.title}\nArtiste: ${parsedInfo.artist}\n${parsedInfo.description}`
        );

        guideTextBubble.setAttribute('visible', true);
        guideTextBubbleOutline.setAttribute('visible', true);

        console.log("✅ Bulle affichée");

        // Masquer après 5s
        setTimeout(() => {
          guideTextBubble.setAttribute('visible', false);
          guideTextBubbleOutline.setAttribute('visible', false);
          console.log("✅ Bulle cachée");
        }, 5000);
      } else {
        console.warn("⚠️ Pas de données 'tableau-info' sur :", el);
      }
    });
  }
});

// Active le composant pour chaque tableau après chargement DOM
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.interactable').forEach(img => {
    img.setAttribute('tableau-click-listener', '');
    console.log("✅ Composant attaché à :", img);
  });
});
