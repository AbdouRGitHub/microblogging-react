import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function formatShortDate(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    // ⏱️ Moins d'1h → "Xm"
    if (diffMinutes < 60) {
        return `${diffMinutes}m`;
    }

    // ⏱️ Moins d'un jour → "Xh"
    if (diffHours < 24) {
        return `${diffHours}h`;
    }

    // 🗓️ Même année → jour + mois abrégé
    if (date.getFullYear() === now.getFullYear()) {
        return format(date, "d MMM", { locale: fr });
    }

    // 🗓️ Année différente → date complète
    return format(date, "d MMMM yyyy", { locale: fr });
}
