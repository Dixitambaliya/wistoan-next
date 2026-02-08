import { MetadataRoute } from "next";
import { WATCHES } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://wistoanwatches.com";

    /*
     ✅ STATIC ROUTES
     add ANY page path here once and forget
    */
    const staticPaths = [
        "",
        "/collection",
        "/bespoke",
        "/contactus",
        "/about",
    ];

    const staticRoutes = staticPaths.map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: path === "" ? 1 : 0.7,
    }));


    /*
     ✅ DYNAMIC WATCH ROUTES
     auto builds from your WATCHES data
    */
    const watchRoutes = WATCHES.map((watch) => ({
        url: `${baseUrl}/watch/${watch.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));


    return [...staticRoutes, ...watchRoutes];
}
