document.addEventListener("DOMContentLoaded", () => {
    const toggles = document.querySelectorAll(".layer-toggle");
    if (!toggles.length) {
        return;
    }

    toggles.forEach((toggle) => {
        const layerName = toggle.dataset.layerToggle;
        const layer = document.querySelector(`[data-layer="${layerName}"]`);
        if (!layer) {
            return;
        }

        const updateLayerVisibility = () => {
            layer.classList.toggle("layer-hidden", !toggle.checked);
        };

        updateLayerVisibility();
        toggle.addEventListener("change", updateLayerVisibility);
    });
});
