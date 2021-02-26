import SeoMeta from "@/models/ekoset/SeoMeta";
import { AppConfig } from "@/AppConfig";

export default class MetaTagsBuilder {
    public static head(seoMeta: SeoMeta, pageRelativePath?: string) {
        return {
            title: seoMeta.seoTitle,
            description: seoMeta.seoDescription,
            keywords: seoMeta.seoKeywords,
            meta: [
                {
                    hid: "og:url",
                    property: "og:url",
                    content: AppConfig.endPoint.replace("/api/2_0", "") + pageRelativePath,
                },
                {
                    hid: "og:type",
                    property: "og:type",
                    content: "website",
                },
                {
                    hid: "og:title",
                    property: "og:title",
                    content: seoMeta.seoTitle,
                },
                {
                    hid: "og:description",
                    property: "og:description",
                    content: seoMeta.seoDescription,
                },
                {
                    hid: "og:image",
                    property: "og:image",
                    content: AppConfig.endPoint.replace("/api/2_0", "") + seoMeta.seoImage,
                },
                {
                    hid: "description",
                    name: "description",
                    content: seoMeta.seoDescription,
                },
                {
                    hid: "Keywords",
                    name: "Keywords",
                    keywords: seoMeta.seoKeywords,
                },
            ],
        };
    }
}
