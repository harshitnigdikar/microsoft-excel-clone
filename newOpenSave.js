let download = document.querySelector(".download");
download.addEventListener("click", function () {
    const data = JSON.stringify(workSheetDB);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.download = "file.json";
    a.href = url;
    a.click();
})