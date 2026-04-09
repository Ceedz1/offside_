// import { formatDistanceToNow } from 'date-fns';
export function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
}

// export const formatRelativeTime = (dateString: string) => {
//   const date = new Date(dateString);
//   return formatDistanceToNow(date, { addSuffix: true });
// };
