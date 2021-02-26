const initializeRoistat = async () => {
    if (process.client) {
        window.onload = () => {
            setTimeout(() => {
                (function (w, d, s, h, id) {
                    // @ts-ignore
                    w.roistatProjectId = id;
                    // @ts-ignore
                    w.roistatHost = h;
                    const p = d.location.protocol == "https:" ? "https://" : "http://";
                    const u = /^.*roistat_visit=[^;]+(.*)?$/.test(d.cookie)
                        ? "/dist/module.js"
                        : "/api/site/1.0/" + id + "/init?referrer=" + encodeURIComponent(d.location.href);
                    const js = d.createElement(s);
                    // @ts-ignore
                    js.charset = "UTF-8";
                    // @ts-ignore
                    js.async = 1;
                    // @ts-ignore
                    js.src = p + h + u;
                    const js2 = d.getElementsByTagName(s)[0];
                    // @ts-ignore
                    js2.parentNode.insertBefore(js, js2);
                })(window, document, "script", "cloud.roistat.com", "0d4fce718e72a70bd1d26b32b8251f51");

                // https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css
            }, 1000);
        };
    }
};
export default initializeRoistat;
