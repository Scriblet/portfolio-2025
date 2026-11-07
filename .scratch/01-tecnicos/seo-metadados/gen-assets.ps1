# Gera os assets de SEO/marca em public/ (og-cover.png, apple-touch-icon.png, favicon.svg)
# Uso: powershell -ExecutionPolicy Bypass -File .scratch/01-tecnicos/seo-metadados/gen-assets.ps1
Add-Type -AssemblyName System.Drawing

$root = 'C:\Users\lucas\Documents\Github\portfolio-2025'
$public = Join-Path $root 'public'
if (-not (Test-Path $public)) { New-Item -ItemType Directory -Path $public | Out-Null }

$purple = [System.Drawing.ColorTranslator]::FromHtml('#673ab7')
$bgDark = [System.Drawing.ColorTranslator]::FromHtml('#121212')
$white  = [System.Drawing.Color]::White
$muted  = [System.Drawing.ColorTranslator]::FromHtml('#c2c2c2')
$soft   = [System.Drawing.ColorTranslator]::FromHtml('#b39ddb')

function New-SolidBrush([System.Drawing.Color]$color) {
  return [System.Drawing.SolidBrush]::new($color)
}

# ---------------------------------------------------------------- og-cover.png
$w = 1200
$h = 630
$bmp = [System.Drawing.Bitmap]::new($w, $h)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$g.Clear($bgDark)

# Formas decorativas roxas (canto direito)
$halo = New-SolidBrush ([System.Drawing.Color]::FromArgb(46, 103, 58, 183))
$g.FillEllipse($halo, 900, -200, 620, 620)
$g.FillEllipse($halo, 1010, 330, 380, 380)
$ring = [System.Drawing.Pen]::new([System.Drawing.Color]::FromArgb(90, 103, 58, 183), 2)
$g.DrawEllipse($ring, 880, -220, 660, 660)

# Faixa de acento à esquerda
$accentBrush = New-SolidBrush $purple
$g.FillRectangle($accentBrush, 100, 186, 8, 268)

# Overline
$fontOver = [System.Drawing.Font]::new('Segoe UI', [single]22, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$overBrush = New-SolidBrush $soft
$overline = 'PORTF' + [char]0x00D3 + 'LIO'
$g.DrawString($overline, $fontOver, $overBrush, [single]140, [single]186)

# Nome
$fontTitle = [System.Drawing.Font]::new('Segoe UI', [single]96, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$titleBrush = New-SolidBrush $white
$g.DrawString('Lucas Nonato', $fontTitle, $titleBrush, [single]136, [single]236)

# Subtítulo
$fontSub = [System.Drawing.Font]::new('Segoe UI', [single]40, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$subBrush = New-SolidBrush $muted
$subtitle = 'Desenvolvedor Full-Stack ' + [char]0x00B7 + ' UX Designer'
$g.DrawString($subtitle, $fontSub, $subBrush, [single]140, [single]380)

# Rodapé discreto
$fontFoot = [System.Drawing.Font]::new('Segoe UI', [single]22, [System.Drawing.FontStyle]::Regular, [System.Drawing.GraphicsUnit]::Pixel)
$footBrush = New-SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#8a8a8a'))
$g.DrawString('scriblet.github.io/portfolio-2025', $fontFoot, $footBrush, [single]140, [single]508)

$ogPath = Join-Path $public 'og-cover.png'
$bmp.Save($ogPath, [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

# ------------------------------------------------------- apple-touch-icon.png
$icon = [System.Drawing.Bitmap]::new(180, 180)
$ig = [System.Drawing.Graphics]::FromImage($icon)
$ig.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$ig.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$ig.Clear($purple)

$fontIcon = [System.Drawing.Font]::new('Segoe UI', [single]72, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
$iconBrush = New-SolidBrush $white
$format = [System.Drawing.StringFormat]::new()
$format.Alignment = [System.Drawing.StringAlignment]::Center
$format.LineAlignment = [System.Drawing.StringAlignment]::Center
$rect = [System.Drawing.RectangleF]::new(0, 2, 180, 180)
$ig.DrawString('LN', $fontIcon, $iconBrush, $rect, $format)

$iconPath = Join-Path $public 'apple-touch-icon.png'
$icon.Save($iconPath, [System.Drawing.Imaging.ImageFormat]::Png)
$ig.Dispose()
$icon.Dispose()

# ---------------------------------------------------------------- favicon.svg
$svg = @'
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="Lucas Nonato">
  <rect width="64" height="64" rx="14" ry="14" fill="#673ab7"/>
  <text x="32" y="32" fill="#ffffff" font-family="Segoe UI, Arial, sans-serif" font-weight="bold" font-size="30" text-anchor="middle" dominant-baseline="central">LN</text>
</svg>
'@
$svgPath = Join-Path $public 'favicon.svg'
[System.IO.File]::WriteAllText($svgPath, $svg, [System.Text.UTF8Encoding]::new($false))

# ----------------------------------------------------------------- verificação
foreach ($file in @($ogPath, $iconPath, $svgPath)) {
  $item = Get-Item $file
  Write-Output ("{0} -> {1} bytes" -f $item.Name, $item.Length)
}
