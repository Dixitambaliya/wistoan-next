import { WATCHES } from "@/lib/data";
import { notFound } from "next/navigation";

export default function CollectionPage({ params }: { params: { model: string } }) {
    const modelSlug = params.model;

    const watch = WATCHES.find(
        w => w.name.toLowerCase().replace(/\s+/g, "-") === modelSlug
    );

    if (!watch) return notFound();

    return (
        <div>{watch.name}</div>
    );
}
