AFRAME.registerComponent("tableau-click-listener", {
  init: function () {
    const el = this.el;

    el.addEventListener("click", function () {
      const info = el.getAttribute("tableau-info");

      const guideTextBubble = document.querySelector("#guide-text-bubble");

      if (info) {
        const parsedInfo = {};
        info.split(";").forEach((part) => {
          const [key, value] = part.split(":").map((str) => str.trim());
          if (key && value) parsedInfo[key] = value;
        });

        guideTextBubble.setAttribute("text", "value", `${parsedInfo.title}\nArtiste: ${parsedInfo.artist}\n${parsedInfo.description}`);

        guideTextBubble.setAttribute("visible", true);

        setTimeout(() => {
          guideTextBubble.setAttribute("visible", false);
        }, 5000);
      }
    });
  },
});

AFRAME.registerComponent("sol-click-move-guide", {
  init: function () {
    this.el.addEventListener("click", (evt) => {
      const intersection = evt.detail.intersection;
      if (intersection) {
        const guide = document.getElementById("guide");
        guide.setAttribute("position", `${intersection.point.x} 0 ${intersection.point.z}`);
      }
    });
  },
});

AFRAME.registerComponent("follow-guide", {
  schema: {
    offset: { type: "vec3", default: { x: 0, y: 3, z: 0 } },
  },
  tick: function () {
    var guide = document.getElementById("guide");
    if (!guide) return;
    var guidePos = guide.object3D.position;
    this.el.object3D.position.set(guidePos.x + this.data.offset.x, guidePos.y + this.data.offset.y, guidePos.z + this.data.offset.z);
  },
});
