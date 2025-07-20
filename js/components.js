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
    target: { type: "selector" },
    offset: { type: "vec3", default: { x: 0, y: 3, z: 0 } },
  },
  tick: function () {
    const targetEl = this.data.target; 
    if (!targetEl) {
      return; 
    }
    const targetPos = targetEl.object3D.position;
    this.el.object3D.position.set(
      targetPos.x + this.data.offset.x,
      targetPos.y + this.data.offset.y,
      targetPos.z + this.data.offset.z
    );
  },
});

AFRAME.registerComponent("statue-popup-listener", {
  schema: {
    popupSelector: { type: "selector", default: "#statue-text-popup" },
    message: { type: "string", default: "Bonjour !" },
  },
  init: function () {
    this.popupEl = this.data.popupSelector;
    this.el.addEventListener("click", this.onClick.bind(this));
    this.popupEl.setAttribute("visible", false);
    if (!this.popupEl.components['follow-guide']) {
        this.popupEl.setAttribute("follow-guide", { target: null, offset: { x: 0, y: 3, z: 0 } });
    }
  },

  onClick: function () {
    clearTimeout(this.hideTimeout); 
    const currentFollowTarget = this.popupEl.getAttribute('follow-guide').target;
    if (this.popupEl.getAttribute("visible") && currentFollowTarget && currentFollowTarget.id === this.el.id) {
        this.popupEl.setAttribute("visible", false);
    } else {
        this.popupEl.setAttribute("follow-guide", { target: this.el, offset: { x: 0, y: 3, z: 0 } });
        this.popupEl.setAttribute("text", {
            value: this.data.message,
            width: 2.5,
            wrapCount: 25,
            align: "center",
            color: "black",
        });
        this.popupEl.setAttribute("visible", true);
        this.hideTimeout = setTimeout(() => {
            this.popupEl.setAttribute("visible", false);
        }, 5000); 
    }
  }
});
