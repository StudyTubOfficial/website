/**
 * Access gate for the notes drive.
 *
 * The site's pages are public so search engines can index them, but the FILES
 * behind them are not. Any link into notes.studytub.workers.dev routes a
 * signed-out visitor to /login first, carrying where they were headed so login
 * can return them to it.
 *
 * Not a security boundary — the drive URL is in the page source and the token
 * lives in localStorage. It is the same strength of gate the rest of the app
 * uses. Anything that must be genuinely private has to be enforced by the drive.
 */
export const DRIVE_HOST = "notes.studytub.workers.dev";

export function isLoggedIn() {
    try {
        return !!localStorage.getItem("token");
    } catch {
        // Private browsing or blocked storage — treat as signed out rather than
        // throwing and leaving every link dead.
        return false;
    }
}

/** True when this href points into the notes drive. */
export function isDriveLink(href) {
    return typeof href === "string" && href.indexOf(DRIVE_HOST) !== -1;
}

/**
 * Where a drive link should actually go for the current visitor.
 * Signed in → the drive. Signed out → login, with a return path.
 */
export function gatedHref(href) {
    if (!isDriveLink(href) || isLoggedIn()) return href;
    return `/login?redirect=${encodeURIComponent(href)}`;
}

/**
 * onClick handler for a drive link. Lets a signed-in click through untouched;
 * otherwise redirects to login. Use alongside gatedHref so the status bar shows
 * the real destination too.
 */
export function handleDriveClick(href) {
    return (event) => {
        if (!isDriveLink(href) || isLoggedIn()) return;
        event.preventDefault();
        window.location.href = `/login?redirect=${encodeURIComponent(href)}`;
    };
}
