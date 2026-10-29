Add-Type -AssemblyName System.Drawing

function New-Icon([int]$sz, [string]$path) {
    $bmp = New-Object System.Drawing.Bitmap($sz, $sz)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

    # Background gradient: Emerald to Blue
    $rect = New-Object System.Drawing.Rectangle(0, 0, $sz, $sz)
    $bgBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.Color]::FromArgb(5, 150, 105), [System.Drawing.Color]::FromArgb(2, 132, 199), 45.0)
    
    # Draw rounded rect or fill
    $radius = [int]($sz * 0.22)
    $pathG = New-Object System.Drawing.Drawing2D.GraphicsPath
    $pathG.AddArc(0, 0, $radius*2, $radius*2, 180, 90)
    $pathG.AddArc($sz - $radius*2, 0, $radius*2, $radius*2, 270, 90)
    $pathG.AddArc($sz - $radius*2, $sz - $radius*2, $radius*2, $radius*2, 0, 90)
    $pathG.AddArc(0, $sz - $radius*2, $radius*2, $radius*2, 90, 90)
    $pathG.CloseFigure()
    $g.FillPath($bgBrush, $pathG)

    # Bus body
    $bx = [int]($sz * 0.20)
    $by = [int]($sz * 0.23)
    $bw = [int]($sz * 0.60)
    $bh = [int]($sz * 0.50)
    $bradius = [int]($sz * 0.08)
    $bpath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $bpath.AddArc($bx, $by, $bradius*2, $bradius*2, 180, 90)
    $bpath.AddArc($bx + $bw - $bradius*2, $by, $bradius*2, $bradius*2, 270, 90)
    $bpath.AddArc($bx + $bw - $bradius*2, $by + $bh - $bradius*2, $bradius*2, $bradius*2, 0, 90)
    $bpath.AddArc($bx, $by + $bh - $bradius*2, $bradius*2, $bradius*2, 90, 90)
    $bpath.CloseFigure()
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $g.FillPath($whiteBrush, $bpath)

    # Bus windshield
    $wx = [int]($sz * 0.26)
    $wy = [int]($sz * 0.35)
    $ww = [int]($sz * 0.48)
    $wh = [int]($sz * 0.20)
    $blueBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(2, 132, 199))
    $g.FillRectangle($blueBrush, $wx, $wy, $ww, $wh)

    # Route display
    $rx = [int]($sz * 0.30)
    $ry = [int]($sz * 0.27)
    $rw = [int]($sz * 0.40)
    $rh = [int]($sz * 0.06)
    $darkBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(15, 23, 42))
    $g.FillRectangle($darkBrush, $rx, $ry, $rw, $rh)

    # Headlights
    $yellowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(250, 204, 21))
    $hlSize = [int]($sz * 0.07)
    $g.FillEllipse($yellowBrush, [int]($sz * 0.28), [int]($sz * 0.60), $hlSize, $hlSize)
    $g.FillEllipse($yellowBrush, [int]($sz * 0.65), [int]($sz * 0.60), $hlSize, $hlSize)

    # Wheels
    $g.FillRectangle($darkBrush, [int]($sz * 0.25), [int]($sz * 0.70), [int]($sz * 0.12), [int]($sz * 0.08))
    $g.FillRectangle($darkBrush, [int]($sz * 0.63), [int]($sz * 0.70), [int]($sz * 0.12), [int]($sz * 0.08))

    # Text LINUS TRANSIT
    $fontSize = [float]($sz * 0.055)
    $font = New-Object System.Drawing.Font('Arial', $fontSize, [System.Drawing.FontStyle]::Bold)
    $strFormat = New-Object System.Drawing.StringFormat
    $strFormat.Alignment = [System.Drawing.StringAlignment]::Center
    $g.DrawString('LINUS TRANSIT', $font, $whiteBrush, [float]($sz / 2.0), [float]($sz * 0.81), $strFormat)

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose()
    $bmp.Dispose()
}

$baseDir = $PSScriptRoot
if (-not $baseDir) { $baseDir = "." }

New-Icon 192 "$baseDir\icon-192.png"
New-Icon 512 "$baseDir\icon-512.png"
New-Icon 512 "$baseDir\icon-maskable.png"
New-Icon 180 "$baseDir\apple-touch-icon.png"
Write-Output 'ICONS_GENERATED_SUCCESSFULLY'
