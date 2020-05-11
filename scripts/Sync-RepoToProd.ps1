
$prodLocation = '\\serverName\c$\enter-your-production-filepath'; # Location of where your build will be deploying
$buildLocation = 'C:\enter-your-build-filepath'; # Location that will handle the build

$source = $buildLocation + 'dist';
$destination = $prodLocation + 'dist';

$originalLocation = $pwd;


function CheckLocation($location) {
    if ( !(Test-Path $location) ) {
        Write-Host "# Location not found:" $location;
        Exit;
    }
}

try {

    # If the destination directory is not there create it
    if ( !(Test-Path $source) ) {
        Write-Host "# Location not found:" $source;
        
        # Create the directory
        New-Item -Path $buildLocation -Name "dist" -ItemType "directory"
        Write-Host "Created new directory at " + $buildLocation
    }
    # If the destination directory is not there create it
    if ( !(Test-Path $destination) ) {
        Write-Host "# Location not found:" $destination;

        # Create the directory
        New-Item -Path $prodLocation -Name "dist" -ItemType "directory"
        Write-Host "Created new directory at " + $prodLocation
    }

    cd $buildLocation;

    git reset --hard;

    # Get latest source code
    $GitResult = git pull origin master;
    Write-Host $GitResult

    # If there have been no new commits then Exit
    if ($GitResult.ToString() -eq "Already up to date.") {
        Exit;   
    }

    # Build 11ty
    npm run build;
    
    # Exit if build was not success
    if ($LASTEXITCODE -ne 0) {
        write-host "Exit code not equal to 0. Exiting the script."
        Exit;
    } 

    # Copy from the build to the production location
    Copy-Item "$source\*" -Destination $destination -Recurse -force

    cd $originalLocation;

    write-host "Successfully Synced";

}
catch {
    Write-Host "  # An error forced the script to exit.";
    Write-Host $_.Exception;
    Exit;
}