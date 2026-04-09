export function timeAgo(iso: string): string {
    const now = new Date();
    const past = new Date(iso);
    const diff = Math.floor((now.getTime() - past.getTime()) / 1000); //seconds

    if (diff < 60) return "just now";
    if (diff < 3600) {
        const mins = Math.floor(diff / 60);
        return `${mins} minute${mins === 1 ? "" : "s"} ago`;
    }

    if (diff < 86400) {
        const hours = Math.floor(diff / 3600);
        return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    }

    if (diff < 604800) {
        const days = Math.floor(diff / 86400);
        return `${days} day${days === 1 ? "" : "s"} ago`;
    }

    //fall back to formatted date if older than a week
    return new Date(iso).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}