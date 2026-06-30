const fs = require('fs');

try {
    let bodyHtml = fs.readFileSync('c:/workspace/mrQuan/Sung/NiceAdmin/web-body.html', 'utf8');
    let seoHtml = fs.readFileSync('c:/workspace/mrQuan/Sung/NiceAdmin/web-seo-setting.html', 'utf8');

    let headerAsideRegex = /<!-- ======= Header ======= -->[\s\S]*?<\/aside>/;
    let headerAsideMatch = bodyHtml.match(headerAsideRegex);

    if (headerAsideMatch) {
        let headerAsideBlock = headerAsideMatch[0];

        // Replace active state of web-body
        headerAsideBlock = headerAsideBlock.replace(
            /<a class="nav-link active" href="web-body\.html">/,
            '<a class="nav-link collapsed" href="web-body.html">'
        );

        // Remove active state of any other nav items just in case (though we know we just removed web-body)

        // Set SEO as active
        // Let's find: <li class="nav-item"><a class="nav-link collapsed" href="#"><i class="bi bi-search"></i><span>Quản lý SEO</span></a></li>
        // Note: There's a newline between "Quản lý" and "SEO" in some formatting, so we gotta be robust.
        headerAsideBlock = headerAsideBlock.replace(
            /<a class="nav-link collapsed" data-bs-target="#[a-z\-]+" data-bs-toggle="collapse" href="#">\s*<i class="bi bi-search"><\/i><span>Quản lý\s*SEO<\/span>[\s\S]*?<\/a>/i,
            function (match) { return match; } // actually SEO doesn't have collapse in our html? Let's check exactly how it is in web-body
        );

        // Let's just match the Quản lý SEO span
        headerAsideBlock = headerAsideBlock.replace(
            /<a class="nav-link collapsed" href="#">\s*<i class="bi bi-search"><\/i><span>Quản lý\s*SEO<\/span><\/a>/g,
            '<a class="nav-link active" href="web-seo-setting.html"><i class="bi bi-search"></i><span>Quản lý SEO</span></a>'
        );

        // Let's also enforce if it had newlines:
        headerAsideBlock = headerAsideBlock.replace(
            /<a class="nav-link collapsed" href="#">\s*<i class="bi bi-search"><\/i><span>Quản lý\r?\n\s*SEO<\/span><\/a>/g,
            '<a class="nav-link active" href="web-seo-setting.html"><i class="bi bi-search"></i><span>Quản lý SEO</span></a>'
        );

        seoHtml = seoHtml.replace(headerAsideRegex, headerAsideBlock);
        fs.writeFileSync('c:/workspace/mrQuan/Sung/NiceAdmin/web-seo-setting.html', seoHtml);
        console.log("SYNC SUCCESS");
    } else {
        console.log("NOT FOUND IN BODY HTML");
    }
} catch (e) {
    console.error(e);
}
