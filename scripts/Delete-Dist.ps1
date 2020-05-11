
$fileName = ".\dist";
if (Test-Path $fileName){
	Remove-Item $fileName -Recurse -Force
}