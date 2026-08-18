param(
    [string]$VaultPath = "G:\O meu disco\obsidian\aaa",
    [switch]$SomenteBuild,
    [switch]$SemDeploy,
    [switch]$SemPush,
    [switch]$NaoAbrirSite
)

$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest

$ProjectRoot = [System.IO.Path]::GetFullPath($PSScriptRoot)
$ContentPath = Join-Path $ProjectRoot "content"
$StagingPath = Join-Path $ProjectRoot ".publish-staging"
$BackupPath = Join-Path $ProjectRoot ".publish-backup"
$LandingPage = Join-Path $ContentPath "index.md"
$PublicIndex = Join-Path $ProjectRoot "public\index.html"
$SiteUrl = "https://japanese-wiki.juliofilhowork.workers.dev"
$IgnoredFolderNames = @(".obsidian", "private", "templates")

function Write-Step {
    param([string]$Message)
    Write-Host "`n==> $Message" -ForegroundColor Cyan
}

function Invoke-Checked {
    param(
        [Parameter(Mandatory = $true)][string]$Command,
        [Parameter(Mandatory = $true)][string[]]$Arguments
    )

    Write-Host ("> " + $Command + " " + ($Arguments -join " ")) -ForegroundColor DarkGray
    & $Command @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "O comando falhou com código $LASTEXITCODE`: $Command $($Arguments -join ' ')"
    }
}

