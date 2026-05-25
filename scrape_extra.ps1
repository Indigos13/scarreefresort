# Scrape the missing pages with corrected URLs
$outputFile = "scraped_content_extra.txt"
"" | Out-File -FilePath $outputFile -Encoding utf8

$pages = @(
    @{ Name = "ACCOMMODATION (corrected)"; Url = "https://www.scarreefresort.com/accommodation/" },
    @{ Name = "BOOKING"; Url = "https://www.scarreefresort.com/booking/" },
    @{ Name = "HB ACCOMMODATION - SCAR REEF VILLA"; Url = "https://www.scarreefresort.com/hb_accommodation/scar-reef-villa/" },
    @{ Name = "HB ACCOMMODATION - BEACH HOUSE"; Url = "https://www.scarreefresort.com/hb_accommodation/beach-house/" },
    @{ Name = "DOUBLE AND TWIN - TRY 2"; Url = "https://www.scarreefresort.com/hb_accommodation/double-and-twin-rooms/" },
    @{ Name = "THE RESORT - TRY 2"; Url = "https://www.scarreefresort.com/resort/" }
)

foreach ($page in $pages) {
    Write-Host "Scraping: $($page.Name) -> $($page.Url)"
    try {
        $response = Invoke-WebRequest -Uri $page.Url -UseBasicParsing -TimeoutSec 15
        $html = $response.Content

        $imgMatches = [regex]::Matches($html, 'src="([^"]*\.(jpg|jpeg|png|webp|svg))"', 'IgnoreCase')
        $images = $imgMatches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique

        $titleMatch = [regex]::Match($html, '<title>([^<]*)</title>', 'IgnoreCase')
        $pageTitle = if ($titleMatch.Success) { $titleMatch.Groups[1].Value } else { "N/A" }

        $text = $html
        $text = $text -replace '<script[^>]*>[\s\S]*?</script>', ''
        $text = $text -replace '<style[^>]*>[\s\S]*?</style>', ''
        $text = $text -replace '<br\s*/?>', "`n"
        $text = $text -replace '</?(h[1-6]|p|div|section|article|li|tr)[^>]*>', "`n"
        $text = $text -replace '<[^>]+>', ' '
        $text = $text -replace '&amp;', '&'; $text = $text -replace '&#8211;', '-'
        $text = $text -replace '&#8220;|&#8221;', '"'; $text = $text -replace '&#8217;', "'"
        $text = $text -replace '&#8230;', '...'; $text = $text -replace '&#038;', '&'
        $text = $text -replace '&nbsp;', ' '
        $text = $text -replace '\n\s*\n\s*\n', "`n`n"
        $text = $text -replace '[ \t]+', ' '
        $text = ($text -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }) -join "`n"

        $output = @"

================================================================================
PAGE: $($page.Name)
URL: $($page.Url)
TITLE: $pageTitle
================================================================================

--- CONTENT ---
$text

--- IMAGES ($($images.Count)) ---
$($images -join "`n")

"@
        $output | Out-File -FilePath $outputFile -Encoding utf8 -Append
        Write-Host "  OK - $($text.Length) chars, $($images.Count) images"
    } catch {
        Write-Host "  FAILED: $($_.Exception.Message)"
        "`n=== PAGE: $($page.Name) - FAILED ===`n" | Out-File -FilePath $outputFile -Encoding utf8 -Append
    }
    Start-Sleep -Milliseconds 500
}
Write-Host "`nDone!"
