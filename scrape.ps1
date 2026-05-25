# Scar Reef Resort - Full Website Content Scraper
# Scrapes all pages and saves structured content to a single text file

$baseUrl = "https://www.scarreefresort.com"
$outputFile = "scraped_content.txt"

# All known pages from the navigation
$pages = @(
    @{ Name = "HOME"; Url = "/" },
    @{ Name = "THE RESORT"; Url = "/the-resort/" },
    @{ Name = "ACCOMMODATION"; Url = "/accomodation/" },
    @{ Name = "DOUBLE AND TWIN ROOMS"; Url = "/double-and-twin-rooms/" },
    @{ Name = "SCAR REEF VILLA"; Url = "/scar-reef-villa/" },
    @{ Name = "BEACH HOUSE"; Url = "/beach-house/" },
    @{ Name = "RESTAURANT"; Url = "/restaurant/" },
    @{ Name = "EXPERIENCE"; Url = "/experience/" },
    @{ Name = "ACTIVITIES"; Url = "/activities/" },
    @{ Name = "GETTING HERE"; Url = "/getting-here/" },
    @{ Name = "FORECAST"; Url = "/forecast/" },
    @{ Name = "GALLERY"; Url = "/gallery/" },
    @{ Name = "CONTACT AND FAQ"; Url = "/contact/" },
    @{ Name = "PACKAGES"; Url = "/packages/" },
    @{ Name = "BOOK NOW"; Url = "/book-now/" },
    @{ Name = "TERMS AND CONDITIONS"; Url = "/terms-and-conditions/" }
)

# Clear output file
"" | Out-File -FilePath $outputFile -Encoding utf8

foreach ($page in $pages) {
    $url = "$baseUrl$($page.Url)"
    Write-Host "Scraping: $($page.Name) -> $url"

    try {
        $response = Invoke-WebRequest -Uri $url -UseBasicParsing -TimeoutSec 15
        $html = $response.Content

        # Extract all image URLs
        $imgMatches = [regex]::Matches($html, 'src="([^"]*\.(jpg|jpeg|png|webp|svg))"', 'IgnoreCase')
        $images = $imgMatches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique

        # Extract all link URLs (internal)
        $linkMatches = [regex]::Matches($html, 'href="([^"]*scarreefresort[^"]*)"', 'IgnoreCase')
        $links = $linkMatches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique

        # Extract video URLs
        $videoMatches = [regex]::Matches($html, '(https?://[^"''>\s]*\.(mp4|webm|youtube\.com/embed/[^"''>\s]*))', 'IgnoreCase')
        $videos = $videoMatches | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique

        # Extract meta description
        $metaMatch = [regex]::Match($html, '<meta[^>]*name="description"[^>]*content="([^"]*)"', 'IgnoreCase')
        $metaDesc = if ($metaMatch.Success) { $metaMatch.Groups[1].Value } else { "N/A" }

        # Extract page title
        $titleMatch = [regex]::Match($html, '<title>([^<]*)</title>', 'IgnoreCase')
        $pageTitle = if ($titleMatch.Success) { $titleMatch.Groups[1].Value } else { "N/A" }

        # Clean HTML to text
        $text = $html
        $text = $text -replace '<script[^>]*>[\s\S]*?</script>', ''
        $text = $text -replace '<style[^>]*>[\s\S]*?</style>', ''
        $text = $text -replace '<br\s*/?>', "`n"
        $text = $text -replace '</?(h[1-6]|p|div|section|article|li|tr)[^>]*>', "`n"
        $text = $text -replace '<[^>]+>', ' '
        $text = $text -replace '&amp;', '&'
        $text = $text -replace '&lt;', '<'
        $text = $text -replace '&gt;', '>'
        $text = $text -replace '&#8211;', '-'
        $text = $text -replace '&#8220;|&#8221;', '"'
        $text = $text -replace '&#8217;', "'"
        $text = $text -replace '&#8230;', '...'
        $text = $text -replace '&#038;', '&'
        $text = $text -replace '&nbsp;', ' '
        $text = $text -replace '\n\s*\n\s*\n', "`n`n"
        $text = $text -replace '[ \t]+', ' '
        $text = ($text -split "`n" | ForEach-Object { $_.Trim() } | Where-Object { $_ -ne '' }) -join "`n"

        # Write to output
        $output = @"

================================================================================
PAGE: $($page.Name)
URL: $url
TITLE: $pageTitle
META DESCRIPTION: $metaDesc
================================================================================

--- CONTENT ---
$text

--- IMAGES ($($images.Count)) ---
$($images -join "`n")

--- VIDEOS ($($videos.Count)) ---
$($videos -join "`n")

--- INTERNAL LINKS ($($links.Count)) ---
$($links -join "`n")

"@
        $output | Out-File -FilePath $outputFile -Encoding utf8 -Append
        Write-Host "  OK - $($text.Length) chars, $($images.Count) images"

    } catch {
        $errMsg = "  FAILED: $($_.Exception.Message)"
        Write-Host $errMsg
        "`n=== PAGE: $($page.Name) - FAILED: $($_.Exception.Message) ===`n" | Out-File -FilePath $outputFile -Encoding utf8 -Append
    }

    # Be polite to the server
    Start-Sleep -Milliseconds 500
}

Write-Host "`nDone! Content saved to: $outputFile"
Write-Host "File size: $((Get-Item $outputFile).Length / 1KB) KB"
