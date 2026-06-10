document.addEventListener("DOMContentLoaded", function () {
  const statusState = document.querySelector(".status-state");
  const statusHint = document.querySelector(".status-hint");
  const statusBadge = document.querySelector(".status-badge");
  const controlButtons = document.querySelectorAll(".status-controls button, .hero-actions button[data-state]");
  const tabs = document.querySelectorAll(".presentation-tab");
  const panels = document.querySelectorAll(".presentation-panel");

  const states = {
    idle: {
      label: "Idle",
      hint: "Ready for the next flow job.",
      badgeClass: "status-idle",
    },
    running: {
      label: "Running",
      hint: "The job is executing and the folder monitor is watching for output.",
      badgeClass: "status-running",
    },
    success: {
      label: "Success",
      hint: "Data export completed cleanly and the system is ready for the next sample.",
      badgeClass: "status-success",
    },
    failure: {
      label: "Failure",
      hint: "A problem was detected. In a real lab this would trigger a safe recovery path.",
      badgeClass: "status-failure",
    },
  };

  function setState(stateKey) {
    const state = states[stateKey] || states.idle;
    statusState.textContent = state.label;
    statusHint.textContent = state.hint;
    statusBadge.textContent = state.label;
    statusBadge.className = `status-badge ${state.badgeClass}`;

    controlButtons.forEach((button) => {
      const target = button.dataset.state;
      button.classList.toggle("active", target === stateKey);
    });
  }

  function activatePanel(panelId) {
    tabs.forEach((tab) => {
      const active = tab.dataset.panel === panelId;
      tab.classList.toggle("active", active);
    });
    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.id === panelId);
    });
  }

  controlButtons.forEach((button) => {
    button.addEventListener("click", function () {
      setState(this.dataset.state);
    });
  });

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      activatePanel(this.dataset.panel);
    });
  });

  setState("idle");
  activatePanel("workflow");
});
