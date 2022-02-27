// image preview

function show(num, imgName) {
  const clickableImg = document.getElementById("clickable_img");
  const clickableDiv = document.getElementById(`clickable_div`);
  const cross = document.querySelector(`#clickable_div i`);

  clickableImg.setAttribute("src", `img/${imgName}_${num}.png`);

  clickableDiv.style.display = "block";
  cross.addEventListener("click", function () {
    clickableDiv.style.display = "none";
  });
}

function pdfShow(pdfName) {
  console.log(pdfName)
  const clickablePdf = document.getElementById("clickable_pdf");
  const clickableDiv1= document.getElementById(`clickable_div1`);
  const cross1 = document.querySelector(`#clickable_div1 i`);

  clickablePdf.setAttribute("src", `files/${pdfName}.pdf`);

  clickableDiv1.style.display = "block";
  cross1.addEventListener("click", function () {
    clickableDiv1.style.display = "none";
  });
}

function videoShow(videoName) {
  const clickableVideo = document.getElementById("clickable_video");
  const clickableDiv2= document.getElementById(`clickable_div2`);
  const cross2 = document.querySelector(`#clickable_div2 i`);

  clickableVideo.setAttribute("src", `files/${videoName}.mp4`);

  clickableDiv2.style.display = "block";
  cross2.addEventListener("click", function () {
    clickableDiv2.style.display = "none";
  });
}

