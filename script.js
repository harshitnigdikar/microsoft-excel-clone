let addbtnContainer = document.querySelector(".add-sheet_container");
let sheetList = document.querySelector(".sheets-list");
let firstSheet = document.querySelector(".sheet");
let Allcells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address-box");
let leftBtn = document.querySelector(".left");
let rightBtn = document.querySelector(".right");
let centerBtn = document.querySelector(".center");
let fontBtn = document.querySelector(".font-size");
let fontFamily = document.querySelector(".font-family");
let boldElem = document.querySelector(".bold");
let italicElem = document.querySelector(".italic");
let underlineElem = document.querySelector(".underline");
let allAlignBtns = document.querySelectorAll(".alignment-container>input");
let formulaInput = document.querySelector(".formula-box");
let gridContainer = document.querySelector(".grid_container");
let topLeftBlock = document.querySelector(".top-left-block");
let sheetDB = workSheetDB[0];
firstSheet.addEventListener("click", handleActiveSheet);

addbtnContainer.addEventListener("click", function () {
    let sheetsArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetsArr[sheetsArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheetIdx");
    idx = Number(idx);
    let NewSheet = document.createElement("div");
    NewSheet.setAttribute("class", "sheet");
    NewSheet.setAttribute("sheetIdx", idx + 1);
    NewSheet.innerText = `Sheet ${idx + 1}`;

    sheetList.appendChild(NewSheet);
   
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr[sheetsArr.length - 1].classList.add("active-sheet");
    
    initCurrentSheetDb();

    sheetDB = workSheetDB[idx];
   
  
    initUI();
 
    NewSheet.addEventListener("click", handleActiveSheet);
})

function handleActiveSheet(e) {
    let MySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach(function (sheet) {
        sheet.classList.remove("active-sheet");
    })
    if (!MySheet.classList[1]) {
        MySheet.classList.add("active-sheet");
    }
  
    let sheetIdx = MySheet.getAttribute("sheetIdx")
        ;
    sheetDB = workSheetDB[sheetIdx - 1];
    
    setUI(sheetDB);

}

for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("click", function handleCell() {
        let rid = Number(Allcells[i].getAttribute("rid"));
        let cid = Number(Allcells[i].getAttribute("cid"));
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        let address = colAdd + rowAdd;
        addressBar.value = address;
        let cellObject = sheetDB[rid][cid];
      
        if (cellObject.formula != "") {
            formulaInput.value = cellObject.formula;
        } else {
            formulaInput.value = "";
        }
        if (cellObject.bold == true) {
            boldElem.classList.add("active-btn")
        } else {
            boldElem.classList.remove("active-btn");
        }
      
        for (let i = 0; i < allAlignBtns.length; i++) {
            allAlignBtns[i].classList.remove("active-btn");
        }
        console.log(cellObject.halign);
        if (cellObject.halign == "left") {
         
            leftBtn.classList.add("active-btn")
        } else if (cellObject.halign == "right") {
            rightBtn.classList.add("active-btn")
     
        } else if (cellObject.halign == "center") {
            centerBtn.classList.add("active-btn")
        }
    });

    Allcells[i].addEventListener("keydown", function (e) {
        let obj = Allcells[i].getBoundingClientRect();
        let height = obj.height;
        let address = addressBar.value;
        let { rid, cid } = getRIdCIdfromAddress(address);
        let leftCol = document.querySelectorAll(".left-col .left-col_box")[rid];
        leftCol.style.height = height + "px";
    });
}
gridContainer.addEventListener("scroll", function () {

    let top = gridContainer.scrollTop;
    let left = gridContainer.scrollLeft;
    console.log(left);
    topLeftBlock.style.top = top + "px";
    topRow.style.top = top + "px";
    leftCol.style.left = left + "px";
    topLeftBlock.style.left = left + "px";
})


Allcells[0].click();

leftBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
 
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "left";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    leftBtn.classList.add("active-btn");
 
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "left";
})
rightBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
   
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "right";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    rightBtn.classList.add("active-btn");
   
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "right";
})
centerBtn.addEventListener("click", function () {
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cell.style.textAlign = "center";
    for (let i = 0; i < allAlignBtns.length; i++) {
        allAlignBtns[i].classList.remove("active-btn");
    }
    centerBtn.classList.add("active-btn");
    let cellObject = sheetDB[rid][cid];
    cellObject.halign = "center";
})
fontBtn.addEventListener("change", function () {
    let fontSize = fontBtn.value;
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    console.log(rid, cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    console.log(fontSize);
    cell.style.fontSize = fontSize + "px";
})
fontFamily.addEventListener("change", function () {
   
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cFont = fontFamily.value
    cell.style.fontFamily = cFont;
})
boldElem.addEventListener("click", function () {
    let isActive = boldElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    let cellObject = sheetDB[rid][cid];
    if (isActive == false) {
        
        cell.style.fontWeight = "bold";
        boldElem.classList.add("active-btn");
        cellObject.bold = true;
    } else {
   
        cell.style.fontWeight = "normal";
        boldElem.classList.remove("active-btn");
        cellObject.bold = false
    }
   
})
italicElem.addEventListener("click", function () {
    let isActive = italicElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    if (isActive == false) {
       
        cell.style.fontStyle = "italic";
        italicElem.classList.add("active-btn");
    } else {
      
        cell.style.fontStyle = "normal";
        italicElem.classList.remove("active-btn");
    }
})
underlineElem.addEventListener("click", function () {
    let isActive = underlineElem.classList.contains("active-btn");
    let address = addressBar.value;
    let { rid, cid } = getRIdCIdfromAddress(address);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    if (isActive == false) {

        cell.style.textDecoration = "underline";
        underlineElem.classList.add("active-btn");
    } else {
   
        cell.style.textDecoration = "none";
        underlineElem.classList.remove("active-btn");
    }
})

function initUI() {
    for (let i = 0; i < Allcells.length; i++) {
        // boldness
        Allcells[i].style.fontWeight = "normal";
        Allcells[i].style.fontStyle = "normal";
        Allcells[i].style.textDecoration = "none";
        Allcells[i].style.fontFamily = "Arial";
        Allcells[i].style.fontSize = "16px";
        Allcells[i].style.textAlign = "left";
        Allcells[i].innerText = "";
    }
}
function setUI(sheetDB) {
    for (let i = 0; i < sheetDB.length; i++) {
        for (let j = 0; j < sheetDB[i].length; j++) {
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let { bold, italic, underline, fontFamily, fontSize, halign, value } = sheetDB[i][j];
            cell.style.fontWeight = bold == true ? "bold" : "normal";
            cell.innerText = value;
        }
    }
}

for (let i = 0; i < Allcells.length; i++) {
    Allcells[i].addEventListener("blur", function handleCell() {
        let address = addressBar.value;
        let { rid, cid } = getRIdCIdfromAddress(address);
   
        let cellObject = sheetDB[rid][cid];

 
        let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);

        if (cellObject.value == cell.innerText) {
            return;
        }
        if (cellObject.formula) {
            removeFormula(cellObject, address);
        }

        cellObject.value = cell.innerText;

        changeChildrens(cellObject);
    });
}
 
formulaInput.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && formulaInput.value != "") {
    
        let Newformula = formulaInput.value;
      
        let address = addressBar.value;
    
        let { rid, cid } = getRIdCIdfromAddress(address);

        let cellObject = sheetDB[rid][cid];
        let prevFormula = cellObject.formula;
        if (prevFormula == Newformula) {
            return;
        }
 
        if (prevFormula != "" && prevFormula != Newformula) {
            removeFormula(cellObject, address);
        }
    
        let evaluatedValue = evaluateFormula(Newformula);
    
        setUIByFormula(evaluatedValue, rid, cid);

        setFormula(evaluatedValue, Newformula, rid, cid, address);

        changeChildrens(cellObject);
    }
})


function evaluateFormula(formula) {
    let formulaTokens = formula.split(" ");

    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {

            let { rid, cid } = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[rid][cid];
   
            let {value} = cellObject;
            formula = formula.replace(formulaTokens[i], value);
        }
    }

    let ans = eval(formula);
    return ans;

}
function setUIByFormula(value, rid, cid) {
document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText = value;
}

function setFormula(value, formula, rid, cid, address) {
    let cellObject = sheetDB[rid][cid];
    cellObject.value = value;
    cellObject.formula = formula;
    let formulaTokens = formula.split(" ");
 
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            let parentRIdCid = getRIdCIdfromAddress(formulaTokens[i]);
            let cellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            cellObject.children.push(address)
        }
    }
}
function changeChildrens(cellObject) {
 
    let childrens = cellObject.children;
    for (let i = 0; i < childrens.length; i++) {
        let chAddress = childrens[i];
        let chRICIObj = getRIdCIdfromAddress(chAddress);
        let chObj = sheetDB[chRICIObj.rid][chRICIObj.cid];
        let formula = chObj.formula;
        let evaluatedValue = evaluateFormula(formula);
        setUIByFormula(evaluatedValue, chRICIObj.rid, chRICIObj.cid);
        chObj.value = evaluatedValue;
        changeChildrens(chObj);
    }

}

function removeFormula(cellObject, address) {

    let formula = cellObject.formula;
    let formulaTokens = formula.split(" ");
   
    for (let i = 0; i < formulaTokens.length; i++) {
        let firstCharOfToken = formulaTokens[i].charCodeAt(0);
        if (firstCharOfToken >= 65 && firstCharOfToken <= 90) {
            let parentRIdCid = getRIdCIdfromAddress(formulaTokens[i]);
            let parentCellObject = sheetDB[parentRIdCid.rid][parentRIdCid.cid];
            let childrens = parentCellObject.children;
            let idx = childrens.indexOf(address);
            childrens.splice(idx, 1);
        }
    }
    cellObject.formula = "";
}

function getRIdCIdfromAddress(adress) {
    let cellColAdr = adress.charCodeAt(0);
    let cellrowAdr = adress.slice(1);
    let cid = cellColAdr - 65;
    let rid = Number(cellrowAdr) - 1;
    return { cid, rid };
}