function Get-RelativeVaultPath {
    param(
        [Parameter(Mandatory = $true)][string]$BasePath,
        [Parameter(Mandatory = $true)][string]$FullPath
    )

    $baseWithSlash = $BasePath.TrimEnd("\", "/") + "\"
    $baseUri = [System.Uri]::new($baseWithSlash)
    $fileUri = [System.Uri]::new($FullPath)
    $relative = [System.Uri]::UnescapeDataString($baseUri.MakeRelativeUri($fileUri).ToString())
    return $relative.Replace("/", "\")
}

function Test-IgnoredRelativePath {
    param([Parameter(Mandatory = $true)][string]$RelativePath)

    foreach ($part in ($RelativePath -split "[\\/]")) {
        if ($IgnoredFolderNames -contains $part.ToLowerInvariant()) {
            return $true
        }
    }
    return $false
}

function Test-PublishedMarkdown {
    param([Parameter(Mandatory = $true)][string]$Path)

    $text = [System.IO.File]::ReadAllText($Path)
    $frontmatter = [regex]::Match(
        $text,
        '\A---\s*\r?\n(?<yaml>.*?)\r?\n---(?:\r?\n|\z)',
        [System.Text.RegularExpressions.RegexOptions]::Singleline
    )
    if (-not $frontmatter.Success) {
        return $false
    }

    return [regex]::IsMatch(
        $frontmatter.Groups["yaml"].Value,
        '(?im)^\s*publish\s*:\s*(?:true|"true"|''true'')\s*$'
    )
}

function Restore-ContentBackup {
    if (Test-Path -LiteralPath $ContentPath) {
        Remove-Item -LiteralPath $ContentPath -Recurse -Force
    }
    if (Test-Path -LiteralPath $BackupPath) {
        Move-Item -LiteralPath $BackupPath -Destination $ContentPath
        Write-Host "O content anterior foi restaurado." -ForegroundColor Yellow
    }
}

try {
    Write-Host "日本語版Wiki — Atualizar site" -ForegroundColor Magenta
    Write-Host "Projeto: $ProjectRoot"
    Write-Host "Vault:   $VaultPath"

    if (-not (Test-Path -LiteralPath $VaultPath -PathType Container)) {
        throw "Vault não encontrado: $VaultPath"
    }
    if (-not (Test-Path -LiteralPath (Join-Path $ProjectRoot "package.json") -PathType Leaf)) {
        throw "Este script precisa ficar na raiz do projeto Quartz."
    }
    if (-not (Test-Path -LiteralPath $LandingPage -PathType Leaf)) {
        throw "Landing page não encontrada: $LandingPage"
    }

    $nodeVersion = (& node --version).Trim()
    if ($LASTEXITCODE -ne 0) {
        throw "Node.js não está disponível."
    }
    $nodeMajor = [int]($nodeVersion.TrimStart("v").Split(".")[0])
    if ($nodeMajor -lt 22) {
        throw "Quartz exige Node.js 22+. Versão encontrada: $nodeVersion"
    }
    Write-Host "Node: $nodeVersion" -ForegroundColor Green

    $branch = (& git -C $ProjectRoot branch --show-current).Trim()
    if ($LASTEXITCODE -ne 0 -or $branch -ne "v5") {
        throw "A branch esperada é v5. Branch atual: $branch"
    }

    Write-Step "Selecionando somente notas com publish: true"
    if (Test-Path -LiteralPath $StagingPath) {
        Remove-Item -LiteralPath $StagingPath -Recurse -Force
    }
    New-Item -ItemType Directory -Path $StagingPath | Out-Null
    Copy-Item -LiteralPath $LandingPage -Destination (Join-Path $StagingPath "index.md")

    $published = New-Object System.Collections.Generic.List[string]
    $markdownFiles = Get-ChildItem -LiteralPath $VaultPath -Recurse -File -Filter "*.md"
    foreach ($file in $markdownFiles) {
        $relativePath = Get-RelativeVaultPath -BasePath $VaultPath -FullPath $file.FullName
        if (Test-IgnoredRelativePath -RelativePath $relativePath) {
            continue
        }
        if (-not (Test-PublishedMarkdown -Path $file.FullName)) {
            continue
        }
        if ($relativePath -ieq "index.md") {
            Write-Host "Ignorado para preservar a landing do site: $relativePath" -ForegroundColor Yellow
            continue
        }

        $destination = Join-Path $StagingPath $relativePath
        $destinationFolder = Split-Path -Parent $destination
        if (-not (Test-Path -LiteralPath $destinationFolder)) {
            New-Item -ItemType Directory -Path $destinationFolder -Force | Out-Null
        }
        Copy-Item -LiteralPath $file.FullName -Destination $destination -Force
        $published.Add($relativePath)
        Write-Host "PUBLICAR: $relativePath" -ForegroundColor Green
    }

    Write-Host "Notas públicas encontradas: $($published.Count)" -ForegroundColor Green
    if ($published.Count -eq 0) {
        Write-Host "Aviso: somente a landing page será publicada." -ForegroundColor Yellow
    }

    Write-Step "Substituindo content de forma transacional"
    if (Test-Path -LiteralPath $BackupPath) {
        Remove-Item -LiteralPath $BackupPath -Recurse -Force
    }
    Move-Item -LiteralPath $ContentPath -Destination $BackupPath
    Move-Item -LiteralPath $StagingPath -Destination $ContentPath

    try {
        Write-Step "Construindo Quartz"
        Push-Location $ProjectRoot
        try {
            Invoke-Checked -Command "npx.cmd" -Arguments @("quartz", "build")
        }
        finally {
            Pop-Location
        }

        if (-not (Test-Path -LiteralPath $PublicIndex -PathType Leaf)) {
            throw "O build terminou sem gerar public\index.html."
        }
        $publicHtml = [System.IO.File]::ReadAllText($PublicIndex)
        if (-not $publicHtml.Contains("日本語版Wiki")) {
            throw "public\index.html não contém o título da wiki."
        }
    }
    catch {
        Restore-ContentBackup
        throw
    }

    if (Test-Path -LiteralPath $BackupPath) {
        Remove-Item -LiteralPath $BackupPath -Recurse -Force
    }

    if ($SomenteBuild) {
        Write-Host "`nBuild local concluído. Deploy e Git foram ignorados por -SomenteBuild." -ForegroundColor Green
        exit 0
    }

    if (-not $SemDeploy) {
        Write-Step "Verificando autenticação Cloudflare"
        Push-Location $ProjectRoot
        try {
            $whoami = (& npx.cmd wrangler whoami 2>&1 | Out-String)
            if ($LASTEXITCODE -ne 0 -or $whoami -match "not authenticated") {
                Write-Host "Cloudflare não autenticado. Iniciando login por código..." -ForegroundColor Yellow
                Invoke-Checked -Command "npx.cmd" -Arguments @("wrangler", "login", "--device")
            }
            Invoke-Checked -Command "npx.cmd" -Arguments @("wrangler", "deploy")
        }
        finally {
            Pop-Location
        }
    }
    else {
        Write-Host "Deploy Cloudflare ignorado por -SemDeploy." -ForegroundColor Yellow
    }

    Write-Step "Preparando atualização Git"
    $safePaths = @(
        "content",
        "atualizar site.ps1",
        ".gitignore",
        ".prettierignore",
        "package.json",
        "package-lock.json",
        "quartz.config.yaml",
        "wrangler.jsonc"
    )
    & git -C $ProjectRoot add -- $safePaths
    if ($LASTEXITCODE -ne 0) {
        throw "Falha ao preparar arquivos seguros para o Git."
    }

    & git -C $ProjectRoot diff --cached --quiet
    $diffExit = $LASTEXITCODE
    if ($diffExit -eq 1) {
        $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
        Invoke-Checked -Command "git" -Arguments @(
            "-C", $ProjectRoot, "commit", "-m", "Publish Japanese Wiki update $timestamp"
        )
    }
    elseif ($diffExit -gt 1) {
        throw "Falha ao verificar alterações staged no Git."
    }
    else {
        Write-Host "Nenhuma alteração nova para commit." -ForegroundColor DarkGray
    }

    if (-not $SemPush) {
        Write-Step "Enviando branch v5 ao GitHub"
        Invoke-Checked -Command "git" -Arguments @("-C", $ProjectRoot, "push", "origin", "v5")
    }
    else {
        Write-Host "Push GitHub ignorado por -SemPush." -ForegroundColor Yellow
    }

    Write-Host "`nSITE ATUALIZADO COM SUCESSO" -ForegroundColor Green
    Write-Host $SiteUrl -ForegroundColor Cyan
    if (-not $NaoAbrirSite) {
        Start-Process $SiteUrl
    }
}
catch {
    Write-Host "`nERRO AO ATUALIZAR O SITE" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host "Envie uma captura desta janela para diagnóstico." -ForegroundColor Yellow
    exit 1
}
finally {
    if (Test-Path -LiteralPath $StagingPath) {
        Remove-Item -LiteralPath $StagingPath -Recurse -Force -ErrorAction SilentlyContinue
    }
}
