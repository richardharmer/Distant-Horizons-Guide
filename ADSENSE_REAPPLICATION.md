# AdSense reapplication checklist

The repository now uses the AdSense account meta tag and `ads.txt` for ownership evidence. The Auto ads script is intentionally not loaded while the site is being remediated.

Before requesting another review:

1. In AdSense, open **Privacy & messaging** and publish a Google-certified European regulations message for the EEA, UK, and Switzerland.
2. Confirm the message uses the current IAB TCF version and includes Google as a disclosed vendor.
3. In **Sites**, confirm `distanthorizonsguide.com` is verified by the meta tag or `ads.txt`.
4. Keep Auto ads disabled until the reduced sitemap and rewritten pages have been recrawled.
5. When ads are enabled, exclude:
   - `/privacy`
   - `/terms`
   - `/contact`
   - every page marked `noindex`
6. Test mobile and desktop placements. Ads must not cover navigation, settings controls, download links, or the consent panel.
7. Never click live ads during testing. Use Google-provided preview and diagnostic tools.

After deployment:

1. Submit the new sitemap in Search Console.
2. Check the Cloudflare Pages redirect report for the install and guide consolidation rules.
3. Configure `www` at Cloudflare. Pages `_redirects` cannot send hostname rules, and the current `www` setup is broken:
   - `http://www.distanthorizonsguide.com/robots.txt` currently returns Cloudflare **522**.
   - `https://www.distanthorizonsguide.com` currently 301s to `https://distanthorizonsguide.app`, which does not resolve.
   - Add `www` as a custom domain on the **same** Pages project as the apex, or a proxied CNAME to the Pages target.
   - Create a Bulk Redirect from `http://www.distanthorizonsguide.com` and `https://www.distanthorizonsguide.com` to `https://distanthorizonsguide.com` (not `.app`).
   - Use status `301`, subpath matching, preserve path suffix, and preserve query string.
   - Confirm `https://www.distanthorizonsguide.com/robots.txt` 301s to `https://distanthorizonsguide.com/robots.txt` and that the apex file returns `200`.
4. Inspect the homepage, retained guide URLs, retained shader URLs, and install overview pages.
5. Wait until Google has recrawled the material changes before requesting review.
