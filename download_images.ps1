# Download real images from scarreefresort.com
$imageDir = "public/images"

$images = @(
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/06/sr_house.jpg"; Name = "resort-overview.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/06/sr_food.jpg"; Name = "restaurant-food.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/06/sr_activities.jpg"; Name = "activities-overview.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/07/sr_accom_doubler.jpg"; Name = "villa-double-twin.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_accommodation_family-villa.jpg"; Name = "villa-scar-reef.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_accommodation_beach-house.jpg"; Name = "villa-beach-house.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/04/sr_map.jpg"; Name = "location-map.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/06/sr_restaurant_1.jpg"; Name = "restaurant-1.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/06/sr_restaurant_2.jpg"; Name = "restaurant-2.jpg" },
    # Gallery images
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_01.jpg"; Name = "gallery/gallery-01.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_02.jpg"; Name = "gallery/gallery-02.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_03.jpg"; Name = "gallery/gallery-03.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_04.jpg"; Name = "gallery/gallery-04.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_05.jpg"; Name = "gallery/gallery-05.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_06.jpg"; Name = "gallery/gallery-06.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_07.jpg"; Name = "gallery/gallery-07.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_08.jpg"; Name = "gallery/gallery-08.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_09.jpg"; Name = "gallery/gallery-09.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_10.jpg"; Name = "gallery/gallery-10.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_11.jpg"; Name = "gallery/gallery-11.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_12.jpg"; Name = "gallery/gallery-12.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_13.jpg"; Name = "gallery/gallery-13.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_14.jpg"; Name = "gallery/gallery-14.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_15.jpg"; Name = "gallery/gallery-15.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_16.jpg"; Name = "gallery/gallery-16.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_17.jpg"; Name = "gallery/gallery-17.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_18.jpg"; Name = "gallery/gallery-18.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_19.jpg"; Name = "gallery/gallery-19.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_20.jpg"; Name = "gallery/gallery-20.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_21.jpg"; Name = "gallery/gallery-21.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_gallery_23.jpg"; Name = "gallery/gallery-23.jpg" },
    # Accommodation detail images
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2020/01/sr_accom_new-1.jpg"; Name = "rooms/double-twin-1.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2020/01/sr_accom_new-2.jpg"; Name = "rooms/double-twin-2.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2020/01/sr_accom_new-3.jpg"; Name = "rooms/double-twin-3.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2020/01/sr_accom_new-4.jpg"; Name = "rooms/double-twin-4.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_family-villa-7.jpg"; Name = "rooms/villa-1.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_family-villa-8.jpg"; Name = "rooms/villa-2.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_family-villa-9.jpg"; Name = "rooms/villa-3.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_family-villa-10.jpg"; Name = "rooms/villa-4.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_family-villa-11.jpg"; Name = "rooms/villa-5.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_beach-house-1.jpg"; Name = "rooms/beach-house-1.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_beach-house-2.jpg"; Name = "rooms/beach-house-2.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_beach-house-3.jpg"; Name = "rooms/beach-house-3.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_beach-house-4.jpg"; Name = "rooms/beach-house-4.jpg" },
    @{ Url = "https://www.scarreefresort.com/wp-content/uploads/2019/05/sr_beach-house-5.jpg"; Name = "rooms/beach-house-5.jpg" }
)

# Create subdirectories
New-Item -ItemType Directory -Force -Path "$imageDir/gallery" | Out-Null
New-Item -ItemType Directory -Force -Path "$imageDir/rooms" | Out-Null

$total = $images.Count
$count = 0
foreach ($img in $images) {
    $count++
    $dest = "$imageDir/$($img.Name)"
    if (Test-Path $dest) {
        Write-Host "[$count/$total] SKIP (exists): $($img.Name)"
        continue
    }
    Write-Host "[$count/$total] Downloading: $($img.Name)"
    try {
        Invoke-WebRequest -Uri $img.Url -OutFile $dest -TimeoutSec 30
    } catch {
        Write-Host "  FAILED: $($_.Exception.Message)"
    }
}
Write-Host "`nDone! Downloaded images to $imageDir"
