$replacements = @{
    "bg-gradient-to-br from-amber-400 to-orange-500" = "bg-primary"
    "bg-gradient-to-r from-amber-500 to-orange-500" = "bg-primary"
    "hover:from-amber-400 hover:to-orange-400" = "hover:bg-primary/90"
    "shadow-amber-500/25" = "shadow-primary/25"
    "shadow-amber-500/40" = "shadow-primary/40"
    "shadow-amber-500/20" = "shadow-primary/20"
    "shadow-amber-500/30" = "shadow-primary/30"
    "shadow-amber-500/50" = "shadow-primary/50"
    "text-amber-300" = "text-primary"
    "text-amber-400" = "text-primary"
    "text-amber-500" = "text-primary"
    "text-amber-600" = "text-primary"
    "text-amber-700" = "text-primary"
    "bg-amber-50/60" = "bg-primary/5"
    "bg-amber-50" = "bg-primary/5"
    "bg-amber-100" = "bg-primary/10"
    "bg-amber-400" = "bg-primary"
    "bg-amber-500" = "bg-primary"
    "border-amber-200" = "border-primary/20"
    "border-amber-400" = "border-primary/40"
    "border-amber-500" = "border-primary"
    "ring-amber-500" = "ring-primary"
    "fill-amber-400" = "fill-primary"
}

Get-ChildItem -Path "d:\Coding\scarreefresort\scarreefresort\src" -Recurse -Include *.tsx,*.ts | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $original = $content
    foreach ($key in $replacements.Keys) {
        $content = $content.Replace($key, $replacements[$key])
    }
    if ($content -ne $original) {
        Set-Content -Path $_.FullName -Value $content
        Write-Output "Updated $($_.FullName)"
    }
}
