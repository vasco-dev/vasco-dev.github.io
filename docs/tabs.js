const resizeFrame = (frame) => {
    try {
        const documentElement = frame.contentDocument.documentElement;
        const body = frame.contentDocument.body;
        frame.style.height = `${Math.max(documentElement.scrollHeight, body.scrollHeight)}px`;
    } catch {
        frame.removeAttribute("style");
    }
};

document.querySelectorAll(".tabFrame").forEach((frame) => {
    frame.addEventListener("load", () => {
        resizeFrame(frame);

        if ("ResizeObserver" in window) {
            const observer = new ResizeObserver(() => resizeFrame(frame));
            observer.observe(frame.contentDocument.body);
        }
    });
});

document.querySelectorAll('.siteTabs > input[name="portfolio-tabs"]').forEach((tab) => {
    tab.addEventListener("change", () => {
        requestAnimationFrame(() => {
            document.querySelectorAll(".tabFrame").forEach(resizeFrame);
        });
    });
});
